require("dotenv").config();
const express = require("express");
const cors = require("cors");

const blogRoutes = require("./routes/blogs");
const aiRoutes = require("./routes/ai");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("AI Blog Automation API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
