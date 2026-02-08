import React, { useState } from "react";
import { useUser, SignInButton, useClerk } from "@clerk/clerk-react";

function Drop({ setAnalysis, setLoading }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();


  function handleFile(file) {
    if (!file) return;
    setFile(file);
  }

  function handleInputChange(e) {
    handleFile(e.target.files[0]);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  async function handleUpload(e) {
    e.preventDefault();
   
    if(!isSignedIn){
      openSignIn()
      return 
    }

    if (!file) return alert("Please select a file first");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      alert("Resume analyze me error aaya");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="analyze"
      className="scroll-mt-32 px-4 sm:px-6 flex justify-center mb-10"
    >
      <div className="relative w-full max-w-2xl">
        {/* Outer Glow */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 opacity-40 blur-xl"></div>

        {/* Card */}
        <div className="relative rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 sm:p-10 text-center">
          
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            Drop your resume here or choose a file
          </h3>

          <p className="mt-2 text-sm text-white/70">
            PDF & DOCX only · Max 2MB file size
          </p>

          <form
            onSubmit={handleUpload}
            className="mt-8 flex flex-col items-center gap-6"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full cursor-pointer
                flex flex-col items-center justify-center gap-3
                rounded-2xl border border-dashed
                px-6 py-8 transition
                ${
                  isDragging
                    ? "border-violet-400 bg-violet-500/10"
                    : "border-white/20 bg-white/5"
                }`}
              onClick={() => document.getElementById("resumeInput").click()}
            >
              <span className="text-white font-medium">
                {isDragging
                  ? "Drop your file here"
                  : "Click to select resume"}
              </span>

              <span className="text-xs text-white/50">
                or drag & drop file
              </span>

              <input
                id="resumeInput"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleInputChange}
              />
            </div>

            {/* File Name */}
            {file && (
              <div className="px-4 py-2 rounded-full bg-white/10 text-sm text-white">
                📄 {file.name}
              </div>
            )}

            {/* Analyze Button */}
            <button
              type="submit"
              className="mt-2 bg-gradient-to-r from-[#5B2EFF] to-[#1E40FF]
              text-white px-10 py-3 rounded-2xl font-semibold
              shadow-xl shadow-indigo-500/40
              hover:scale-[1.04] hover:shadow-indigo-500/60
              active:scale-95 transition-all duration-300"
            >
              Analyze Resume
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Drop;
