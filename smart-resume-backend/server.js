import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./auth.js";
import resumeRoutes from "./resume.js";


import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());


// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// load routes
authRoutes(app);
resumeRoutes(app);

app.get("/ping", (req, res) => {
  res.send("SRa backend running 🚀");
});

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


