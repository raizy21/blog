import path from "path";
import { fileURLToPath } from "url";

import express from "express";

import { connectDB } from "./util/database.js";

// recreate __dirname
const __filename = fileURLToPath(import.meta.url); // get the current file name
const __dirname = path.dirname(__filename); // get the current directory name

const PORT = process.env.PORT || 3000;
const app = express();

// activate ejs view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // parse incoming request bodies
app.use(express.static("public")); // serve static files (e.g. CSS files)

//sanity check
app.get("/", (req, res) => {
  res.status(200).send("server is up and running");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`server running on port ${PORT} -> http://localhost:${PORT}/`)
    );
  } catch (err) {
    console.error("failed to start server:", err);
  }
};

startServer();
