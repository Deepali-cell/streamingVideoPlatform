import express from "express";
import {
  allPublicStreamVideos,
  deleteVideo,
  getMyStreamVideos,
  searchVideos,
  streamVideo,
  updateVideo,
} from "../controllers/streamVideoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const streamVideoRoute = express.Router();

streamVideoRoute.post("/streamvideo", authMiddleware, streamVideo);
streamVideoRoute.get("/getpublicstreamvideos", allPublicStreamVideos);
streamVideoRoute.get("/getmystreamvideos", authMiddleware, getMyStreamVideos);
streamVideoRoute.delete("/deletevideo/:videoId", authMiddleware, deleteVideo);
streamVideoRoute.put("/updatevideo/:videoId", authMiddleware, updateVideo);
streamVideoRoute.get("/searchvideo", searchVideos);

export default streamVideoRoute;
