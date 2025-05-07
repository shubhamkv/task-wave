const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { connectRedisServer } = require("./config/redisDB");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = require("./config/swaggerOptions");
require("dotenv").config();

const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const focusSessionRouter = require("./routes/focusSessionRoutes");
const otpRouter = require("./routes/otpHandler");

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

connectDB();
connectRedisServer();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/focus-session", focusSessionRouter);
app.use("/api/otp", otpRouter);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT);
