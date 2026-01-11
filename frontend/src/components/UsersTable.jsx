import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UsersTable = ({ users }) => {
  if (!users.length) return <p className="text-neutral-400">No users found</p>;

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lime-500 underline">Name</TableHead>
            <TableHead className="text-lime-500 underline">Email</TableHead>
            <TableHead className="text-lime-500 underline">Role</TableHead>
            <TableHead className="text-lime-500 underline">Videos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.name}</TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs
                  ${
                    user.role === "editor"
                      ? "bg-lime-500/10 text-red-500"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>

              <TableCell>{user.videosCount || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
