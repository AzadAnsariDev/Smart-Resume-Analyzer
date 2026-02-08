import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

// Components
import Navbar from "./navbar";
import Drop from "./drop.jsx";
import HeroSection from "./HeroSection.jsx";
import Testimonial from "./Testimonial.jsx";
import FeaturesSection from "./FeaturesSection.jsx";
import Footer from "./Footer.jsx";
import About from "./About.jsx";
import Loader from "./Loader";

// 🔥 NEW PREMIUM REVIEW PAGE
import ResumeReview from "../pages/ResumeReview";

// Styles
import "../styles/main.scss";

export default function App() {
  const { user, isSignedIn } = useUser();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Save user once logged in
  async function saveUserToBackend(user) {
    try {
      await fetch("http://localhost:5000/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          image: user.imageUrl,
        }),
      });
    } catch (err) {
      console.error("User save error:", err);
    }
  }

  useEffect(() => {
    if (isSignedIn && user) {
      saveUserToBackend(user);
    }
  }, [isSignedIn, user]);

  useEffect(() => {
  if (analysis) {
    console.log("ANALYSIS DATA 👉", analysis);
  }
}, [analysis]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navbar />

      {/* 🔥 GLOBAL LOADER */}
      {loading && <Loader />}

      {/* 🔥 IF ANALYSIS EXISTS → SHOW PREMIUM REVIEW PAGE */}
      {analysis ? (
        <ResumeReview
  analysis={analysis.analysis}
  onBack={() => setAnalysis(null)}
/>

      ) : (
        <>
          <HeroSection />
          <Drop setAnalysis={setAnalysis} setLoading={setLoading} />
          <FeaturesSection />
          <Testimonial />
          <About />
          <Footer />
        </>
      )}
    </main>
  );
}
