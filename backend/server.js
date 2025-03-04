import express from "express";
import multer from "multer";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure necessary directories exist
const directories = ["uploads", "output"];
directories.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Set up multer storage with file size limit (50MB)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Store processing status
const processingStatus = {};

// Upload endpoint
app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ message: "Upload successful", filename: req.file.filename });
});

// Process video with dynamic speed
app.post("/process", (req, res) => {
  const { filename, speed } = req.body;

  if (!filename || !speed) return res.status(400).json({ error: "Filename and speed are required" });
  if (speed < 1 || speed > 2) return res.status(400).json({ error: "Speed must be between 1x and 2x" });

  const inputPath = path.join("uploads", filename);
  const outputFilename = `processed-${speed}x-${filename}`;
  const outputPath = path.join("output", outputFilename);

  if (!fs.existsSync(inputPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  processingStatus[filename] = "processing";

  const videoSpeed = (1 / speed).toFixed(4);
  const audioSpeed = speed.toFixed(4);

  const command = `ffmpeg -i "${inputPath}" -filter:v "setpts=${videoSpeed}*PTS" -af "atempo=${audioSpeed}" "${outputPath}"`;

  exec(command, (error) => {
    if (error) {
      processingStatus[filename] = "failed";
      return res.status(500).json({ error: "Processing failed" });
    }
    processingStatus[filename] = "completed";
    res.json({ message: "Processing complete", outputFilename });
  });
});

// Check processing status
app.get("/status/:filename", (req, res) => {
  const { filename } = req.params;
  res.json({ status: processingStatus[filename] || "not found" });
});

// Download processed video
app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join("output", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
