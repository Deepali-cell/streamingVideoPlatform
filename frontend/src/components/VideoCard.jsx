import React from "react";
import { Play, Edit, Trash2 } from "lucide-react";

const VideoCard = ({ video, onEdit, onDelete, onOpen }) => {
  return (
    <div
      onClick={() => onOpen(video)}
      className="group cursor-pointer relative rounded-3xl overflow-hidden
                 bg-white/5 backdrop-blur-xl border border-white/10
                 hover:border-lime-400/40 hover:shadow-[0_0_40px_-10px_rgba(163,230,53,0.4)]
                 transition-all duration-500"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video flex items-center justify-center">
        <span className="text-8xl font-black text-lime-400/15 select-none">
          {video.title?.charAt(0).toUpperCase()}
        </span>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="p-5 rounded-full bg-lime-400 text-black shadow-2xl scale-90 group-hover:scale-100 transition">
            <Play size={34} />
          </div>
        </div>

        <span className="absolute top-4 left-4 text-[11px] px-3 py-1 rounded-full bg-black/50 text-lime-300 backdrop-blur">
          {video.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-white font-semibold leading-tight line-clamp-1">
          {video.title}
        </h3>

        <p className="text-xs text-neutral-400 line-clamp-2">
          {video.description}
        </p>

        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="truncate">{video.owner?.name}</span>
          <span className="px-2 py-0.5 rounded-md bg-white/5">
            {video.owner?.videosCount} videos
          </span>
        </div>

        {/* Action buttons */}
        {onEdit && onDelete && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(video);
              }}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/40"
            >
              <Edit size={14} /> Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(video);
              }}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/40"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
