import { useAppContext } from "@/context/StateContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditP = () => {
  const { videoId } = useParams();
  const {
    backend_url,
    user,
    fetchStreamingVideos,
    fetchEditorStreamingVideos,
    editorStreamVideos,
  } = useAppContext();

  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const editVideo = editorStreamVideos.find((v) => v._id === videoId);

  const [updateData, setupdateData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    visibility: "public",
    category: "",
    tags: "",
  });

  useEffect(() => {
    if (editVideo) {
      setupdateData({
        title: editVideo.title || "",
        description: editVideo.description || "",
        thumbnail: editVideo.thumbnail || "",
        visibility: editVideo.visibility || "public",
        category: editVideo.category || "",
        tags: editVideo.tags?.join(", ") || "",
      });
    }
  }, [editVideo]);

  if (!editVideo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-400">
        Loading video data...
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "editor") {
      return toast("You are not allowed to edit this video.");
    }

    try {
      setSaving(true);

      const { data } = await axios.put(
        `${backend_url}/api/streaming/updatevideo/${videoId}`,
        {
          ...updateData,
          tags: updateData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast("Video updated successfully ✅");
        fetchStreamingVideos();
        fetchEditorStreamingVideos();
        navigate("/profile");
      } else {
        toast(data.message);
      }
    } catch (error) {
      toast(error?.response?.data?.message || "Error updating video");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <div className="w-full max-w-md p-8 rounded-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Update <span className="text-lime-500">Stream Video</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            value={updateData.title}
            onChange={handleChange}
          />
          <Input
            name="description"
            value={updateData.description}
            onChange={handleChange}
          />
          <Input
            name="thumbnail"
            value={updateData.thumbnail}
            onChange={handleChange}
          />
          <Input
            name="tags"
            placeholder="react, node, js"
            value={updateData.tags}
            onChange={handleChange}
          />

          <select
            name="category"
            value={updateData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 border"
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
            value={updateData.visibility}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 border"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-lime-500 text-black"
          >
            {saving ? "Saving..." : "Update Video"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditP;
