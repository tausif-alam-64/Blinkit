import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js"
import uploadRouter from "./routes/upload.router.js";
import subCategoryRouter from "./routes/subCategory.route.js";

dotenv.config();

const PORT =process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    credentials: true,
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
app.use('/api/category',categoryRouter);
app.use("/api/file",uploadRouter)
app.use("/api/subcategory", subCategoryRouter)


connectDB().then(() => {
  app.listen(PORT, () => {console.log("server is running on port", PORT)})
});

