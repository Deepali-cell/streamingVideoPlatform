import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/StateContext";
import VideoPlayerDialog from "@/components/VideoPlayerDialog";
import EditorTabs from "@/components/EditorTabs";
import AdminTabs from "@/components/AdminTabs";
import { useAdminContext } from "@/context/AdminContext";

const ProfileP = () => {
  const { user, editorStreamVideos, fetchEditorStreamingVideos } =
    useAppContext();
  const { allUsers, allstreamingVideos, fetchAdminData } = useAdminContext();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [open, setOpen] = useState(false);

  const openPlayer = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  useEffect(() => {
    if (user?.role === "editor") fetchEditorStreamingVideos();
  }, [user]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAdminData();
    }
  }, [user]);

  if (!user) return null;
  return (
    <div className="min-h-screen bg-neutral-950 px-10 py-8 text-white">
      <div
        className="mb-12 relative overflow-hidden rounded-3xl 
  bg-gradient-to-br from-neutral-900 via-neutral-900 to-lime-500/10
  border border-white/10 backdrop-blur-xl p-8"
      >
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-lime-500/20 rounded-full blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Left */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              {user.name}
            </h1>

            <p className="text-neutral-400 text-sm mt-1">{user.email}</p>

            {/* Role badge */}
            <div
              className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full
        bg-lime-500/10 text-lime-400 text-xs font-semibold uppercase tracking-wide"
            >
              {user.role}
            </div>
          </div>

          {/* Right stats */}
          <div className="flex gap-4">
            <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-white">
                {user.videosCount}
              </p>
              <p className="text-xs text-neutral-400 mt-1">Total Videos</p>
            </div>

            {user.role === "editor" && (
              <div className="px-6 py-4 rounded-2xl bg-lime-500/10 border border-lime-500/30 text-center">
                <p className="text-2xl font-bold text-lime-400">
                  {editorStreamVideos?.length || 0}
                </p>
                <p className="text-xs text-lime-300 mt-1">Uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NON-EDITOR */}
      {user.role === "viewer" && (
        <p className="text-neutral-500">
          You are a viewer. Upload access is only for editors.
        </p>
      )}

      {/* EDITOR DASHBOARD */}
      {user.role === "editor" && (
        <EditorTabs
          editorStreamVideos={editorStreamVideos}
          openPlayer={openPlayer}
        />
      )}

      {/* ADMIN DASHBOARD */}
      {user.role === "admin" && (
        <>
          <AdminTabs
            allUsers={allUsers}
            allstreamingVideos={allstreamingVideos}
          />
        </>
      )}
      {/* PLAYER */}
      <VideoPlayerDialog open={open} setOpen={setOpen} video={selectedVideo} />
    </div>
  );
};

export default ProfileP;
