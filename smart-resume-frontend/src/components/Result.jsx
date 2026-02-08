import React from "react";

function Result({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="max-w-6xl mx-auto mt-16 px-4">
      
      {/* Overall Score */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Overall Resume Score</h2>
        <p className="text-6xl font-extrabold mt-4">
          {analysis.overallScore}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(analysis)
          .filter(
            ([_, value]) =>
              value &&
              typeof value === "object" &&
              "score" in value &&
              Array.isArray(value.tips)
          )
          .map(([section, data]) => (
            <div
              key={section}
              className="bg-white border rounded-2xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold uppercase">{section}</h3>
                <span className="text-3xl font-extrabold">
                  {data.score}
                </span>
              </div>

              <div className="space-y-3">
                {data.tips.map((tip, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded">
                    <p className="font-medium">{tip.tip}</p>
                    <p className="text-sm text-gray-600">
                      {tip.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Result;
