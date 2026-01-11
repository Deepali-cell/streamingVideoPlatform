import StreamVideo from "../models/streamVideoModel.js";
import User from "../models/userModel.js";

const allUsers = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }
    const checkUser = await User.findById(userId);
    if (checkUser.role !== "admin") {
      return res
        .status(402)
        .json({ success: false, message: "Only admin Can Access this" });
    }
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users Found successfully",
      users,
    });
  } catch (error) {
    console.error("Fetch users error:", error);

    return res.status(500).json({
      success: false,
      message: "Error while fetching all users",
    });
  }
};
const allStreamingVideos = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }
    const checkUser = await User.findById(userId);
    if (checkUser.role !== "admin") {
      return res
        .status(402)
        .json({ success: false, message: "Only admin Can Access this" });
    }
    const streamVideos = await StreamVideo.find()
      .populate("owner", "name videosCount")
      .sort({ createdAt: -1 });

    if (!streamVideos.length) {
      return res.status(404).json({
        success: false,
        message: "No streaming videos found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Streaming videos fetched successfully",
      streamVideos,
    });
  } catch (error) {
    console.error("Fetch public videos error:", error);

    return res.status(500).json({
      success: false,
      message: "Error while fetching  streaming videos",
    });
  }
};

export { allUsers, allStreamingVideos };
