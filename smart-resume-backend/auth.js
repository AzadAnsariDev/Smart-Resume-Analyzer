import mongoose from "mongoose";

// schema
const UserSchema = new mongoose.Schema({
  clerkId: String,
  email: String,
  name: String,
  image: String,
});

const User = mongoose.model("User", UserSchema);

// EXPORT FUNCTION
export default function authRoutes(app) {

  app.post("/api/save-user", async (req, res) => {
    try {
      const { clerkId, email, name, image } = req.body;

      const user = await User.findOneAndUpdate(
        { clerkId },
        { email, name, image },
        { new: true, upsert: true }
      );

      res.json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

}
