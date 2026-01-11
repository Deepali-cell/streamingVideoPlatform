import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  allStreamingVideos,
  allUsers,
} from "../controllers/adminController.js";

const adminRoute = express.Router();

adminRoute.get("/allusers", authMiddleware, allUsers);
adminRoute.get("/allstreamingvideos", authMiddleware, allStreamingVideos);

export default adminRoute;
