// this is the schema for storing cv text and its related fields and evaluation.
import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cvText: {
      type: String,
      required: true,
      trim: true,
    },

    // Rating parameters (1-10 scale)
    ratings: {
      relevance: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
      },

      clarity: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
      },
      overall: {
        type: Number,
        required: true,
        min: 0,
        max: 1,
      },
    },

    suggestions: {
      type: String,
      required: true,
    },

    additions: [
      {
        text: {
          type: String,
          required: true,
        },
        reason: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Evaluation = mongoose.model("Evaluation", evaluationSchema);
export default Evaluation;
