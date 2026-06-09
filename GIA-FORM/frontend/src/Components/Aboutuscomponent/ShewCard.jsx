import React from "react";



const cn = (...xs) => xs.filter(Boolean).join(" ");

export default function GradientTiltCard({
  title,
  description = "",
  bullets ,
  imageSrc,
  textSide,
  tilt,
  className,
}) {
  const wrapperSkew =
    tilt === "left"
      ? "skew-x-[0deg] sm:skew-x-[-8deg] md:skew-x-[-10deg] lg:skew-x-[-12deg]"
      : tilt === "right"
      ? "skew-x-[0deg] sm:skew-x-[8deg] md:skew-x-[10deg] lg:skew-x-[12deg]"
      : "";
  const contentCounterSkew =
    tilt === "left" ? "xl:skew-x-[12deg]" : tilt === "right" ? "xl:skew-x-[-12deg]" : "";

  return (
    <div
      className={cn(
        // Lowered vertical padding overall
        "w-full overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-6 md:py-8 flex justify-center",
        className
      )}
    >
      {/* Static gradient border */}
      <div
        className={cn(
          "relative w-full mx-auto",
          
          "max-w-[100%] sm:max-w-[97%] md:max-w-[95%] lg:max-w-[93%] xl:max-w-[110rem]",
         
          "p-[4px] sm:p-[6px] md:p-[8px] lg:p-[10px]",
          "rounded-[22px] bg-gradient-to-r from-[#F45E29] to-[#5A4BDA]",
          wrapperSkew
        )}
      >
        {/* Inner card: overflow hidden to keep image inside */}
        <div className="relative rounded-[22px] bg-gradient-to-r from-[#735FF2] to-[#43378C] overflow-hidden">
          <div className={cn(contentCounterSkew, "relative text-white")}>
            {/* Mobile */}
            <div className="block md:hidden">
              <div className="p-4 pb-0">
                {title && (
                  <h2 className="text-[1.35rem] sm:text-2xl font-semibold leading-tight">
                    {title}
                  </h2>
                )}

                {bullets?.length ? (
                  <ul className="mt-3 list-disc list-inside space-y-2 text-[0.95rem] leading-6 text-white/90">
                    {bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  description && (
                    <p className="mt-3 text-[0.95rem] leading-6 text-white/90">{description}</p>
                  )
                )}
              </div>
              {imageSrc && (
                <div className="flex justify-center mt-4">
                  <img
                    src={imageSrc}
                    alt=""
                    draggable="false"
                    className="pointer-events-none select-none max-w-full h-auto max-h-40 sm:max-h-48 object-contain"
                  />
                </div>
              )}
            </div>

            {/* Tablet */}
            <div className="hidden md:block lg:hidden">
              <div
                className={cn(
                  // Slightly reduced gap & padding
                  "grid grid-cols-2 items-center gap-6 p-5",
                  textSide === "left"
                    ? ""
                    : "[&>.text-col]:order-2 [&>.img-col]:order-1"
                )}
              >
                <div className="text-col flex flex-col">
                  {title && (
                    <h2 className="text-3xl font-semibold leading-tight">{title}</h2>
                  )}

                  {bullets?.length ? (
                    <ul className="mt-3 list-disc list-inside space-y-2 text-base leading-6 text-white/90">
                      {bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    description && (
                      <p className="mt-3 text-base leading-6 text-white/90">{description}</p>
                    )
                  )}
                </div>

                <div className="img-col flex justify-center items-center">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt=""
                      draggable="false"
                      className="pointer-events-none select-none max-w-full h-auto max-h-52 md:max-h-60 object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <div
                className={cn(
                  // Reduced gap & padding for lower height
                  "grid grid-cols-2 items-center gap-10 xl:gap-10 p-6",
                  textSide === "left"
                    ? ""
                    : "[&>.text-col]:order-2 [&>.img-col]:order-1"
                )}
              >
                <div className="text-col max-w-full lg:ml-4 xl:ml-6 flex flex-col justify-center">
                  {title && (
                    <h2 className="text-4xl xl:text-[2.75rem] font-semibold leading-tight">
                      {title}
                    </h2>
                  )}

                  {bullets?.length ? (
                    <ul className="mt-4 list-disc list-inside space-y-2 text-lg leading-7 text-white/90">
                      {bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    description && (
                      <p className="mt-4 text-lg leading-7 text-white/90">{description}</p>
                    )
                  )}
                </div>

                {/* Image stays INSIDE the card and has a lower max height */}
                <div className="img-col flex justify-center items-center">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt=""
                      draggable="false"
                      className="pointer-events-none select-none max-w-full h-auto max-h-[18rem] xl:max-h-[20rem] object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* End desktop */}
          </div>
        </div>
      </div>
    </div>
  );
}
