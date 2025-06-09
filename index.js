import express from "express";
import dbConnect from "./connection/db.js";
import userRouter from "./router/UserRouter.js";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware.js";
// import dotenv from "dotenv";
import notesRouter from "./router/NotesRouter.js";
import cors from "cors";

const app = express();
app.use(cors());
// dotenv.config();
app.use(express.json());
await dbConnect();
// route imported here
app.use("/auth", userRouter);
app.use("/note", notesRouter);
// app listen here

app.use(ErrorMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listen at http://localhost:${PORT}/`);
});
