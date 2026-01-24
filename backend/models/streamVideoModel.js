import mongoose from "mongoose";

const streamVideoSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    category: {
      type: String,
      index: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true },
);

streamVideoSchema.index({ visibility: 1, createdAt: -1 });

/* 🔍 Full text search */
streamVideoSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

const StreamVideo = mongoose.model("StreamVideo", streamVideoSchema);
export default StreamVideo;
