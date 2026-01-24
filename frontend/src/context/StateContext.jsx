import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState();
  const [isUser, setisUser] = useState(
    localStorage.getItem("videoplatformuser") === "true",
  );

  const [publicVideos, setpublicVideos] = useState([]);
  const [editorStreamVideos, seteditorStreamVideos] = useState([]);
  const [loadingPublicVideos, setLoadingPublicVideos] = useState(false);
  const [loadingEditorVideos, setLoadingEditorVideos] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setAuthLoading(true);
      const { data } = await axios.get(`${backend_url}/api/user/getuser`, {
        withCredentials: true,
      });

      if (data.success) {
        setUser(data.userData);
        setisUser(true);
        localStorage.setItem("videoplatformuser", "true");
      } else {
        setUser(null);
        setisUser(false);
        localStorage.removeItem("videoplatformuser");
      }
    } catch (error) {
      setUser(null);
      setisUser(false);
      localStorage.removeItem("videoplatformuser");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      if (data.success) {
        setUser(null);
        setisUser(false);
        localStorage.removeItem("videoplatformuser");
        toast(data.message || "you logout successfull");
      } else {
        toast(data.message || "some issue while logout");
      }
    } catch (error) {
      console.log("frontend error while logout :", error.message);
      toast("user is not properly logout.");
    }
  };
  const fetchStreamingVideos = async () => {
    if (publicVideos.length > 0) return; // 🔥 cache guard

    try {
      setLoadingPublicVideos(true);
      const { data } = await axios.get(
        `${backend_url}/api/streaming/getpublicstreamvideos`,
      );

      if (data.success) {
        setpublicVideos(data.streamVideos);
      }
    } finally {
      setLoadingPublicVideos(false);
    }
  };

  const fetchEditorStreamingVideos = async () => {
    try {
      setLoadingEditorVideos(true);

      const { data } = await axios.get(
        `${backend_url}/api/streaming/getmystreamvideos`,
        { withCredentials: true },
      );

      if (data.success) {
        seteditorStreamVideos(data.myVideos);
      }
    } catch (error) {
      console.log("frontend error while fetching editor videos");
    } finally {
      setLoadingEditorVideos(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    backend_url,
    navigate,
    user,
    setUser,
    fetchUser,
    logout,
    isUser,
    setisUser,
    fetchStreamingVideos,
    publicVideos,
    setpublicVideos,
    editorStreamVideos,
    seteditorStreamVideos,
    fetchEditorStreamingVideos,
    loadingEditorVideos,
    loadingPublicVideos,
    setLoadingEditorVideos,
    setLoadingPublicVideos,
    authLoading,
    setAuthLoading,
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(StateContext);
};

export default StateContextProvider;
