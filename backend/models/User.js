import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    // required: true,
    trim: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  career: {
    type: String,
    required: false,
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roadmap",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userScheme);
export default User;
