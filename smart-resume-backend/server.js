import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./auth.js";
import resumeRoutes from "./resume.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect("mongodb://localhost:27017/Smart-Resume")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// load routes
authRoutes(app);
resumeRoutes(app);

app.get("/ping", (req, res) => {
  res.send("SRa backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


