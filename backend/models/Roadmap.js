import mongoose from "mongoose";

const roadmapSchema = mongoose.Schema(
  {
    career_title: {
      type: String,
      required: true,
    },

    stages: [
      {
        title: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["completed", "in-progress", "upcoming", "incomplete"],
          default: "incomplete",
        },
        description: {
          type: String,
          required: true,
        },

        duration: {
          type: Number,
          default: 0,
        },

        tasks: [
          {
            title: {
              type: String,
              required: true,
            },
            text: {
              type: String,
              required: true,
            },

            isCompleted: {
              type: Boolean,
              default: false,
            },

            completedAt: {
              type: Date,
              default: null,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;
