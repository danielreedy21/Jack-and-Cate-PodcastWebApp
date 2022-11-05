'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdLRTmqMHCgQ53C436xz0JLpLEA2S_gKk",
  authDomain: "finest-five-podcast.firebaseapp.com",
  projectId: "finest-five-podcast",
  storageBucket: "finest-five-podcast.appspot.com",
  messagingSenderId: "781980552264",
  appId: "1:781980552264:web:01a4c911a4148eb2f25c7d",
  measurementId: "G-DVFPMGBT2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);



//grab latest image url from firebase
// Get the download URL and add it to the thumbnail src attribute
const thumbRef = ref(storage, 'thumbnails/Forest_in_Japan.jpeg');
getDownloadURL(thumbRef)
    .then((url) => {
        const latestThumb = document.getElementById('latestThumb');
        latestThumb.src = url;
    })
