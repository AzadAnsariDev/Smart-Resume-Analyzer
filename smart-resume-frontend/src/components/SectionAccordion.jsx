import { getTipUI } from "../utils/uiHelpers";

export default function SectionAccordion({ tips }) {
  return (
    <div className="p-6 space-y-4 bg-slate-900/50">
      {tips.map((tip, i) => {
        const ui = getTipUI(tip.type);

        return (
          <div
            key={i}
            className={`
              p-5 rounded-xl border-l-4
              ${ui.bg} ${ui.border}
              shadow-[0_0_25px_-10px_${ui.glow}]
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs px-3 py-1 rounded-full ${ui.badge}`}>
                {ui.label}
              </span>
            </div>

            <p className={`font-medium ${ui.text}`}>
              {tip.tip}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {tip.explanation}
            </p>
          </div>
        );
      })}
    </div>
  );
}
