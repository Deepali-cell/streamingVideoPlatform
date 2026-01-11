import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/StateContext";

const UploadP = () => {
  const { backend_url, user, fetchStreamingVideos } = useAppContext();
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    visibility: "public",
    category: "",
    tags: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUploadData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Upload video (Dialog)
  const handleVideoUpload = async () => {
    if (!videoFile) return toast("Please select a video");
    if (user.role !== "editor") {
      return toast("Your are not eligible to upload the video.");
    }

    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", videoFile);

      const { data } = await axios.post(`${backend_url}/api/upload`, formData, {
        withCredentials: true,
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      if (data.success) {
        setUploadData((prev) => ({
          ...prev,
          videoUrl: data.url,
        }));

        toast("Video uploaded successfully 🎉");
        setOpen(false); // ✅ close dialog
      }
    } catch (err) {
      toast("Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Submit metadata
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.role !== "editor") {
      return toast("Your are not eligible to upload the video.");
    }
    if (!uploadData.videoUrl) return toast("Please upload video first");

    try {
      const { data } = await axios.post(
        `${backend_url}/api/streaming/streamvideo`,
        {
          ...uploadData,
          tags: uploadData.tags.split(","),
        },
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/");
        fetchStreamingVideos();
        toast("Video published successfully 🚀");
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log("error :", error);
      toast(error.response.data.message || "Error while saving video data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white ">
      <div className="w-full max-w-md p-8 rounded-2xl border mb-20">
        <h1 className="text-3xl font-bold text-center mb-6">
          Upload <span className="text-lime-500">StreamVideo</span>
        </h1>

        {/* Upload Video Button */}
        {!uploadData.videoUrl && (
          <Button
            type="button"
            className="w-full mb-4 bg-lime-500 text-black"
            onClick={() => setOpen(true)}
          >
            Upload Video
          </Button>
        )}

        {/* Video URL Preview */}
        {uploadData.videoUrl && (
          <p className="text-sm text-lime-400 break-all mb-4">
            ✅ Video Uploaded:
            <br />
            {uploadData.videoUrl}
          </p>
        )}

        {/* Metadata Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Title"
            value={uploadData.title}
            onChange={handleChange}
          />

          <Input
            name="description"
            placeholder="Description"
            value={uploadData.description}
            onChange={handleChange}
          />

          <Input
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={uploadData.thumbnail}
            onChange={handleChange}
          />

          <Input
            name="tags"
            placeholder="tags (comma separated)"
            value={uploadData.tags}
            onChange={handleChange}
          />

          <select
            name="category"
            value={uploadData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700"
          >
            <option value="">Select Category</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="gaming">Gaming</option>
            <option value="technology">Technology</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
          </select>

          <select
            name="visibility"
            value={uploadData.visibility}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <Button type="submit" className="w-full bg-lime-500 text-black">
            Publish Video
          </Button>
        </form>
      </div>

      {/* 🎥 Upload Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-neutral-900 text-white">
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
          </DialogHeader>

          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-center">{progress}%</p>
            </div>
          )}

          <Button
            onClick={handleVideoUpload}
            disabled={uploading}
            className="bg-lime-500 text-black"
          >
            {uploading ? "Uploading..." : "Start Upload"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadP;
