const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const responseTime = require("./middleware/responseTimeMiddleware");

const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const contentRoutes = require("./routes/contentRoutes");
const scanRoutes = require("./routes/scanRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(responseTime);

app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/public", publicRoutes);

module.exports = app;
