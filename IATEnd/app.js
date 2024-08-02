import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import loginUser from "./routes/loginUser.js";
// import studentRoutes from "./routes/studentRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
import profileRoute from "./routes/profileRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', loginUser);
// app.use('/students', studentRoutes);
// app.use('/attendance', attendanceRoutes);
app.use('/', profileRoute);
app.use('/api/attendance', attendanceRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

export default app;
