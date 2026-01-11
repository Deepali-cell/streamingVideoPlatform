import React, { useState } from "react";
import { Search } from "lucide-react";
import { useAppContext } from "@/context/StateContext";
import axios from "axios";
import { toast } from "sonner";

const SearchInput = () => {
  const { setpublicVideos, backend_url } = useAppContext();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${backend_url}/api/streaming/searchvideo/?q=${text}`
      );
      if (data.success) {
        setpublicVideos(data.videos);
      } else {
        toast(data.message);
      }
      setText("");
    } catch (error) {
      toast(error?.response?.data?.message || "Search error");
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <button type="submit">
        <Search size={18} className="text-neutral-400" />
      </button>

      <input
        type="text"
        placeholder="Search videos"
        className="bg-transparent outline-none px-3 w-full text-sm placeholder:text-neutral-400 text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
