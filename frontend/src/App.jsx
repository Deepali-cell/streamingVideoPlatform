import { Route, Routes } from "react-router-dom";
import HomeP from "./pages/HomeP";
import Navbar from "./components/Navbar";
import LoginP from "./pages/LoginP";
import UploadP from "./pages/UploadP";
import ProfileP from "./pages/ProfileP";
import EditP from "./pages/EditP";
// import ProtectedRoute from "./protected/ProtectedRoute";
import EditorProtectedRoute from "./protected/EditorProtectedRoute";
import PublicRoute from "./protected/PublicRoute";
import ProtectedRoute from "./protected/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<HomeP />} />

        {/* LOGIN BLOCK IF USER EXISTS */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginP />} />
        </Route>

        {/* AUTH USER */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfileP />} />
        </Route>

        {/* EDITOR ONLY */}
        <Route element={<EditorProtectedRoute />}>
          <Route path="/upload" element={<UploadP />} />
          <Route path="/edit/:videoId" element={<EditP />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
