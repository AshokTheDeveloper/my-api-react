// External modules or libraries
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
dotEnv.config();

// Local modules
const initializeDBAndServer = require("./utils/dbAndServerUtils");
const userRoutes = require("./routes/userRoutes");

// middleware
const app = express();

// Parsing urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// routes
app.use("/users", userRoutes);

// Server
const PORT = process.env.PORT || 3002;
initializeDBAndServer(app, PORT);
