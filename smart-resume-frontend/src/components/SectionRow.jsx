import { useState } from "react";
import SectionAccordion from "./SectionAccordion";

export default function SectionRow({ title, level, tips }) {
  const [open, setOpen] = useState(false);

  // 🔥 level → score mapping
  const levelToScore = {
    very_weak: 45,
    weak: 55,
    below_average: 60,
    average: 68,
    good: 78,
    strong: 88,
  };

  const score = levelToScore[level] ?? 60;

  // 🔥 badge color based on score
  const badge =
    score >= 75
      ? "bg-green-900/40 text-green-400 border-green-500"
      : score >= 50
      ? "bg-yellow-900/40 text-yellow-400 border-yellow-500"
      : "bg-red-900/40 text-red-400 border-red-500";

  return (
    <div className="rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full p-6 flex justify-between items-center
          bg-slate-900/70 border border-slate-700/40
          hover:border-indigo-400/50
          hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.6)]
          transition-all
        "
      >
        <h3 className="text-lg font-semibold capitalize text-gray-100">
          {title}
        </h3>

        {/* 🔥 SCORE BADGE */}
        <span className={`px-4 py-1 rounded-full border text-sm ${badge}`}>
          {score}/100
        </span>
      </button>

      {/* 🔥 Accordion */}
      {open && <SectionAccordion tips={tips} />}
    </div>
  );
}
