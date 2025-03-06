# Video Converter Task

## 📌 Description
This project is a **video conversion tool** that allows users to **upload, process, and download videos** in different formats.  
It provides a simple and user-friendly interface for converting videos efficiently.

## 🚀 Features
- 🎥 Upload videos for processing  
- 🔄 Convert videos to different formats (1x,1.25x,1.5x,1.75x,2x)  
- 📥 Download processed videos  
- 🎨 User-friendly UI (Light mode, Dark mode)  

## 📸 Screenshots
![page-1](https://i.postimg.cc/V6tGSDL1/page-1.jpg)  
![page-2](https://i.postimg.cc/7hyBS0fz/page-2.jpg)  
![page-3](https://i.postimg.cc/PJzSyJwR/page-3.jpg)  

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript, Material UI  
- **Backend**: Node.js with Express.js  
- **Video Processing**: FFmpeg  

## 🚀 Setup Instructions for Video Converter App

### 1️⃣ Clone the repository
```sh
git clone https://github.com/chinmay706/Video-convertor-task.git
cd Video-convertor-task
```

### 2️⃣ Install dependencies
Run the following command to install all required dependencies:
```sh
npm install
```

### 3️⃣ Install FFmpeg (if not already installed)
FFmpeg is required for video processing. Install it based on your OS:
- **Linux**: 
  ```sh
  sudo apt install ffmpeg
  ```
- **macOS**:
  ```sh
  brew install ffmpeg
  ```
- **Windows** (Using Chocolatey):
  ```sh
  choco install ffmpeg
  ```

### 4️⃣ Configure environment variables
Create a `.env` file in the root directory and add necessary configurations:
```
PORT=5000
FFMPEG_PATH=/path/to/ffmpeg (if required for custom setup)
```

### 5️⃣ Start the backend server
Run the following command to start the server:
```sh
node server.js
```

### 6️⃣ Start the frontend
Run the following command to launch the frontend:
```sh
npm start
```

## 🎯 Usage

1️⃣ **Upload a Video File**  
   - Click on the "Upload" button and select a video file from your device.  

2️⃣ **Select the Desired Output Format**  
   - Choose the format you want to convert the video into (e.g., MP4, AVI, MKV, etc.).  

3️⃣ **Download the Processed Video**  
   - After conversion, download the video using the provided download button.  


---
Made with ❤️ by Chinmay Oli
