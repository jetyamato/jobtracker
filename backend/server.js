require("dotenv").config();

const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.API_PORT;

// middleware
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

// routes
app.use("/jobs", jobRoutes);
app.use("/auth", authRoutes);

// API check
app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

app.listen(port, () => {
  console.log("Server running");
});
