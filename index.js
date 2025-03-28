require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
mongoose
  .connect(process.env.ONLINE_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

const corsOptions = {
  origin: "http://localhost:3000", // Adjust if frontend runs on a different port
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Allow the Authorization header
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());

const authRoute = require("./routes/authRoute");

const imagesSearch = require("./routes/imagesSearch");

const chatRoutes = require("./routes/chatRoute");

const translateRoute = require("./routes/translateRoute");

const presentationRoute = require("./routes/presentationRoute");

const navigateRoute = require("./routes/navigateRoute");

const getLevelRoute = require("./routes/levelRoute");

app.use("/auth", authRoute);

app.use("/imgsearch", imagesSearch);

app.use("/chat", chatRoutes);

app.use("/translate", translateRoute);

app.use("/presentationRoute", presentationRoute);

app.use("/navigate", navigateRoute);

app.use("/getlevel", getLevelRoute);

app.use(express.static(path.join(__dirname, "client", "build")));

const testRoute = require("./routes/testRoute");
app.use("/test", testRoute);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
