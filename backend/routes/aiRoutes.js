import express from "express";
import {
  getAIResponse,
  getAIBlog,
  evaluateCV,
  generateRoadMap,
  generateSubResources,
} from "../controllers/aiController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();
const cvDir = "uploads/cv";
const upload = multer({
  dest: cvDir,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

fs.mkdirSync(cvDir, { recursive: true });

router.post("/quiz/evaluate", getAIResponse);
router.post("/blog", getAIBlog);
router.post("/roadmap/generate", authMiddleware, generateRoadMap);
router.post("/resources/sub", generateSubResources);
router.post("/cv/evaluate", authMiddleware, upload.single("cv"), evaluateCV);

export default router;

