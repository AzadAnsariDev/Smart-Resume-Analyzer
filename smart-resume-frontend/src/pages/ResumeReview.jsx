import { useState } from "react";
import ScoreGauge from "../components/ScoreGauge";
import SectionRow from "../components/SectionRow";

export default function ResumeReview({ analysis, onBack }) {
  if (!analysis) return null;

  const [mode, setMode] = useState("ai"); // "ai" | "algo"

  // 🔐 Safe source (AI or Algorithm)
  const source =
    mode === "ai"
      ? analysis
      : (analysis?.algorithm || {});

  // 🔎 Sections filter (works for both AI & Algorithm)
  const sections = Object.entries(source || {}).filter(
    ([key, value]) =>
      key !== "overallScore" &&
      key !== "atsScore" &&
      value &&
      typeof value === "object" &&
      Array.isArray(value.tips) &&
      value.tips.length > 0
  );

  // 🔹 Title formatter (toneAndStyle → Tone & Style)
  const formatTitle = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase());
  };

  console.log("FULL ANALYSIS 👉", analysis);
console.log("ALGORITHM 👉", analysis?.algorithm);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-gray-200 p-10">

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-black" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto pt-24 px-6">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-100">
            Resume Review
          </h1>
          <p className="text-gray-400 mt-2">
            AI-powered resume analysis & ATS insights
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setMode("ai")}
            className={`px-4 py-2 rounded-full border transition-all ${
              mode === "ai"
                ? "bg-indigo-600/30 border-indigo-400/60 text-white shadow-[0_0_20px_-8px_rgba(99,102,241,0.6)]"
                : "bg-slate-900/70 border-slate-700/50 text-gray-300 hover:text-white"
            }`}
          >
            AI (Gemini)
          </button>
          <button
            onClick={() => setMode("algo")}
            className={`px-4 py-2 rounded-full border transition-all ${
              mode === "algo"
                ? "bg-indigo-600/30 border-indigo-400/60 text-white shadow-[0_0_20px_-8px_rgba(99,102,241,0.6)]"
                : "bg-slate-900/70 border-slate-700/50 text-gray-300 hover:text-white"
            }`}
          >
            Algorithm ATS
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="
            mb-10
            px-5 py-2 rounded-full
            bg-slate-900/70 border border-slate-700/50
            text-gray-300 hover:text-white
            hover:border-indigo-400/60
            hover:shadow-[0_0_25px_-8px_rgba(99,102,241,0.6)]
            transition-all
          "
        >
          ← Back to Home
        </button>

        {/* Overall Score */}
        <div className="mb-14">
          <ScoreGauge
            score={
              mode === "ai"
                ? analysis?.overallScore || 0
                : analysis?.algorithm?.atsScore || 0
            }
          />
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.length === 0 && (
            <div className="text-gray-400 italic">
              No analysis sections available for this mode.
            </div>
          )}

          {sections.map(([key, data]) => (
            <SectionRow
              key={key}
              title={formatTitle(key)}
              level={data.level}
              tips={data.tips}
            />
          ))}
        </div>
      </div>
    </div>
  );
}