import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// route
import authRouter from "./routes/auth.js";
import hotelRouter from "./routes/hotel.js";
// import roomRouter from "./routes/room.js";
// import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// middleware
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
// app.use("/api/room", roomRouter);
// app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Someting went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Connected to Backend!");
});
