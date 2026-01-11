import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [allUsers, setallUsers] = useState([]);
  const [allstreamingVideos, setallstreamingVideos] = useState([]);

  const fetchallstreamingVideos = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/admin/allstreamingvideos`,
        { withCredentials: true }
      );

      if (data.success) {
        setallstreamingVideos(data.streamVideos);
      }
    } catch (error) {
      console.log(
        "frontend error while fetching public videos :",
        error.response.data.message
      );
    }
  };
  const fetchallUsers = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/admin/allusers`, {
        withCredentials: true,
      });
      if (data.success) {
        setallUsers(data.users);
      }
    } catch (error) {
      console.log(
        "error while fetching the users : ",
        error.response.data.message
      );
    }
  };
  useEffect(() => {
    fetchallUsers();
  }, []);

  useEffect(() => {
    fetchallstreamingVideos();
  }, []);

  const value = {
    allUsers,
    setallUsers,
    allstreamingVideos,
    setallstreamingVideos,
    fetchallstreamingVideos,
    fetchallUsers,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
export default AdminContextProvider;
