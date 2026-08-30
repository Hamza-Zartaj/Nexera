import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  updateProfilePic,
  updateUserProfile,
  resetPassword,
  assignCareer,
  assignRoadmap,
  getAllEvaluations,
  getLatestUserEvaluation,
  getRoadmap,
  getSingleEvaluation,
  updateRoadmap,
} from "../controllers/profileController.js";

const router = express.Router();
const profilePicsDir = path.join(process.cwd(), "uploads", "profile-pics");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(profilePicsDir, { recursive: true });
    cb(null, profilePicsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.put("/photo", upload.single("profilePic"), updateProfilePic);
router.put("/update", updateUserProfile);
router.post("/reset-password", resetPassword);
router.post("/career", assignCareer);
router.post("/roadmap", assignRoadmap);
router.get("/roadmap", getRoadmap);
router.patch("/roadmap/:roadmapId", updateRoadmap);
router.get("/evaluations", getAllEvaluations);
router.get("/evaluations/latest", getLatestUserEvaluation);
router.get("/evaluations/:evaluationId", getSingleEvaluation);

export default router;
