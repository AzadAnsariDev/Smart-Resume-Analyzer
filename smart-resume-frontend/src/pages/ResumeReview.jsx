import ScoreGauge from "../components/ScoreGauge";
import SectionRow from "../components/SectionRow";

export default function ResumeReview({ analysis, onBack }) {
  if (!analysis) return null;

  // 🔥 UPDATED: score nahi, tips ke basis pe sections nikaal rahe hain
  const sections = Object.entries(analysis).filter(
    ([key, value]) =>
      key !== "overallScore" &&
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
          <ScoreGauge score={analysis.overallScore} />
        </div>

        {/* 🔥 Sections */}
        <div className="space-y-6">
          {sections.map(([key, data]) => (
            <SectionRow
              key={key}
              title={formatTitle(key)}
              level={data.level}   // 🔥 score ❌ → level ✅
              tips={data.tips}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
