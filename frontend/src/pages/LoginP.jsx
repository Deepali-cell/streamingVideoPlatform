import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAppContext } from "@/context/stateContext";
import axios from "axios";

const LoginP = () => {
  const { backend_url, navigate, setisUser } = useAppContext();

  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
    roleCode: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setuserData((prev) => ({
      ...prev,
      [name]: value,
      roleCode: name === "role" ? "" : prev.roleCode,
    }));

    setOpen(name === "role" && (value === "admin" || value === "editor"));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (
      (userData.role === "admin" || userData.role === "editor") &&
      !userData.roleCode
    ) {
      toast("Role code required");
      return;
    }
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/login`,
        userData,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        navigate("/");
        setisUser(true);
        localStorage.setItem("videoplatformuser", "true");
        toast(data.message || "You are login Successfully");
      } else {
        toast(data.message || "some error while login");
      }
    } catch (error) {
      console.log("Frontend error while login :", error.message);
    } finally {
      setOpen(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <div className="w-full max-w-md  p-8 rounded-2xl border ">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login to <span className="text-lime-500">StreamHub</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="name"
            placeholder="Username"
            value={userData.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700"
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>

          {userData.role === "viewer" && (
            <Button className="w-full bg-lime-500 text-black hover:bg-lime-400">
              Login
            </Button>
          )}
        </form>
      </div>

      {/* 🔐 Role Code Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-neutral-900 text-white border-neutral-800">
          <DialogHeader>
            <DialogTitle>Enter {userData.role} Access Code</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Role access code"
            value={userData.roleCode}
            onChange={(e) =>
              setuserData({ ...userData, roleCode: e.target.value })
            }
          />

          <Button
            onClick={handleSubmit}
            className="bg-lime-500 text-black hover:bg-lime-400"
          >
            Verify & Login
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginP;
