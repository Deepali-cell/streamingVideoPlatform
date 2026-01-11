import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTable from "./UsersTable";
import StreamingVideosTable from "./StreamingVideosTable";

const AdminTabs = ({ allUsers = [], allstreamingVideos = [] }) => {
  const viewers = allUsers.filter((u) => u.role === "viewer");
  const editors = allUsers.filter((u) => u.role === "editor");

  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="mb-6 bg-neutral-900 border border-white/10">
        <TabsTrigger
          value="users"
          className="
      text-white
      data-[state=active]:bg-white
      data-[state=active]:text-black
    "
        >
          Viewers
        </TabsTrigger>
        <TabsTrigger
          value="editors"
          className="
      text-white
      data-[state=active]:bg-white
      data-[state=active]:text-black
    "
        >
          Editors
        </TabsTrigger>
        <TabsTrigger
          value="streamingvideos"
          className="
      text-white
      data-[state=active]:bg-white
      data-[state=active]:text-black
    "
        >
          Streaming Videos
        </TabsTrigger>
      </TabsList>

      {/* VIEWERS */}
      <TabsContent value="users">
        <UsersTable users={viewers} />
      </TabsContent>

      {/* EDITORS */}
      <TabsContent value="editors">
        <UsersTable users={editors} />
      </TabsContent>

      {/* STREAMING VIDEOS */}
      <TabsContent value="streamingvideos">
        <StreamingVideosTable videos={allstreamingVideos} />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
