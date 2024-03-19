import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import { testing } from "./controller/auth.controller";
import connectDb from "./config/dbConfig";
import userRouter from "./routes/user.router";

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
connectDb();
app.use(express.json());

app.get("/api/test", testing);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Port is successfully running on ", PORT);
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const errorMessage = err.message;
    const statusCode = err.statusCode || 500;
    res
      .status(statusCode)
      .json({ success: false, message: errorMessage, statusCode });
  }
);
