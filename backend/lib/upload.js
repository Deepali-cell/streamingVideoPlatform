import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../service/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "video_streaming_platform/videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("video")) {
      cb(new Error("Only video files are allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
