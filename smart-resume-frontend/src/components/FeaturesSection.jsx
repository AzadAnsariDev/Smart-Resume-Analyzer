import React, { useRef } from "react";
import Feature from "./Feature";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  useGSAP(() => {
     if (window.innerWidth < 1020) return; 
gsap.to(panelRef.current, {
  x: () =>
    -1.8 * (panelRef.current.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: () => "+=" + panelRef.current.scrollWidth,
    scrub: true,
    pin: true,
  },
});
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="   
    min-h-screen
    w-full
    bg-[#111]
    px-6
    lg:px-4
    py-16
    flex flex-col 
    lg:items-start
    items-center"
    >
      <div className="flex items-center justify-center gap-8 mb-8">

      <h1 className="text-4xl font-serif font-[100] text-center bg-gradient-to-r from-[#ff6a6a] to-[#ff9a8b] bg-clip-text text-transparent lg:text-6xl">
        WHY US
      </h1>
      
        <img
          className="h-20 w-20 "
          src="https://png.pngtree.com/png-clipart/20250427/original/pngtree-confused-man-with-question-marks-on-transparent-background-png-image_20851000.png"
          alt=""
          />
      </div>

      <Feature ref={panelRef} />
    </section>
  );
};

export default FeaturesSection;
