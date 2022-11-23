'use strict';

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
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

const title = 'Top Five Examples';
const titleNode = document.createTextNode(title);
const main = document.getElementById("main");

const imgSrc = "images/Forest_in_Japan.jpeg";

// create thumbnail as one of the main things
const imageWrapper = document.getElementById('imgWrap');
const thumbnail = document.createElement('img');
thumbnail.alt="Forest Image";
thumbnail.src=imgSrc;
imageWrapper.appendChild(thumbnail);

// create title
const descriptionSection = document.getElementById('description');
const episodeName = document.createElement('h1');
episodeName.appendChild(titleNode);
episodeName.classList.add("latestName");
descriptionSection.appendChild(episodeName);







