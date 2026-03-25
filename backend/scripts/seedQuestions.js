import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Question.deleteMany();

await Question.insertMany([
  {
    question: "Is the project environmentally sustainable?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 2,
  },
  {
    question: "Does the design follow urban planning standards?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 3,
  },
  {
    question: "Is the structure resistant to desert climate?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 2,
  },
]);

console.log("Questions seeded");
process.exit();
