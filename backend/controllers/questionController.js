import Question from "../models/Question.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().select("-correctAnswer");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};
