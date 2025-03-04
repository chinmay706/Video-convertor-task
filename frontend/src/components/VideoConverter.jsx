import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  LinearProgress,
  Box,
  CssBaseline,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Brightness4, Brightness7, CloudUpload, Download } from "@mui/icons-material";

const VideoConverter = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [originalVideoURL, setOriginalVideoURL] = useState("");
  const [processedVideoURL, setProcessedVideoURL] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [speed, setSpeed] = useState(1);

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("File size must be under 50MB.");
        return;
      }
      setVideoFile(file);
      setOriginalVideoURL(URL.createObjectURL(file));
      setProcessedVideoURL("");
    }
  };

  const uploadAndProcessVideo = async () => {
    if (!videoFile) return alert("Please select a video first.");

    setIsProcessing(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("speed", speed);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      setProgress(50);
      const processResponse = await fetch("http://localhost:5000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: data.filename, speed }),
      });
      const processData = await processResponse.json();
      if (!processResponse.ok) throw new Error(processData.error || "Processing failed");

      setProgress(100);
      setIsProcessing(false);
      setProcessedVideoURL(`http://localhost:5000/download/${processData.outputFilename}`);
    } catch (error) {
      alert(error.message);
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Video Converter</Typography>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center" p={4} minHeight="100vh">
        <Paper elevation={3} sx={{ p: 4, width: "80%", textAlign: "center", borderRadius: "15px" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>Upload & Convert Video</Typography>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <input type="file" accept="video/*" onChange={handleFileChange} style={{ display: "none" }} id="file-upload" />
              <label htmlFor="file-upload">
                <Button variant="contained" component="span" startIcon={<CloudUpload />} color="primary">
                  Select Video
                </Button>
              </label>
            </Grid>
            <Grid item>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Speed</InputLabel>
                <Select value={speed} onChange={(e) => setSpeed(e.target.value)}>
                  <MenuItem value={1}>1x (Normal)</MenuItem>
                  <MenuItem value={1.25}>1.25x</MenuItem>
                  <MenuItem value={1.5}>1.5x</MenuItem>
                  <MenuItem value={1.75}>1.75x</MenuItem>
                  <MenuItem value={2}>2x (Faster)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={uploadAndProcessVideo} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Upload & Convert"}
              </Button>
            </Grid>
          </Grid>
          {originalVideoURL && (
            <Box mt={3}>
              <Typography variant="h6">Original Video</Typography>
              <video controls src={originalVideoURL} style={{ width: "100%", maxWidth: "600px", borderRadius: "15px" }} />
            </Box>
          )}
          {isProcessing && (
            <Box width="100%" mt={2}>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: "5px" }} />
              <Typography mt={1} align="center" color="primary">{progress}%</Typography>
            </Box>
          )}
          {/* Processed Video Section */}
{processedVideoURL && (
  <Box mt={4} textAlign="center">
    <Typography variant="h6">Processed Video</Typography>
    <video
      controls
      src={processedVideoURL}
      style={{
        width: "100%",
        maxWidth: "600px",
        borderRadius: "15px",
        border: "4px solid #ff4081",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
      }}
    />
    <Box mt={2} display="flex" justifyContent="center">
      <Button
        variant="outlined"
        color="secondary"
        href={processedVideoURL}
        download
        startIcon={<Download />}
      >
        Download Processed Video
      </Button>
    </Box>
  </Box>
)}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default VideoConverter;
