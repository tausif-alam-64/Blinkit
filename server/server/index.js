import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const PORT = 8000 || process.env.PORT;

const app = express();
app.use(
  cors({
    creddntials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get("/", (req, res) => {
    res.json({message: "Server is running"})
});

app.use('/api/user', userRouter);


connectDB().then(() => {
  app.listen(PORT, () => {console.log("server is running on port", PORT)})
});

