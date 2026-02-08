import { useEffect, useState } from "react";

export default function ScoreGauge({ score }) {
  const radius = 50;        // ⬅️ mobile friendly
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progress = Math.min(Math.max(score, 0), 100) / 100;
    const newOffset = circumference * (1 - progress);
    setOffset(newOffset);
  }, [score, circumference]);

  return (
    <div
      className="
        flex flex-col sm:flex-row items-center gap-6 sm:gap-8
        bg-slate-900/60 rounded-3xl p-5 sm:p-8
        border border-slate-700/40
        w-full max-w-full overflow-hidden
      "
    >
      {/* 🔥 Circle */}
      <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] shrink-0">
        <svg height="100%" width="100%" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            stroke="rgba(255,255,255,0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="70"
            cy="70"
          />

          {/* Progress circle */}
          <circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            r={normalizedRadius}
            cx="70"
            cy="70"
            style={{
              transition: "stroke-dashoffset 1s ease-out",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />

          {/* Gradient */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold text-indigo-400">
            {score}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-100">
          Your Resume Score
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mt-1">
          Based on ATS, content, structure & skills
        </p>
      </div>
    </div>
  );
}
