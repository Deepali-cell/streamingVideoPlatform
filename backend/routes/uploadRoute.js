import express from "express";
import upload from "../lib/upload.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  (req, res) => {
    res.json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename,
    });
  }
);

export default uploadRouter;
