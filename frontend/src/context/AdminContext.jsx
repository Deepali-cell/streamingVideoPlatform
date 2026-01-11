import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [allUsers, setallUsers] = useState([]);
  const [allstreamingVideos, setallstreamingVideos] = useState([]);
  const [adminLoaded, setAdminLoaded] = useState(false); // ⭐ important

  const fetchAdminData = async () => {
    if (adminLoaded) return; // ⛔ prevent re-fetch

    try {
      const [usersRes, videosRes] = await Promise.all([
        axios.get(`${backend_url}/api/admin/allusers`, {
          withCredentials: true,
        }),
        axios.get(`${backend_url}/api/admin/allstreamingvideos`, {
          withCredentials: true,
        }),
      ]);

      if (usersRes.data.success) setallUsers(usersRes.data.users);
      if (videosRes.data.success)
        setallstreamingVideos(videosRes.data.streamVideos);

      setAdminLoaded(true);
    } catch (error) {
      console.log("Admin data fetch error");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        allUsers,
        allstreamingVideos,
        fetchAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
export default AdminContextProvider;
