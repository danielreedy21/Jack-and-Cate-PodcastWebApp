'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
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


// grab the data for the latest episode
let latestID;
let latestTitle;
let latestDescription;
let latestAudioID;
let latestThumbnailID;
const episodeData = collection(db, "EpisodesData");
const latestQuery = query(episodeData, orderBy("Date", "desc"), limit(1));
const querySnapshot = await getDocs(latestQuery);
querySnapshot.forEach((doc) => {
  latestID = doc.id;
  console.log(latestID, " => ", JSON.stringify(doc.data(), undefined, 2));
  latestTitle = doc.data().Title;
  latestDescription = doc.data().Description;
  latestAudioID = doc.data().audioID;
  latestThumbnailID = doc.data().thumbnailID;
});

// use this data to update the DOM
document.getElementById("latestName").innerHTML = latestTitle;
document.getElementById("latestDescription").innerHTML = latestDescription;

// grab the latest episode thumbnail from firebase and add it to the DOM
const latestThumbnailPath = 'thumbnails/Episode Thumbnails/' + latestThumbnailID;
const thumbRef = ref(storage, latestThumbnailPath);
getDownloadURL(thumbRef)
  .then((url) => {
    const latestThumb = document.getElementById('latestThumb');
    latestThumb.src = url;
  });

// grab the latest episode audio from firebase and add it to the DOM
const latestAudioPath = 'audio/' + latestAudioID;
const latestAudioRef = ref(storage, latestAudioPath);
getDownloadURL(latestAudioRef)
  .then((url) => {
    console.log(url)
    const latestAudio = document.getElementById('latestAudio');
    latestAudio.src = url;
  });


