import mongoose from "mongoose";
// Define the User schema with fields for name, email, password, and role
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["architect", "office"],// Allowed roles are "architect" and "office"
      default: "architect",// Default role is set to "architect"
    },
    profilePic: {
      type: String,
      default: "",// Store URL to profile picture 
    }
  },
  { timestamps: true },// Automatically add createdAt and updatedAt timestamps
);

export default mongoose.model("User", userSchema);
