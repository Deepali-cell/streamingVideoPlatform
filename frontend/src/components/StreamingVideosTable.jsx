import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StreamingVideosTable = ({ videos }) => {
  if (!videos.length)
    return <p className="text-neutral-400">No videos found</p>;

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lime-500 underline">Title</TableHead>
            <TableHead className="text-lime-500 underline">Owner</TableHead>
            <TableHead className="text-lime-500 underline">Category</TableHead>
            <TableHead className="text-lime-500 underline">
              Visibility
            </TableHead>
            <TableHead className="text-lime-500 underline">Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {videos.map((video) => (
            <TableRow key={video._id}>
              <TableCell className="font-medium">{video.title}</TableCell>

              <TableCell>{video.owner?.name || "Unknown"}</TableCell>

              <TableCell>{video.category || "-"}</TableCell>

              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs
                  ${
                    video.visibility === "public"
                      ? "bg-lime-500/10 text-blue-500"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {video.visibility}
                </span>
              </TableCell>

              <TableCell className="text-xs text-neutral-400">
                {new Date(video.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StreamingVideosTable;
