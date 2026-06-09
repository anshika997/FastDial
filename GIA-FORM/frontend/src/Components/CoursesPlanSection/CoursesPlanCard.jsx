import React, { useEffect, useRef, useState } from "react";

export default function Hero({
  bgUrl,
  overlay,
  badgeText,
  badgeGradient,
  title,
  highlight,
  subtitle,
  stats,
  actions = [],
  primaryCta,
  image,
  imagePosition,
  className = "",
  defaultDurationValue,
}) {
  const isImageLeft = imagePosition === "left";

  // --- local UI state ---
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const wrapperRef = useRef(null);

  // set default selected duration (no duplication)
  useEffect(() => {
    if (selectedDuration || !defaultDurationValue) return;
    const menu = actions.find((a) => Array.isArray(a.menu))?.menu ?? [];
    const match = menu.find((m) => m.value === defaultDurationValue);
    if (match) setSelectedDuration(match);
  }, [actions, defaultDurationValue, selectedDuration]);

  // close dropdown on outside click / Esc
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpenDropdown(null);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const pillBase =
    "inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white bg-white/20 hover:bg-white/25 backdrop-blur ring-1 ring-white/20 transition";

  // Action renderer
  const Action = ({ item, index }) => {
    const hasMenu = Array.isArray(item?.menu); // dropdown
    const hasInline = typeof item?.getInlineLabel === "function"; // inline dynamic label (no overlay)

    // 1) Dropdown (Course Type)
    if (hasMenu) {
      const isOpen = openDropdown === index;
      return (
        <div
          className="relative"
          ref={index === openDropdown ? wrapperRef : null}
        >
          <button
            type="button"
            className={`${pillBase} ${isOpen ? "ring-2 ring-white/40" : ""}`}
            onClick={() => setOpenDropdown(isOpen ? null : index)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={item.label}
          >
            {item.label}
            <ChevronDownIcon
              className={`transition ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div
              className="absolute mt-2 min-w-[14rem] rounded-xl bg-white/20 p-3 shadow-lg ring-1 ring-white/25 backdrop-blur-3xl"
              role="listbox"
            >
              <div className="rounded-xl">
                {item.menu.map((opt) => {
                  const active = selectedDuration?.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`w-full text-left text-white/90 text-[12px] px-3 py-2 rounded-md hover:bg-white/20 ${
                        active ? "bg-white/20" : ""
                      }`}
                      onClick={() => {
                        setSelectedDuration(opt);
                        setOpenDropdown(null);
                        item?.onSelect?.(opt);
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }

   
    if (hasInline) {
      const label = item.getInlineLabel(selectedDuration) ?? item.label;
      return (
        <span className={pillBase} aria-label={item.label}>
          {label}
        </span>
      );
    }

    
    if (item?.href) {
      return (
        <a className={pillBase} href={item.href} aria-label={item.label}>
          {item.label}
          <ChevronDownIcon />
        </a>
      );
    }
    return (
      <button
        type="button"
        className={pillBase}
        onClick={item?.onClick}
        aria-label={item.label}
      >
        {item.label}
        <ChevronDownIcon />
      </button>
    );
  };

  const PrimaryCTA = () => {
    const base =
      "rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-md transition hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
    if (primaryCta?.href) {
      return (
        <a
          className={base}
          href={primaryCta.href}
          aria-label={primaryCta.label}
        >
          {primaryCta.label}
        </a>
      );
    }
    return (
      <button
        type="button"
        className={base}
        onClick={primaryCta?.onClick}
        aria-label={primaryCta.label}
      >
        {primaryCta.label}
      </button>
    );
  };

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Hero section"
    >
      <div className="relative mx-auto flex max-w-[80%] flex-col py-16 md:flex-row md:items-center md:justify-between md:py-20 gap-4">
        {/* Content side */}
        <div className={`w-full md:w-full ${isImageLeft ? "md:order-2" : ""}`}>
          {badgeText ? (
            <div
              className={`mb-4 inline-flex justify-center items-center gap-2 rounded-full bg-gradient-to-r ${badgeGradient} px-5 py-1 text-lg font-semibold text-white backdrop-blur`}
            >
              {badgeText}
            </div>
          ) : null}

          <h1 className="w-full text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-4xl">
            {title}{" "}
            {highlight ? (
              <span className="block whitespace-nowrap">{highlight}</span>
            ) : null}
          </h1>

          {subtitle ? (
            <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
              {subtitle}
            </p>
          ) : null}

          {Array.isArray(stats) && stats.length > 0 && (
            <div className="mt-6 grid max-w-md grid-cols-2 gap-6 text-white/90">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className={idx === 0 ? "border-r border-white/80 " : ""}
                >
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {(Array.isArray(actions) && actions.length > 0) || primaryCta ? (
            <div>
              <div className="my-6 flex flex-wrap items-center gap-4 sm:gap-6">
                {actions.map((a, i) => (
                  <Action key={i} item={a} index={i} />
                ))}
              </div>
              {primaryCta?.label ? <PrimaryCTA /> : null}
            </div>
          ) : null}
        </div>

        {/* Image side */}
        <div className={`w-full md:w-[58%] ${isImageLeft ? "md:order-1" : ""}`}>
          {image?.src ? (
            <img
              src={image.src}
              alt={image.alt || "Illustration"}
              className="w-full"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 14.5a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L12 12.086l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 12 14.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
