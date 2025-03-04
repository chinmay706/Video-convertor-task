import { exec } from "child_process";
import path from "path";
import fs from "fs";

// Store processing statuses
const processingStatus = {};

// Ensure required directories exist
const directories = ["uploads", "output"];
directories.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Upload Video Controller
export const uploadVideo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "Upload successful", filename: req.file.filename });
};

// Process Video Controller (1.5x speed)
export const processVideo = (req, res) => {
  const { filename } = req.body;
  if (!filename) {
    return res.status(400).json({ error: "Filename is required" });
  }

  const inputPath = path.join("uploads", filename);
  const outputFilename = `processed-${filename}`;
  const outputPath = path.join("output", outputFilename);

  if (!fs.existsSync(inputPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  processingStatus[filename] = "processing";

  const command = `ffmpeg -i "${inputPath}" -filter:v "setpts=0.6667*PTS" -af "atempo=1.5" "${outputPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("FFmpeg error:", stderr);
      processingStatus[filename] = "failed";
      return res.status(500).json({ error: "Processing failed", details: stderr });
    }
    console.log("FFmpeg output:", stdout);
    processingStatus[filename] = "completed";
    res.json({ message: "Processing complete", outputFilename });
  });
};

// Check Processing Status Controller
export const getStatus = (req, res) => {
  const { filename } = req.params;
  res.json({ status: processingStatus[filename] || "not found" });
};

// Download Processed Video Controller

export const downloadVideo = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join("output", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath);
};
