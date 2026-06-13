import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);
export default mongoose.model("Question", questionSchema);
