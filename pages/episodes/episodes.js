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

// Grab snapshot of all the episode data
const episodeData = collection(db, "EpisodesData");
const latestQuery = query(episodeData, orderBy("Date", "desc"));
const querySnapshot = await getDocs(latestQuery);

// Create a new episode card for each of the episodes
querySnapshot.forEach((doc) => {
  const latestID = doc.id;
  console.log(latestID, " => ", JSON.stringify(doc.data(), undefined, 2));
  const latestTitle = doc.data().Title;
  const latestDescription = doc.data().Description;
  const latestAudioID = doc.data().audioID;
  const latestThumbnailID = doc.data().thumbnailID;

  // ADDING IT TO THE DOM
  // grab episodes section
  const episodesSection = document.getElementById("allEpisodes")

  // create a new episode card
  const episodeCard = document.createElement('article');
  episodeCard.classList.add('episode');

  // create elements for thumbnail of card
  const thumbnailSection = document.createElement('div');
  const imageWrapper = document.createElement('div');
  const image = document.createElement('img');
  thumbnailSection.classList.add('thumbnailSection');
  imageWrapper.classList.add('imageWrapper');
  image.src = '../../images/concert_thumb.jpeg'; //TODO: update the source with the url from storage

  imageWrapper.appendChild(image);
  thumbnailSection.appendChild(imageWrapper);
  episodeCard.appendChild(thumbnailSection);

  // create elements for description/title of card
  const descriptionSection = document.createElement('div');
  const titleText = document.createTextNode(latestTitle);
  const title = document.createElement('h4');
  descriptionSection.classList.add('descriptionSection');

  title.appendChild(titleText);
  descriptionSection.appendChild(title);
  episodeCard.appendChild(descriptionSection);

  // append episode card to the episodes section
  episodesSection.appendChild(episodeCard);
});




