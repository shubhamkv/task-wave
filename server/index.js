const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { connectRedisServer } = require("./config/redisDB");
require("dotenv").config();

const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const focusSessionRouter = require("./routes/focusSessionRoutes");
const otpRouter = require("./routes/otpHandler");

const app = express();

connectDB();
connectRedisServer();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/focus-session", focusSessionRouter);
app.use("/api/otp", otpRouter);

app.listen(process.env.PORT);
