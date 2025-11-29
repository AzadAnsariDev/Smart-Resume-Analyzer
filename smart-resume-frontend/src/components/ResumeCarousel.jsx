import React, { useEffect, useRef } from "react";

export default function ResumeCarousel() {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const resumes = box.querySelectorAll(".resume");
    let index = 0;

    function rotateRam() {
      resumes.forEach((img, i) => {
        const pos = (i - index + resumes.length) % resumes.length;

        if (pos === 0) {
          img.style.transform = "translateZ(50px) rotateY(0deg)";
          img.style.opacity = 1;
          img.style.zIndex = 5;
        } else if (pos === 1) {
          img.style.transform = "translateZ(-20px) rotateY(50deg)";
          img.style.opacity = 0.7;
          img.style.zIndex = 4;
        } else if (pos === 2) {
          img.style.transform = "translateZ(-60px) rotateY(50deg)";
          img.style.opacity = 0.5;
          img.style.zIndex = 3;
        } else {
          img.style.transform = "translateZ(-100px) rotateY(50deg)";
          img.style.opacity = 0;
          img.style.zIndex = 1;
        }
      });
      index = (index + 1) % resumes.length;
    }

    rotateRam();
    setInterval(rotateRam, 3000);
  }, []);

  return (
    <div className="resume-stack" ref={boxRef}>
      <img className="resume" src="/images/resume1.jpg" />
      <img className="resume" src="/images/resume2.jpg" />
      <img className="resume" src="/images/resume3.jpg" />
      <img className="resume" src="/images/resume4.jpg" />
      <div className="glow3"></div>
    </div>
  );
}
