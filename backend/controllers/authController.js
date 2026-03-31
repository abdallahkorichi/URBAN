import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
// Register architect user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if a user with the provided email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Generate a salt and hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user in the database with the provided name, email, hashed password, and default role of "architect"
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "architect",
    });
    
    // Dispatch Welcome Email asynchronously so it doesnt block the response
    sendEmail(
      user.email,
      "Welcome to KOUTHBAN Platform",
      `Hello ${user.name},\n\nYour architect account has been successfully created. Welcome to the KOUTHBAN platform! You can now submit your projects for review.\n\nBest,\nKOUTHBAN Team`
    ).catch(err => console.error("Welcome email failed to send", err));

    // Respond with the user's details and a JWT token upon successful registration
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      
      // Dispatch explicit login notification asynchronously
      sendEmail(
        user.email,
        "New Login to KOUTHBAN",
        `Hello ${user.name},\n\nA new login was detected on your KOUTHBAN account. If this was you, you can safely ignore this email.\n\nBest,\nKOUTHBAN Security`
      ).catch(err => console.error("Login alert email failed to send", err));

      res.json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
