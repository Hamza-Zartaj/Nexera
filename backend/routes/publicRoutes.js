import express from "express";
import {
  sendFeedback,
  sendContact,
  getAllBlogs,
  getBlogBySlug,
} from "../controllers/publicPagesController.js";

const router = express.Router();

router.post("/feedback", sendFeedback);
router.post("/contact", sendContact);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:slug", getBlogBySlug);

export default router;
