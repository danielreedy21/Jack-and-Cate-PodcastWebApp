'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { getFirestore, collection, doc, getDoc, getDocs, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyCdLRTmqMHCgQ53C436xz0JLpLEA2S_gKk",
  authDomain: "finest-five-podcast.firebaseapp.com",
  projectId: "finest-five-podcast",
  storageBucket: "finest-five-podcast.appspot.com",
  messagingSenderId: "781980552264",
  appId: "1:781980552264:web:01a4c911a4148eb2f25c7d",
  measurementId: "G-DVFPMGBT2X"
};


const app = initializeApp(firebaseConfig)
const storage = getStorage(app);
const db = getFirestore(app);

// grab episode ID from url parameters
const windowLocation = window.location.search;
const urlParams = new URLSearchParams(windowLocation);
const episodeID = urlParams.get('id');
console.log(episodeID)


// grab episode ID based on the doc ID
let title;
let description;
let audioID;
let thumbnailID;
const episodeRef = doc(db, "EpisodesData", episodeID)
const episodeSnapshot = await getDoc(episodeRef)
//verify data in console
if (episodeSnapshot.exists()) {
  console.log("Episode exists in Firebase")
}
console.log(episodeID, " => ", JSON.stringify(episodeSnapshot.data(), undefined, 2));

//pass data from snapshot into variables
const snapshotJSON = episodeSnapshot.data();
title = snapshotJSON.Title;
description = snapshotJSON.Description;
audioID = snapshotJSON.audioID;
thumbnailID = snapshotJSON.thumbnailID;

// create thumbnail URL with firebase
const thumbnailPath = 'thumbnails/Episode Thumbnails/' + thumbnailID;
const thumbRef = ref(storage, thumbnailPath);
getDownloadURL(thumbRef)
  .then((url) => {
    const imageWrapper = document.getElementById('imgWrap');
    const thumbnail = document.createElement('img');
    thumbnail.alt = "Episode Thumbnail";
    thumbnail.src = url;
    imageWrapper.appendChild(thumbnail);
  });

// create title
const titleNode = document.createTextNode(title);
const descriptionSection = document.getElementById('description');
const episodeName = document.createElement('h1');
episodeName.appendChild(titleNode);
episodeName.classList.add("latestName");
descriptionSection.appendChild(episodeName);

// TODO: create description


