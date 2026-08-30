import express from "express";
import {
  googleLogin,
  loginUser,
  registerUser,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/google", googleLogin);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    user: req.user,
  });
});

export default router;
