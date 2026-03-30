import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Standard Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage utilizing Cloudinary's auto-format and secure environments
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "urban-platform",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
    resource_type: "auto", // Automatically detects between Image and Raw (PDFs)
  },
});

// Create the Multer upload middleware utilizing Cloudinary
const upload = multer({ storage });
export default upload;
