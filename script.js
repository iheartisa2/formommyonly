// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_-URaV17-V5SilRt19lX_WkvSy-BANrg",
  authDomain: "for-mommy.firebaseapp.com",
  projectId: "for-mommy",
  storageBucket: "for-mommy.appspot.com",
  messagingSenderId: "930051072385",
  appId: "1:930051072385:web:ee49fac455f1785fad0880",
  measurementId: "G-F8CY04GZM6"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Realtime Database
const database = getDatabase(app);
const videoRef = ref(database, 'video');

// Function to sync video playback state
const syncVideoState = (videoState) => {
  set(videoRef, videoState);
};

// Get references to HTML elements
const videoLinkInput = document.getElementById("video-link");
const videoIframe = document.getElementById("video");
const syncVideoButton = document.getElementById("sync-video-button");

// Function to set the video
const setVideo = () => {
  const videoUrl = videoLinkInput.value;
  // Basic validation - add more robust validation later
  if (videoUrl.includes("youtube.com")) {
    videoIframe.src = videoUrl;
  } else {
    alert("Please enter a valid YouTube URL.");
  }
};

// Function to sync the video state
const syncVideo = () => {
  // ...
};

// Listen for video playback state changes
videoIframe.addEventListener("timeupdate", () => {
  // Update the video state in Firebase
  const videoState = {
    currentTime: videoIframe.currentTime,
    isPlaying: !videoIframe.paused,
    volume: videoIframe.volume
  };
  syncVideoState(videoState);
});

// Initial video state
let initialVideoState = {
  currentTime: 0,
  isPlaying: false,
  volume: 0.8
};
syncVideoState(initialVideoState);

// Listen for changes in the video state from the database
onValue(videoRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    // Update the video player based on the data
    videoIframe.currentTime = data.currentTime;
    videoIframe.paused = !data.isPlaying;
    videoIframe.volume = data.volume;
  }
});

// Event listeners for buttons
setVideoButton.addEventListener("click", setVideo);
syncVideoButton.addEventListener("click", syncVideo);
