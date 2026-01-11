import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "lucide-react";

const VideoPlayerDialog = ({ open, setOpen, video }) => {
  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-5xl p-0 overflow-hidden
        bg-black/80 backdrop-blur-2xl border border-white/10"
      >
        {/* Video */}
        <div className="relative">
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full aspect-video object-cover"
          />

          {/* Floating title */}
          <div
            className="absolute bottom-4 left-4 right-4
            bg-black/60 backdrop-blur-md rounded-xl p-4"
          >
            <h2 className="text-white font-semibold text-lg">{video.title}</h2>
            <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
              {video.description}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="p-6 space-y-4 text-white">
          {/* Editor */}
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <User size={16} />
            <span>
              {video.owner?.name} · {video.owner?.videosCount} videos
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {video.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full
                bg-lime-400/10 text-lime-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerDialog;
