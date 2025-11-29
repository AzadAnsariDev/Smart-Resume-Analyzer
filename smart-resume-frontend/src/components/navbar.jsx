import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  const navbarRef = useRef(null);

  useEffect(() => {
    let lastScroll = 0;
    const navbar = navbarRef.current;

    const handleScroll = () => {
      let current = window.scrollY;

      if (current > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      if (current > lastScroll && current > 80) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbar" ref={navbarRef}>
      <div id="logo-container">
        <img src="https://img.icons8.com/arcade/64/resume.png" alt="resume" />
        <h2>UpgradeCV</h2>
      </div>

      <div className="glow1"></div>

      <div id="nav-info">
        <Link to="/"><h4>Home</h4></Link>
        <Link to="/features"><h4>Service</h4></Link>
        <Link to="/about"><h4>About</h4></Link>
        <Link to="/contact"><h4>Contact</h4></Link>
      </div>

      <div id="login">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="nav-btn1">Sign in</button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="nav-btn2">Get Started</button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <div id="mobileview">
        <i className="ri-phone-fill"></i>
        <i className="ri-menu-line"></i>
      </div>
    </nav>
  );
}
