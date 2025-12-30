import express from "express";
import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    await sendEmail({ name, email, message });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("CONTACT ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
