import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
// load environment variables

app.use(cookieParser());
app.use(express.json());
// for the url data
app.use(express.urlencoded({ extended: true }));

export { app }

import taskRouter from "./routes/task.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/task", taskRouter)
