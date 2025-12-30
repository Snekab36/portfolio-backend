import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: String,
  live: String,
  github: String,
  duration: String,
});

export default mongoose.model("Project", projectSchema);
