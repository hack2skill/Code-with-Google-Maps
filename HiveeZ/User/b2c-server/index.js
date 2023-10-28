const express = require("express");
const userRoutes = require("./routes/user.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const alertRoutes = require('./routes/alert.routes')
const cors = require("cors");
const dbConnect = require("./config/dbconnect");

require("dotenv").config();

const { initializeApp, applicationDefault } = require("firebase-admin/app");

process.env.GOOGLE_APPLICATION_CREDENTIALS;

initializeApp({
  credential: applicationDefault(),
  projectId: "notification-demo-e9fb0",
});

const app = express();
app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Welcome to Push Notification Server");
});

app.use("/user", userRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/alert", alertRoutes)

const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
