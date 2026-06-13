import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Question.deleteMany();

await Question.insertMany([

  // ── DESIGN (4 questions, 11 pts) ──────────────────────────────────────────
  {
    question: "Convergent density (proximity of buildings providing shade and creating a cohesive urban fabric)",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 3,
    category: "Design",
  },
  {
    question: "Spatial hierarchy (hierarchy of spaces)",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 3,
    category: "Design",
  },
  {
    question: "Building orientation to protect outdoor spaces",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 3,
    category: "Design",
  },
  {
    question: "Aesthetic design quality, including coordination of urban furniture and paving",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 2,
    category: "Design",
  },

  // ── SHADING (3 questions, 9 pts) ──────────────────────────────────────────
  {
    question: "Shaded pedestrian pathways (target shade ratio > 60%)",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 3,
    category: "Shading",
  },
  {
    question: "Sun-protected seating areas (target shade ratio > 60%)",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 3,
    category: "Shading",
  },
  {
    question: "Shaded spaces for social interaction and children's play",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 3,
    category: "Shading",
  },

  // ── MATERIALS (2 questions, 3 pts) ────────────────────────────────────────
  {
    question: "Use of non-heat-absorbing flooring materials (cool pavements)",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 1,
    category: "Materials",
  },
  {
    question: "Use of light-colored walls, rooftops, and flooring",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 2,
    category: "Materials",
  },

  // ── NATURE (1 question, 2 pts) ────────────────────────────────────────────
  {
    question: "Incorporation of natural cooling elements such as trees, vegetation, green spaces, and water features",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    points: 2,
    category: "Nature",
  },

]);

console.log("Questions seeded");
process.exit();
