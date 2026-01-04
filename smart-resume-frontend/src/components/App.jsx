import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

// Components
import Navbar from "./navbar";
import Drop from "./drop.jsx";
import HeroSection from "./HeroSection.jsx";
import Testonomial from "./Testonomial.jsx";

// import FeaturesSection from "./FeaturesSection";

// STYLES — VERY IMPORTANT
import "../styles/main.scss";
import FeaturesSection from "./FeaturesSection.jsx";
import Footer from "./Footer.jsx";
import About from "./About.jsx";


export default function App() {
  const { user, isSignedIn } = useUser();

  async function saveUserToBackend(user) {
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
  }

  useEffect(() => {
    if (isSignedIn && user) {
      saveUserToBackend(user);
    }
  }, [isSignedIn, user]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Drop />
      <FeaturesSection />
      <Testonomial />
      <About/>
      <Footer/>
    </main>
  );
}
