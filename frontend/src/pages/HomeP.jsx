import { useAppContext } from "@/context/StateContext";
import { Radio } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";
import VideoGrid from "@/components/VideoGrid";
import VideoPlayerDialog from "@/components/VideoPlayerDialog";
import { useState } from "react";
import EmptyState from "@/components/EmptyState";

const HomeP = () => {
  const { publicVideos, loadingPublicVideos } = useAppContext();

  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openPlayer = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1a1a1a,_#000)] px-10 py-12">
      <div className="flex items-center gap-3 mb-10">
        <Radio className="text-lime-400" />
        <h1 className="text-3xl font-bold text-white">Live Streams</h1>
      </div>

      {loadingPublicVideos ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : publicVideos.length === 0 ? (
        <EmptyState text="No stream videos yet" />
      ) : (
        <VideoGrid videos={publicVideos} onOpen={openPlayer} />
      )}

      <VideoPlayerDialog open={open} setOpen={setOpen} video={selectedVideo} />
    </div>
  );
};

export default HomeP;
