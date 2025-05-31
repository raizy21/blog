import app from "./app.js";
import { connectDB } from "./util/database.js";

const PORT = process.env.PORT || 3000;

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
