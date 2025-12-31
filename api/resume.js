import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  const filePath = path.join(
    __dirname,
    "../public/MERN-STACK-RESUME.pdf"
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Resume not found");
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=MERN-STACK-RESUME.pdf"
  );

  fs.createReadStream(filePath).pipe(res);
}
