import React from "react";
import VideoCard from "./VideoCard";

const VideoGrid = ({ videos, onEdit, onDelete, onOpen }) => {
  if (!videos?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          onEdit={onEdit}
          onDelete={onDelete}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
