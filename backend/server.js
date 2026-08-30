// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";

import uploadsMiddleware from "./middlewares/uploadsMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";

import Blog from "./models/Blog.js";

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = process.env.CORS_ORIGIN
  ? { origin: process.env.CORS_ORIGIN }
  : undefined;

// global middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", uploadsMiddleware);

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
} else {
  console.warn("MONGO_URI is not set; database-backed routes will fail until it is configured.");
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// routes
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", authMiddleware, profileRoutes);
app.use("/api/public", publicRoutes);

app.get("/blog_gen", (req, res) => {
  let { id } = req.query;
  if (id === "ai") {
    res.sendFile("index.html", { root: "./blog_gen" });
    return;
  }

  res.status(404).json({ message: "Blog generator not found" });
});

app.get("/action", async (req, res) => {
  try {
    const currentDate = new Date();

    const missingCount = await Blog.countDocuments({
      createdAt: { $exists: false },
    });
    console.log("Documents missing createdAt:", missingCount);

    const result = await Blog.updateMany(
      { createdAt: { $exists: false } },
      { $set: { createdAt: currentDate } }
    );

    console.log("Matched:", result.matchedCount);
    console.log("Modified:", result.modifiedCount);

    res.json({
      message: "Attempted to add createdAt to documents.",
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", msg: error.message });
  }
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
