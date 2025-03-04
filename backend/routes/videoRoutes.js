import express from "express";
import { uploadVideo, processVideo, getStatus, downloadVideo } from "../controllers/videoController.js";
import upload from "../middleware/multerConfig.js";


const router = express.Router();

// Video upload route
router.post("/upload", upload.single("video"), uploadVideo);

// Video processing route
router.post("/process", processVideo);

// Get processing status
router.get("/status/:filename", getStatus);

// Download processed video
router.get("/download/:filename", downloadVideo);

export default router;
