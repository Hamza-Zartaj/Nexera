import sendEmail from "../utils/emailUtil.js";
import User from "../models/User.js";
import Roadmap from "../models/Roadmap.js";
import Evaluation from "../models/Evaluation.js";
import bcrypt from "bcryptjs";

export const updateProfilePic = async (req, res) => {
  if (req.body.clear === "true" || req.body.clear === true) {
    try {
      const user = req.user;

      user.profilePic = null;
      await user.save();

      return res.status(200).json({
        message: "Profile picture cleared successfully",
      });
    } catch (error) {
      console.error("Error clearing profile picture:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = `/uploads/profile-pics/${req.file.filename}`;

  try {
    const user = req.user;

    user.profilePic = filePath;
    await user.save();

    return res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: filePath,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    await sendEmail(
      user.email,
      "Profile Updated",
      `Hi ${user.username},\n\nYour Nexera profile was successfully updated.\n\nRegards,\nNexera Team`
    );

    const userResponse = await User.findById(userId).select("-password");
    res
      .status(200)
      .json({ message: "User info updated successfully", user: userResponse });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const assignCareer = async (req, res) => {
  try {
    const { career } = req.body;
    if (!career) {
      return res.status(400).json({ message: "Career is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user.career = career;
    await req.user.save();

    res.status(200).json({ message: "Career assigned successfully" });
  } catch (error) {
    console.error("Error assigning career:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const assignRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.body;
    if (!roadmapId) {
      return res.status(400).json({ message: "Roadmap ID is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user.roadmapId = roadmapId;
    await req.user.save();

    res.status(200).json({ message: "Roadmap assigned successfully" });
  } catch (error) {
    console.error("Error assigning roadmap:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRoadmap = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.roadmapId) {
      return res.status(400).json({ message: "Roadmap not assigned" });
    }

    const roadmap = await Roadmap.findById(user.roadmapId);
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    res.status(200).json({
      roadmap,
      message: "Roadmap fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching roadmap:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRoadmap = async (req, res) => {
  const { roadmapId } = req.params;
  const { stageId, taskId, isCompleted, stageStatus } = req.body;

  try {
    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });

    const stage = roadmap.stages.id(stageId);
    if (!stage) return res.status(400).json({ message: "Invalid stage ID" });

    // Update task completion
    if (taskId && typeof isCompleted === "boolean") {
      const task = stage.tasks.id(taskId);
      if (!task) return res.status(400).json({ message: "Invalid task ID" });

      task.isCompleted = isCompleted;
      task.completedAt = isCompleted ? new Date() : null;
    }

    // Update stage status
    if (
      stageStatus &&
      ["completed", "in-progress", "upcoming", "incomplete"].includes(
        stageStatus
      )
    ) {
      stage.status = stageStatus;

      // Move next stage to in-progress
      const stageIndex = roadmap.stages.findIndex((s) =>
        s._id.equals(stage._id)
      );
      const nextStage = roadmap.stages[stageIndex + 1];
      if (
        stageStatus === "completed" &&
        nextStage &&
        nextStage.status !== "completed"
      ) {
        nextStage.status = "in-progress";
      }
    }

    await roadmap.save();

    res.status(200).json({ message: "Roadmap updated successfully", roadmap });
  } catch (error) {
    console.error("Error updating roadmap:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleEvaluation = async (req, res) => {
  try {
    const { evaluationId } = req.params;
    if (!evaluationId) {
      return res.status(400).json({ message: "Evaluation ID is required" });
    }

    const evaluation = await Evaluation.findById(evaluationId);
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluation not found" });
    }

    res.status(200).json({
      evaluation,
      message: "Evaluation fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching evaluation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ userId: req.user.id });
    if (!evaluations || evaluations.length === 0) {
      return res.status(404).json({ message: "No evaluations found" });
    }

    res.status(200).json({
      evaluations,
      message: "Evaluations fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLatestUserEvaluation = async (req, res) => {
  try {
    const latestEvaluation = await Evaluation.findOne({
      userId: req.user.id,
    }).sort({ createdAt: -1 });
    if (!latestEvaluation) {
      return res.status(404).json({ message: "No evaluations found" });
    }

    res.status(200).json({
      evaluation: latestEvaluation,
      message: "Latest evaluation fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching latest evaluation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
