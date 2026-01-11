import express from "express";
import { getUser, login, logout } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.get("/getuser", authMiddleware, getUser);
userRoute.post("/logout", logout);

export default userRoute;
