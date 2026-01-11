import StreamVideo from "../models/streamVideoModel.js";
import User from "../models/userModel.js";

const streamVideo = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "editor") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to upload videos",
      });
    }

    const {
      title,
      description,
      videoUrl,
      thumbnail,
      visibility = "public",
      category,
      tags = [],
    } = req.body;

    if (!title || !videoUrl || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Title, videoUrl and thumbnail are required",
      });
    }

    //  Normalize tags
    const normalizedTags = Array.isArray(tags)
      ? tags.map((tag) => tag.toLowerCase().trim())
      : [];

    //  Create video
    const video = await StreamVideo.create({
      owner: userId,
      title: title.trim(),
      description: description?.trim() || "",
      videoUrl,
      thumbnail,
      visibility,
      category,
      tags: normalizedTags,
    });

    //  Increment videosCount
    await User.findByIdAndUpdate(userId, {
      $inc: { videosCount: 1 },
    });

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    console.error("streamVideo error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error while uploading video",
    });
  }
};

const allPublicStreamVideos = async (req, res) => {
  try {
    const streamVideos = await StreamVideo.find({ visibility: "public" })
      .populate("owner", "name videosCount")
      .sort({ createdAt: -1 });

    if (!streamVideos.length) {
      return res.status(404).json({
        success: false,
        message: "No public streaming videos found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Public streaming videos fetched successfully",
      streamVideos,
    });
  } catch (error) {
    console.error("Fetch public videos error:", error);

    return res.status(500).json({
      success: false,
      message: "Error while fetching public streaming videos",
    });
  }
};

const getMyStreamVideos = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (user.role !== "editor") {
      return res.status(403).json({
        success: false,
        message: "Only editors can access this resource",
      });
    }

    const myVideos = await StreamVideo.find({ owner: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      myVideos,
    });
  } catch (error) {
    console.error("getMyStreamVideos error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching editor videos",
    });
  }
};
const deleteVideo = async (req, res) => {
  try {
    const userId = req.userId;
    const { videoId } = req.params;

    if (!videoId) {
      return res
        .status(404)
        .json({ success: false, message: "videoId not found" });
    }

    const video = await StreamVideo.findById(videoId);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    // Check if the user owns the video
    if (video.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this video",
      });
    }

    // Delete video
    await StreamVideo.findByIdAndDelete(videoId);

    await User.findByIdAndUpdate(userId, { $inc: { videosCount: -1 } });

    return res
      .status(200)
      .json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error("deleteVideo error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the video.",
    });
  }
};
const updateVideo = async (req, res) => {
  try {
    const userId = req.userId;
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(404).json({
        success: false,
        message: "VideoId not found.",
      });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "editor") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update videos",
      });
    }

    const {
      title,
      description,
      thumbnail,
      visibility = "public",
      category,
      tags = [],
    } = req.body;

    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => t.toLowerCase().trim())
      : [];

    const updatedVideo = await StreamVideo.findByIdAndUpdate(
      videoId,
      {
        title,
        description,
        thumbnail,
        visibility,
        category,
        tags: normalizedTags,
      },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Video updated successfully",
      video: updatedVideo,
    });
  } catch (error) {
    console.error("update video error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const searchVideos = async (req, res) => {
  try {
    const { q } = req.query;

    let videos = [];

    if (!q || q.trim() === "") {
      videos = await StreamVideo.find({ visibility: "public" })
        .populate("owner", "name videosCount")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        message: "All public videos fetched",
        videos,
      });
    }

    videos = await StreamVideo.find(
      {
        $text: { $search: q },
        visibility: "public",
      },
      {
        score: { $meta: "textScore" },
      }
    ).sort({ score: { $meta: "textScore" } });

    if (!videos.length) {
      return res.status(404).json({
        success: false,
        message: "No videos found for this search",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Search results found",
      videos,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};

export {
  streamVideo,
  allPublicStreamVideos,
  getMyStreamVideos,
  deleteVideo,
  updateVideo,
};
