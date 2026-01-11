import express from "express";
import "dotenv/config.js";
import uploadRouter from "./routes/uploadRoute.js";
import connectDb from "./service/connectDb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import streamVideoRoute from "./routes/streamVideoRoute.js";
import adminRoute from "./routes/adminRoute.js";

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("server is working");
});

app.use("/api", uploadRouter);
app.use("/api/user", userRoute);
app.use("/api/streaming", streamVideoRoute);
app.use("/api/admin", adminRoute);

app.listen(3000, () => {
  console.log("server is working");
});
