import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- MONGODB CONNECT ---
mongoose
  .connect("mongodb://localhost:27017/Smart-Resume")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// --- USER MODEL ---
const UserSchema = new mongoose.Schema({
  clerkId: String,
  email: String,
  name: String,
  image: String,
});

const User = mongoose.model("User", UserSchema);

// --- ROUTE: Save User ---
app.post("/api/save-user", async (req, res) => {
  try {
    const { clerkId, email, name, image } = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId },
      { email, name, image },
      { new: true, upsert: true }   // ⭐ important
    );

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



// --- START SERVER ---
app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
