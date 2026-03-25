import Project from "../models/Project.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import Notification from "../models/Notification.js";

// Create a new project(architects only)
export const createProject = async (req, res) => {
  try {
    if (req.user.role !== "architect") {
      return res
        .status(403)
        .json({ message: "Only architects can create projects" });
    }
    const { title, description, answers } = req.body;
    // Check if a PDF file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }
    // Parse the answers from the request body and create a new project in the database with the provided title, PDF file path, and answers
    const parsedAnswers = JSON.parse(answers);

    // Fetch questions to evaluate answers and calculate score
    const questions = await Question.find();
    let totalScore = 0;

    const evaluatedAnswers = parsedAnswers.map((ans) => {
      const question = questions.find((q) => q._id.toString() === ans.questionId);
      if (question) {
        const isCorrect = ans.selectedAnswer === question.correctAnswer;
        const pointsAwarded = isCorrect ? question.points : 0;
        totalScore += pointsAwarded;
        return {
          questionId: ans.questionId,
          selectedAnswer: ans.selectedAnswer,
          isCorrect,
          pointsAwarded,
        };
      }
      return { ...ans, isCorrect: false, pointsAwarded: 0 };
    });

    const project = await Project.create({
      architect: req.user._id,
      title,
      pdf: req.file.path,
      description,
      answers: evaluatedAnswers,
      score: totalScore,
      status: "pending",
    });

    // Notify office members
    User.find({ role: "office" }).then((officeUsers) => {
      // Create db notifications and send emails in parallel, but don't await the whole block
      Promise.all(
        officeUsers.map(async (officeUser) => {
          const message = `A new project "${project.title}" has been submitted for review.`;
          
          await Notification.create({
            user: officeUser._id,
            message,
            project: project._id,
          });

          if (officeUser.email) {
             sendEmail(officeUser.email, "New Project Submission Required", message).catch(err => console.error("Email failed", err));
          }
        })
      ).catch(error => console.error("Notification block failed", error));
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};
// Get projects created by the authenticated architect
export const getMyProjects = async (req, res) => {
  try {
    if (req.user.role !== "architect") {
      return res
        .status(403)
        .json({ message: "Only architects can view their projects" });
    }
    const projects = await Project.find({ architect: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};
// Get all projects (office only)
export const getAllProjects = async (req, res) => {
  try {
    if (req.user.role !== "office") {
      return res
        .status(403)
        .json({ message: "Only office users can view all projects" });
    }
    // Fetch all projects from the database, populating the architect's name and email, and sort them by creation date in descending order
    const projects = await Project.find()
      .populate("architect", "name email")
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};
// Update project status (office only)
export const updateProjectStatus = async (req, res) => {
  try {
    if (req.user.role !== "office") {
      return res
        .status(403)
        .json({ message: "Only office users can update project status" });
    }
    const { status } = req.body;
    // Validate the status value to ensure it's either "approved" or "rejected"
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const project = await Project.findById(req.params.id).populate("architect");
    // Check if the project exists in the database before updating its status
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.status = req.body.status;
    await project.save();

    let message = "";
    if (project.status === "approved") {
      message = `Your project "${project.title}" has been approved.`;
    } else if (project.status === "rejected") {
      message = `Your project "${project.title}" has been rejected.`;
    }

    // Hand off notification & emailing to the background
    Notification.create({
      user: project.architect,
      message: `Your project "${project.title}" was ${project.status}`,
      project: project._id,
    }).catch(err => console.error("Failed to create Architect notification", err));

    if (message) {
      sendEmail(
        project.architect.email,
        "Project Status Update",
        message,
      ).catch(err => console.error("Failed to email Architect status update", err));
    }

    res.json({ message: "status updated", project });
  } catch (error) {
    res.status(500).json({ message: "Error updating project status", error });
  }
};

// Get project status counts (office only)
export const getProjectStatus = async (req, res) => {
  try {
    if (req.user.role !== "office") {
      return res
        .status(403)
        .json({ message: "Only office users can view project status" });
    }

    const total = await Project.countDocuments();
    const pending = await Project.countDocuments({ status: "pending" });
    const approved = await Project.countDocuments({ status: "approved" });
    const rejected = await Project.countDocuments({ status: "rejected" });
    res.json({ total, pending, approved, rejected });
  } catch (error) {
    res.status(500).json({ message: "Error fetching project status", error });
  }
};
