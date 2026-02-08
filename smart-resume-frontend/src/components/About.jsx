import React from 'react'

const About = () => {
  return (
<footer id='about' className="relative w-full overflow-hidden bg-[#05060f] text-gray-400">


    {/* <h1 className='text-6xl text-center mt-6 font-mono'>About Us</h1> */}

  {/* Grid background */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

  {/* Glow */}
  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-20">

    {/* Top AI card */}
    <div className="mb-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col md:flex-row justify-between gap-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">
          Smart Resume Analyzer
        </h2>
        <p className="text-sm mt-2 max-w-md">
          Smart platform that analyzes resumes, give suggestions,
          and helps candidates stands out.
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <button className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition">
          <a href="#analyze">Try Analyzer</a>
        </button>
        <button className="px-6 py-3 rounded-full border border-white/20 text-sm hover:bg-white/10 transition">
          <a href="#">Back to Top</a>
        </button>
      </div>
    </div>

    {/* Footer cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h3 className="text-white font-medium mb-3">Core Features</h3>
        <ul className="space-y-2 text-sm">
          <li>ATS Resume Scoring</li>
          <li>Smart Suggestions</li>
          <li>What to Improve</li>
          <li>Interactive Dashboard</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h3 className="text-white font-medium mb-3">Technology</h3>
        <ul className="space-y-2 text-sm">
          <li>React JS</li>
          <li>Node JS</li>
          <li>Mongo DB</li>
          <li>Clerk Secure Auth</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <h3 className="text-white font-medium mb-3">Project Info</h3>
        <ul className="space-y-2 text-sm">
          <li>Final Year Project</li>
          <li>BSc IT – Mumbai University</li>
          <li>Built by Azad Ansari</li>
          <li>2025 – 2026</li>
        </ul>
      </div>

    </div>

    {/* Bottom */}
    <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
      <p>© {new Date().getFullYear()} Smart Resume Analyzer</p>
      <p>Designed by Azad ❤️</p>
    </div>

  </div>
</footer>

  )
}

export default About