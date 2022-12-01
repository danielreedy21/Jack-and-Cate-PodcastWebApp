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
const storage = getStorage(app);
const db = getFirestore(app);


// grab the data for the latest episode
const episodeData = collection(db, "EpisodesData");
const latestQuery = query(episodeData, orderBy("Date", "desc"), limit(1));
const latestQuerySnapshot = await getDocs(latestQuery);
latestQuerySnapshot.forEach((doc) => {
  const latestID = doc.id;
  console.log(latestID, " => ", JSON.stringify(doc.data(), undefined, 2));
  const latestTitle = doc.data().Title;
  const latestDescription = doc.data().Description;
  const latestAudioID = doc.data().audioID;
  const latestThumbnailID = doc.data().thumbnailID;

  // create url to episode page
  const latestEpisodeURL = "pages/episode/episode.html?id=" + latestID;
  const latestImgWrapper = document.getElementById('latestImgWrap');
  const latestName = document.getElementById('latestName');
  latestImgWrapper.href = latestEpisodeURL;
  latestName.href = latestEpisodeURL;


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

});



// grab data for the recent episodes
const recentQuery = query(episodeData, orderBy("Date", "desc"), limit(6));
const recentQuerySnapshot = await getDocs(recentQuery);
let i = 0;
console.log("LOGGING RECENT EPISODE DATA")
recentQuerySnapshot.forEach((doc) => {
  if (i > 0) {
    const episodeID = doc.id;
    console.log(episodeID, " => ", JSON.stringify(doc.data(), undefined, 2));
    const title = doc.data().Title;
    const description = doc.data().Description;
    const audioID = doc.data().audioID;
    const thumbnailID = doc.data().thumbnailID;

    // creating path to this episode's page
    let episodePagePath = "pages/episode/episode.html?id=" + episodeID;
    console.log(episodePagePath)

    // ADD EPISODE CARD TO THE DOM
    // grab recent episode section from the DOM
    const recentSection = document.getElementById('recentEpisodes');

    // create a new episode card
    const episodeCard = document.createElement('article');
    episodeCard.classList.add('episode');

    // create elements for thumbnail of card
    const thumbnailSection = document.createElement('div');
    const imageWrapper = document.createElement('a');
    const image = document.createElement('img');
    thumbnailSection.classList.add('thumbnailSection');
    imageWrapper.classList.add('imageWrapper');
    // imageWrapper.onclick = "clickLink(" + episodePagePath + ");";
    imageWrapper.href = episodePagePath;

    imageWrapper.appendChild(image);
    thumbnailSection.appendChild(imageWrapper);
    episodeCard.appendChild(thumbnailSection);

    // create elements for description/title of card
    const descriptionSection = document.createElement('div');
    const titleText = document.createTextNode(title);
    const titleElement = document.createElement('h4');
    descriptionSection.classList.add('descriptionSection');

    titleElement.appendChild(titleText);
    descriptionSection.appendChild(titleElement);
    episodeCard.appendChild(descriptionSection);

    // append episode card to the episodes section
    recentSection.appendChild(episodeCard);


    // update the card with the correct thumbnail
    const thumbnailPath = 'thumbnails/Episode Thumbnails/' + thumbnailID;
    const thumbRef = ref(storage, thumbnailPath);
    getDownloadURL(thumbRef)
      .then((url) => {
        image.src = url;
      });
  }
  i++;
});






