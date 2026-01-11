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
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
