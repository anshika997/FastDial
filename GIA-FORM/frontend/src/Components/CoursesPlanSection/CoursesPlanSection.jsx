import React from "react";
import HeroReactNative from "./CoursesPlanCard";
import Bg1 from "../../assets/bg1.png";
import Bg2 from "../../assets/bg2.png";
import Bg3 from "../../assets/bg3.png";
import Bg4 from "../../assets/bg4.png";
import Bg5 from "../../assets/bg5.png";
import Bg6 from "../../assets/bg6.png";
import Bg7 from "../../assets/bg7.png";
import Plan1 from "../../assets/planImg1.png";
import Plan2 from "../../assets/planImg2.png";
import Plan3 from "../../assets/planImg3.png";
import Plan4 from "../../assets/planImg4.png";
import Plan5 from "../../assets/planImg5.png";
import Plan6 from "../../assets/planImg6.png";
import Plan7 from "../../assets/planImg7.png";
const CoursesPlanSection = () => {
  return (
    <section>
      <div className="flex flex-col xs:px-spacing20 xs:my-spacing40 max-w-1440 w-full mx-auto md:px-spacing100 md:my-spacing40 !px-0 !max-w-full ">
        <div className="flex flex-col items-center gap-8 mb-10 text-white ">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Course Plans
          </h2>

          <p className="max-w-5xl text-sm md:text-lg leading-relaxed text-center text-white/80">
            Find the right learning path for your goals. Whether you’re a
            beginner taking your first step, or a professional aiming to
            upskill, our flexible plans are designed to help you learn at your
            own pace, anytime, anywhere.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative w-full">
          <div className="md:w-full hidden"></div>
          <div className="h-max w-full sticky top-[69px] z-[27]">
            <HeroReactNative
              bgUrl={Bg1}
              badgeText="Full-Stack"
              title="Learn Full-Stack with expert-curated content"
              highlight=""
              subtitle="Build the right skills, the right way."
              stats={[
                {},
                {},
              ]}
              actions={[
                {
                  label: "Course Type",
                  menu: [
                    {
                      label: "Course Duration – 6 months",
                      value: "6m",
                      price: "₹29,999 (6 months)",
                    },
                    {
                      label: "Course+Placement – 9 months",
                      value: "9m",
                      price: "₹39,999 (9 months)",
                    },
                  ],
                },
                {
                  label: "Course Price",
                  // shown inline on the same button after click; updates when selection changes
                  getInlineLabel: (sel) => (sel ? sel.price : "Course Price"),
                  // optional: what to show before first click
                  initialInlineText: "Course Price",
                },
              ]}
              primaryCta={{ label: "Start learning", href: "#start" }}
              image={{ src: Plan1, alt: "Curriculum overview" }}
              imagePosition="right"
              badgeGradient="from-[#82E1CD] to-[#477B70]"
            />
          </div>
          <div className="h-max w-full sticky top-[69px] -mt-screen z-[28]">
            <HeroReactNative
              bgUrl={Bg2}
              badgeText="Mobile Application"
              title="Learn Mobile Application with expert-curated content"
              highlight=""
              subtitle="Build the right skills, the right way."
              stats={[
                {},
                {},
              ]}
              actions={[
                {
                  label: "Course Type",
                  menu: [
                    {
                      label: "Course Duration – 6 months",
                      value: "6m",
                      price: "₹29,999 (6 months)",
                    },
                    {
                      label: "Course+Placement – 9 months",
                      value: "9m",
                      price: "₹39,999 (9 months)",
                    },
                  ],
                },
                {
                  label: "Course Price",
                  // shown inline on the same button after click; updates when selection changes
                  getInlineLabel: (sel) => (sel ? sel.price : "Course Price"),
                  // optional: what to show before first click
                  initialInlineText: "Course Price",
                },
              ]}
              primaryCta={{ label: "Start learning", href: "#start" }}
              image={{ src: Plan2, alt: "Curriculum overview" }}
              imagePosition="right"
              badgeGradient="from-[#7582CA] to-[#3A4064]"
            />
          </div>
          <div className="h-max w-full sticky top-[69px] -mt-screen z-[29]">
            <HeroReactNative
              bgUrl={Bg3}
              overlay={true}
              badgeText="Devops"
              title="Learn Devops with expert-curated content"
              highlight=""
              subtitle="Build the right skills, the right way."
              stats={[
                {},
                {},
              ]}
              actions={[
                {
                  label: "Course Type",
                  menu: [
                    {
                      label: "Course Duration – 6 months",
                      value: "6m",
                      price: "₹29,999 (6 months)",
                    },
                    {
                      label: "Course+Placement – 9 months",
                      value: "9m",
                      price: "₹39,999 (9 months)",
                    },
                  ],
                },
                {
                  label: "Course Price",
                  // shown inline on the same button after click; updates when selection changes
                  getInlineLabel: (sel) => (sel ? sel.price : "Course Price"),
                  // optional: what to show before first click
                  initialInlineText: "Course Price",
                },
              ]}
              primaryCta={{ label: "Start learning", href: "#start" }}
              image={{ src: Plan3, alt: "Curriculum overview" }}
              imagePosition="right"
              badgeGradient="from-[#E5592D] to-[#7F3119]"
            />
          </div>
          <div className="h-max w-full sticky top-[69px] -mt-screen z-[30]">
            <HeroReactNative
              bgUrl={Bg4}
              overlay={true}
              badgeText="Microsoft Dynamics 365 - Finance & Operations"
              title="Learn Microsoft Dynamics 365 - Finance & Operations with expert-curated content"
              highlight=""
              subtitle="Build the right skills, the right way."
              stats={[
                {},
                {},
              ]}
              actions={[
                {
                  label: "Course Type",
                  menu: [
                    {
                      label: "Course Duration – 6 months",
                      value: "6m",
                      price: "₹29,999 (6 months)",
                    },
                    {
                      label: "Course+Placement – 9 months",
                      value: "9m",
                      price: "₹39,999 (9 months)",
                    },
                  ],
                },
                {
                  label: "Course Price",
                  // shown inline on the same button after click; updates when selection changes
                  getInlineLabel: (sel) => (sel ? sel.price : "Course Price"),
                  // optional: what to show before first click
                  initialInlineText: "Course Price",
                },
              ]}
              primaryCta={{ label: "Start learning", href: "#start" }}
              image={{ src: Plan4, alt: "Curriculum overview" }}
              imagePosition="right"
              badgeGradient="from-[#5271BC] to-[#5271BC]"
            />
          </div>
          <div className="h-max w-full sticky top-[69px] -mt-screen z-[31]">
            <HeroReactNative
              bgUrl={Bg5}
              overlay={true}
              badgeText="Python"
              title="Learn Python with expert-curated content"
              highlight=""
              subtitle="Build the right skills, the right way."
              stats={[
                {},
                {},
              ]}
              actions={[
                {
                  label: "Course Type",
                  menu: [
                    {
                      label: "Course Duration – 6 months",
                      value: "6m",
                      price: "₹29,999 (6 months)",
                    },
                    {
                      label: "Course+Placement – 9 months",
                      value: "9m",
                      price: "₹39,999 (9 months)",
                    },
                  ],
                },
                {
                  label: "Course Price",
                  // shown inline on the same button after click; updates when selection changes
                  getInlineLabel: (sel) => (sel ? sel.price : "Course Price"),
                  // optional: what to show before first click
                  initialInlineText: "Course Price",
                },
              ]}
              primaryCta={{ label: "Start learning", href: "#start" }}
              image={{ src: Plan5, alt: "Curriculum overview" }}
              imagePosition="right"
              badgeGradient="from-[#70BF73] to-[#345936]"
            />
          </div>
          <div className="h-max w-full sticky top-[69px] -mt-screen z-[32]">
            <HeroReactNative
              bgUrl={Bg6}
              overlay={true}
              badgeText="Microsoft Dynamics 365 - Business Central"
              title="Learn Microsoft Dynamics 365 - Business Central with expert-curated content"
              highlight=""
              subtitle="Build the right skills, the right way."
              stats={[
                {},
                {},
              ]}
              actions={[
                {
                  label: "Course Type",
                  menu: [
                    {
                      label: "Course Duration – 6 months",
                      value: "6m",
                      price: "₹29,999 (6 months)",
                    },
                    {
                      label: "Course+Placement – 9 months",
                      value: "9m",
                      price: "₹39,999 (9 months)",
                    },
                  ],
                },
                {
                  label: "Course Price",
                  // shown inline on the same button after click; updates when selection changes
                  getInlineLabel: (sel) => (sel ? sel.price : "Course Price"),
                  // optional: what to show before first click
                  initialInlineText: "Course Price",
                },
              ]}
              primaryCta={{ label: "Start learning", href: "#start" }}
              image={{ src: Plan6, alt: "Curriculum overview" }}
              imagePosition="right"
              badgeGradient="from-[#4192D7] to-[#224D71]"
            />
          </div>
          <div className="h-max w-full sticky top-[69px] -mt-screen z-[33]">
            <HeroReactNative
              bgUrl={Bg7}
              overlay={true}
              badgeText="Generative AI"
              title="Learn  Generative AI with expert-curated content"
              highlight=""
              subtitle="Build the right skills, the right way."
              stats={[
                {},
                {},
              ]}
              actions={[
                {
                  label: "Course Type",
                  menu: [
                    {
                      label: "Course Duration – 6 months",
                      value: "6m",
                      price: "₹29,999 (6 months)",
                    },
                    {
                      label: "Course+Placement – 9 months",
                      value: "9m",
                      price: "₹39,999 (9 months)",
                    },
                  ],
                },
                {
                  label: "Course Price",
                  // shown inline on the same button after click; updates when selection changes
                  getInlineLabel: (sel) => (sel ? sel.price : "Course Price"),
                  // optional: what to show before first click
                  initialInlineText: "Course Price",
                },
              ]}
              primaryCta={{ label: "Start learning", href: "#start" }}
              image={{ src: Plan7, alt: "Curriculum overview" }}
              imagePosition="right"
              badgeGradient="from-[#9C47B7] to-[#451F51]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesPlanSection;
