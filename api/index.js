import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import contactRoutes from "../routes/contactRoutes.js";
import projectRoutes from "../routes/projectRoutes.js";

dotenv.config();

const app = express();

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Root route (fixes Cannot GET /)
app.get("/", (req, res) => {
  res.send("Portfolio Backend is running 🚀");
});

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

// Resume download
app.use("/resume", express.static(path.join(__dirname, "../public")));

// MongoDB (important: only connect once)
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Error:", err));
}

// ✅ Export app (NO app.listen)
export default app;
