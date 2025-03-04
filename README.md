# Video Converter Task

## 📌 Description
This project is a **video conversion tool** that allows users to **upload, process, and download videos** in different formats.  
It provides a simple and user-friendly interface for converting videos efficiently.

## 🚀 Features
- 🎥 Upload videos for processing  
- 🔄 Convert videos to different formats  (1x,1.25x,1.5x,1.75x,2x)
- 📥 Download processed videos  
- 🎨 User-friendly UI  (Light mode, Dark mode)

## 📸 Screenshots
![page-1](https://i.postimg.cc/V6tGSDL1/page-1.jpg)  
![page-2](https://i.postimg.cc/7hyBS0fz/page-2.jpg)  
![page-3](https://i.postimg.cc/PJzSyJwR/page-3.jpg)  

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript, Material UI  
- **Backend**: Node.js with Express.js  
- **Video Processing**: FFmpeg  

## 🚀 Setup Instructions for Video Converter App

1-Clone the repository
```
git clone https://github.com/chinmay706/Video-convertor-task.git
cd Video-convertor-task

```

2-Install dependencies

```
npm install

```
3-Install FFmpeg (if not already installed)

- **Linux**: sudo apt install ffmpeg
- **macOS**: brew install ffmpeg
- **Windows**: choco install ffmpeg (via Chocolatey)

4-Start the server
```
node server.js

```
5-Start the frontend
```
npm start

```
## 🎯 Usage

1. **Upload a Video File**  
   - Click on the "Upload" button and select a video file from your device.  

2. **Select the Desired Output Format**  
   - Choose the format you want to convert the video into (e.g., MP4, AVI, MKV, etc.).  

3. **Click "Convert" to Process the Video**  
   - The app will process the video using FFmpeg and convert it to the selected format.  

4. **Download the Converted Video**  
   - Once the conversion is complete, click the "Download" button to save the processed video.  

