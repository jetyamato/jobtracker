require("dotenv").config();

const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.API_PORT;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/jobs", jobRoutes);
app.use("/auth", authRoutes);

// API check
app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
