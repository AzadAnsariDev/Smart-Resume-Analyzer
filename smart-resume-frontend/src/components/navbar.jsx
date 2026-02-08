import React, { useEffect, useRef, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  const navbarRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const navbar = navbarRef.current;

    const handleScroll = () => {
      let current = window.scrollY;

      if (current >= 0) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      if (current > lastScroll && current > 80) {
        navbar.style.transform = "translateY(-100%)";
        setMobileOpen(false); 
      } else {
        navbar.style.transform = "translateY(0)";
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav id="navbar" ref={navbarRef}>
        <div id="logo-container">
          <img src="https://img.icons8.com/arcade/64/resume.png" alt="resume" />
          <h2>UpgradeCV</h2>
        </div>

        <div id="nav-info" className="hidden md:flex">
          <a href="#">Home</a>
          <a href="#solutions">Solutions</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div id="login" className="hidden md:flex">
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

        {/* Mobile icons */}
        <div id="mobileview" className="lg:hidden flex items-center gap-4">
          <a href="#contact"><i className="ri-phone-fill"></i></a>
          <i
            className="ri-menu-line cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
          ></i>
        </div>
      </nav>

      {/* 🔽 Mobile Slide Menu */}
{/* Backdrop (click outside to close) */}
{mobileOpen && (
  <div
    className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
    onClick={() => setMobileOpen(false)}
  />
)}

{/* Mobile Slide Menu */}
<div
  className={`
    fixed top-[80px] left-0 w-full z-40 lg:hidden
    transition-all duration-300 ease-out
    ${mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"}
  `}
>
  <div className="mx-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl">
    <div className="flex justify-center items-center gap-5 py-6 text-white">
      <a onClick={() => setMobileOpen(false)} href="#">Home</a>
      <a onClick={() => setMobileOpen(false)} href="#solutions">Solutions</a>
      <a onClick={() => setMobileOpen(false)} href="#about">About</a>
                  <SignInButton mode="modal">
              <button className="nav-btn1">Sign in</button>
            </SignInButton>
    </div>
  </div>
</div>

    </>
  );
}
