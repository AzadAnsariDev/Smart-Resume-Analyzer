import multer from "multer";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import dotenv from "dotenv";
import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// =========================
// Multer
// =========================
const upload = multer({ storage: multer.memoryStorage() });

// =========================
// In-memory cache (SAFE)
// =========================
const resumeCache = new Map();

// 🔥 TEMP: clear old cache on server start
resumeCache.clear();

// =========================
// Gemini SDK
// =========================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.2, // stable
    maxOutputTokens: 3000,
  },
});

// =========================
// Helpers
// =========================
async function askGemini(prompt) {
  const result = await model.generateContent(prompt);
  return (
    result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || ""
  ).trim();
}

function safeJSONParse(text) {
  const cleaned = text.replace(/```json|```/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("No JSON object found");
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

async function askGeminiJSON(prompt) {
  const first = await askGemini(prompt);
  try {
    return safeJSONParse(first);
  } catch {
    const retry = await askGemini(`
You MUST return COMPLETE and VALID JSON only.
Do not add explanations, comments, or markdown.
Take your time and do NOT truncate.

${prompt}
`);
    return safeJSONParse(retry);
  }
}

// 🔒 Resume hash (same resume = same result)
function generateResumeHash(text) {
  return crypto
    .createHash("sha256")
    .update(text.replace(/\s+/g, " ").trim())
    .digest("hex");
}

// =========================
// ALGORITHM (NEW - TRADITIONAL ATS)
// =========================
function normalizeAlgo(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

const ALGO_SKILLS = [
  "javascript","react","node","express","mongodb","sql","html","css",
  "git","github","docker","aws","api","python","java","tailwind"
];

function algoScoreToLevel(score) {
  if (score <= 30) return "very_weak";
  if (score <= 40) return "weak";
  if (score <= 55) return "below_average";
  if (score <= 70) return "average";
  if (score <= 85) return "good";
  return "strong";
}

function algorithmAnalysis(resumeText) {
  const resume = normalizeAlgo(resumeText);

  // ATS SCORE (simple keyword density)
  const words = resume.split(" ");
  const uniqueWords = [...new Set(words)];
  const atsScoreRaw = Math.min(100, Math.round((uniqueWords.length / 200) * 100));

  const ATS_algo = {
    level: algoScoreToLevel(atsScoreRaw),
    tips: [
      {
        type: "improve",
        tip: "Use more job-relevant keywords",
        explanation:
          "Including relevant skills, tools, and role-specific keywords improves keyword matching in traditional ATS systems and increases the likelihood of your resume passing automated screening filters."
      }
    ]
  };

  const presentSkills = ALGO_SKILLS.filter(s => resume.includes(s));
  const skills_algo = {
    level: algoScoreToLevel(Math.round((presentSkills.length / ALGO_SKILLS.length) * 100)),
    tips: [
      {
        type: "improve",
        tip: "Add missing relevant skills",
        explanation:
          "Adding relevant technical skills aligned with the job role helps ATS systems match your profile more accurately and assists recruiters in quickly assessing your suitability for the position."
      }
    ]
  };

  const hasProjects = resume.includes("projects");
  const structure_algo = {
    level: hasProjects ? "good" : "below_average",
    tips: [
      {
        type: "improve",
        tip: "Add standard section headings",
        explanation:
          "Using clear and standard section headings such as Skills, Experience, Education, and Projects helps ATS software correctly parse and organize resume content during automated screening."
      }
    ]
  };

  const hasNumbers = /\d+%|\d+\+/.test(resume);
  const content_algo = {
    level: hasNumbers ? "good" : "average",
    tips: [
      {
        type: "improve",
        tip: "Add measurable achievements",
        explanation:
          "Including quantified achievements and outcomes strengthens resume content quality and helps both ATS systems and recruiters better understand the impact of your contributions."
      }
    ]
  };

  const longLines = resumeText.split(".").some(s => s.length > 180);
  const toneAndStyle_algo = {
    level: longLines ? "average" : "good",
    tips: [
      {
        type: "improve",
        tip: "Use concise bullet points",
        explanation:
          "Keeping bullet points concise and well-structured improves readability and professional tone, making it easier for ATS systems and recruiters to quickly scan your resume."
      }
    ]
  };

  return {
    ATS: ATS_algo,
    toneAndStyle: toneAndStyle_algo,
    content: content_algo,
    structure: structure_algo,
    skills: skills_algo,
    atsScore: atsScoreRaw
  };
}

// =========================
// Routes
// =========================
export default function resumeRoutes(app) {
  app.post("/api/resume/upload", upload.single("resume"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No resume uploaded" });
      }

      let extractedText = "";

      // ---------- PDF ----------
      if (req.file.mimetype === "application/pdf") {
        const pdf = await pdfjsLib
          .getDocument({ data: new Uint8Array(req.file.buffer) })
          .promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          extractedText += content.items.map(i => i.str).join(" ") + "\n";
        }
      }

      // ---------- DOCX ----------
      else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({
          buffer: req.file.buffer,
        });
        extractedText = result.value;
      } else {
        return res.status(400).json({ message: "Only PDF or DOCX allowed" });
      }

      const resumeText = extractedText.slice(0, 8000);
      const resumeHash = generateResumeHash(resumeText);

      // 🔁 CACHE HIT → SAME RESULT
      if (resumeCache.has(resumeHash)) {
        return res.json({
          message: "Resume analyzed successfully (cached) ⚡",
          analysis: resumeCache.get(resumeHash),
        });
      }

      // =========================
      // AI ANALYSIS (PROMPTS SAME)
      // =========================

      const ATS = await askGeminiJSON(`
Analyze the resume for ATS suitability.

Classify into ONE level only:
0–30 = very_weak
31–40 = weak
41–55 = below_average
56–70 = average
71–85 = good
86–100 = strong

Return JSON ONLY:
{
  "level": "very_weak | weak | below_average | average | good | strong",
  "tips": [
    { "type": "good" | "improve", "tip": string, "explanation": string }
  ]
}

Rules:
- EXACTLY 3 tips
- explanation must be detailed
- tips must NOT be empty
- explanation must be 30–40 words ONLY
- explanation must be a COMPLETE sentence

Resume:
"""
${resumeText}
"""
`);

      const toneAndStyle = await askGeminiJSON(`
Analyze tone and writing style.

Classify into ONE level only:
0–30 = very_weak
31–40 = weak
41–55 = below_average
56–70 = average
71–85 = good
86–100 = strong

Return JSON ONLY:
{
  "level": "very_weak | weak | below_average | average | good | strong",
  "tips": [
    { "type": "good" | "improve", "tip": string, "explanation": string }
  ]
}

Rules:
- EXACTLY 3 tips
- explanation must be detailed
- tips must NOT be empty
- explanation must be 30–40 words ONLY
- explanation must be a COMPLETE sentence

Resume:
"""
${resumeText}
"""
`);

      const content = await askGeminiJSON(`
Analyze resume content quality.

Classify into ONE level only:
0–30 = very_weak
31–40 = weak
41–55 = below_average
56–70 = average
71–85 = good
86–100 = strong

Return JSON ONLY:
{
  "level": "very_weak | weak | below_average | average | good | strong",
  "tips": [
    { "type": "good" | "improve", "tip": string, "explanation": string }
  ]
}

Rules:
- EXACTLY 3 tips
- explanation must be detailed
- tips must NOT be empty
- explanation must be 30–40 words ONLY
- explanation must be a COMPLETE sentence

Resume:
"""
${resumeText}
"""
`);

      const structure = await askGeminiJSON(`
Analyze resume structure and formatting.

Classify into ONE level only:
0–30 = very_weak
31–40 = weak
41–55 = below_average
56–70 = average
71–85 = good
86–100 = strong

Return JSON ONLY:
{
  "level": "very_weak | weak | below_average | average | good | strong",
  "tips": [
    { "type": "good" | "improve", "tip": string, "explanation": string }
  ]
}

Rules:
- EXACTLY 3 tips
- explanation must be detailed
- tips must NOT be empty
- explanation must be 30–40 words ONLY
- explanation must be a COMPLETE sentence

Resume:
"""
${resumeText}
"""
`);

      const skills = await askGeminiJSON(`
Analyze skills relevance and clarity.

Classify into ONE level only:
0–30 = very_weak
31–40 = weak
41–55 = below_average
56–70 = average
71–85 = good
86–100 = strong

Return JSON ONLY:
{
  "level": "very_weak | weak | below_average | average | good | strong",
  "tips": [
    { "type": "good" | "improve", "tip": string, "explanation": string }
  ]
}

Rules:
- EXACTLY 3 tips
- explanation must be detailed
- tips must NOT be empty
- explanation must be 30–40 words ONLY
- explanation must be a COMPLETE sentence

Resume:
"""
${resumeText}
"""
`);

      let overallScore = 0;

      if (ATS.level === "very_weak") overallScore += 30 * 0.3;
      if (ATS.level === "weak") overallScore += 45 * 0.3;
      if (ATS.level === "below_average") overallScore += 55 * 0.3;
      if (ATS.level === "average") overallScore += 65 * 0.3;
      if (ATS.level === "good") overallScore += 78 * 0.3;
      if (ATS.level === "strong") overallScore += 88 * 0.3;

      if (content.level === "very_weak") overallScore += 30 * 0.25;
      if (content.level === "weak") overallScore += 45 * 0.25;
      if (content.level === "below_average") overallScore += 55 * 0.25;
      if (content.level === "average") overallScore += 65 * 0.25;
      if (content.level === "good") overallScore += 78 * 0.25;
      if (content.level === "strong") overallScore += 88 * 0.25;

      if (skills.level === "very_weak") overallScore += 30 * 0.2;
      if (skills.level === "weak") overallScore += 45 * 0.2;
      if (skills.level === "below_average") overallScore += 55 * 0.2;
      if (skills.level === "average") overallScore += 65 * 0.2;
      if (skills.level === "good") overallScore += 78 * 0.2;
      if (skills.level === "strong") overallScore += 88 * 0.2;

      if (structure.level === "very_weak") overallScore += 30 * 0.15;
      if (structure.level === "weak") overallScore += 45 * 0.15;
      if (structure.level === "below_average") overallScore += 55 * 0.15;
      if (structure.level === "average") overallScore += 65 * 0.15;
      if (structure.level === "good") overallScore += 78 * 0.15;
      if (structure.level === "strong") overallScore += 88 * 0.15;

      if (toneAndStyle.level === "very_weak") overallScore += 30 * 0.1;
      if (toneAndStyle.level === "weak") overallScore += 45 * 0.1;
      if (toneAndStyle.level === "below_average") overallScore += 55 * 0.1;
      if (toneAndStyle.level === "average") overallScore += 65 * 0.1;
      if (toneAndStyle.level === "good") overallScore += 78 * 0.1;
      if (toneAndStyle.level === "strong") overallScore += 88 * 0.1;

      overallScore = Math.round(overallScore);

      // =========================
      // ALGORITHM ANALYSIS (NEW)
      // =========================
      const algorithm = algorithmAnalysis(resumeText);

      // =========================
      // FINAL RESPONSE (SAFE)
      // =========================
      const finalAnalysis = {
        overallScore,
        ATS,
        toneAndStyle,
        content,
        structure,
        skills,
        algorithm
      };

      // 🔐 SAVE CACHE
      resumeCache.set(resumeHash, finalAnalysis);

      res.json({
        message: "Resume analyzed successfully 🚀",
        analysis: finalAnalysis,
      });

    } catch (err) {
      console.error("RESUME ERROR:", err);
      res.status(500).json({
        message: "Error analyzing resume",
        error: err.message,
      });
    }
  });
}