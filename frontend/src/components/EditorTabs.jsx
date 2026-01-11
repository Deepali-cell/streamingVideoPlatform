import { useAppContext } from "@/context/StateContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SkeletonCard from "./SkeletonCard";
import VideoGrid from "./VideoGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyState from "./EmptyState";

const EditorTabs = ({ editorStreamVideos, openPlayer }) => {
  const navigate = useNavigate();
  const {
    fetchEditorStreamingVideos,
    backend_url,
    fetchStreamingVideos,
    loadingEditorVideos,
  } = useAppContext();

  const publicVideos = editorStreamVideos?.filter(
    (v) => v.visibility === "public"
  );
  const privateVideos = editorStreamVideos?.filter(
    (v) => v.visibility === "private"
  );

  const handleEdit = (video) => {
    navigate(`/edit/${video._id}`);
  };

  const handleDelete = async (video) => {
    if (!confirm(`Are you sure to delete "${video.title}"?`)) return;

    try {
      const { data } = await axios.delete(
        `${backend_url}/api/streaming/deletevideo/${video._id}`,
        { withCredentials: true }
      );
      if (data.success) {
        toast("Video deleted successfully!");
        fetchEditorStreamingVideos();
        fetchStreamingVideos();
      } else {
        toast(data.message || "Cannot delete video");
      }
    } catch (err) {
      console.log(err);
      toast("Error deleting video");
    }
  };

  return (
    <>
      <Tabs defaultValue="public" className="w-full">
        <TabsList className="mb-6 bg-neutral-900 ">
          <TabsTrigger
            value="public"
            className="
      text-white
      data-[state=active]:bg-white
      data-[state=active]:text-black
    "
          >
            Public
          </TabsTrigger>
          <TabsTrigger
            value="private"
            className="
      text-white
      data-[state=active]:bg-white
      data-[state=active]:text-black
    "
          >
            Private
          </TabsTrigger>
        </TabsList>

        <TabsContent value="public">
          {loadingEditorVideos ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : publicVideos?.length === 0 ? (
            <EmptyState text="No public videos yet" />
          ) : (
            <VideoGrid
              videos={publicVideos}
              onOpen={openPlayer}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </TabsContent>
        <TabsContent value="private">
          {loadingEditorVideos ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : privateVideos?.length === 0 ? (
            <EmptyState text="No public videos yet" />
          ) : (
            <VideoGrid
              videos={privateVideos}
              onOpen={openPlayer}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default EditorTabs;
