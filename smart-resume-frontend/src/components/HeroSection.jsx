import ResumeCarousel from "./ResumeCarousel";

export default function HeroSection() {
  return (
    <section id="info-resume">

      <div id="info1">
        <h2>
          Turn your resume amazing <span id="diff"> with UpgradeCV.</span>
        </h2>
        
      <div className="glow1"></div>
        <p>

          ATS Check, Smart Suggestions, and Quick Job Tailoring take your
          resume from average to outstanding.
        </p>
        <button>
          <a href="#analyze">Get Your Resume Score</a>
          </button>
      </div>

      <ResumeCarousel />

    </section>
  );
}
