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
let quote;
let guests;
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
quote = snapshotJSON.Quote;
guests = snapshotJSON.Guests;
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
const titleSection = document.getElementById('title');
titleSection.appendChild(titleNode);

// create description
const descriptionNode = document.createTextNode(description);
const descriptionSection = document.getElementById('description');
descriptionSection.appendChild(descriptionNode);

// create quotation
const quoteNode = document.createTextNode(quote);
const quoteSection = document.getElementById('episodeQuote');
quoteSection.appendChild(quoteNode);

// create guest list
const guestNode = document.createTextNode(guests);
const guestSection = document.getElementById('guests');
guestSection.appendChild(guestNode);

// grab audioURL from firebase
const audioPath = 'audio/' + audioID;
const audioRef = ref(storage, audioPath);
getDownloadURL(audioRef)
  .then((url) => {
    // create howlerjs sound
    let audio = new Howl({
      src: [url],
      format: ['mp3'],
      volume: 1.0
    });

    // AUDIO PLAYER FUNCTIONS
    // play button
    const playButton = document.getElementById('playButton');
    playButton.addEventListener("click", () => {
      console.log("play button clicked");
      if (playButton.classList.contains("fa-play")) {
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
        audio.play();
      } else if (playButton.classList.contains("fa-pause")) {
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
        audio.pause();
      }
    });

    // mute button
    const muteButton = document.getElementById('muteButton');
    muteButton.addEventListener("click", () => {
      console.log("mute button clicked");
      if (muteButton.classList.contains("fa-volume-high")) {
        muteButton.classList.remove("fa-volume-high");
        muteButton.classList.add("fa-volume-off");
        audio.volume(0.0);
      } else if (muteButton.classList.contains("fa-volume-off")) {
        muteButton.classList.remove("fa-volume-off");
        muteButton.classList.add("fa-volume-high");
        audio.volume(1.0);
      }
    });

    // forward button
    const forwardButton = document.getElementById('forwardButton');
    forwardButton.addEventListener("click", () => {
      console.log("forward button clicked");
      const currentSeek = audio.seek();
      const forwardTo = currentSeek + 15;
      if (forwardTo > audio.duration()) {
        audio.seek(audio.duration());
        updateWidth();
      } else {
        audio.seek(forwardTo);
        updateWidth();
      }
    });

    // back button
    const backButton = document.getElementById('backButton');
    backButton.addEventListener("click", () => {
      console.log("back button clicked");
      const currentSeek = audio.seek();
      const backTo = currentSeek - 15;
      if (backTo < 0) {
        audio.seek(0);
        updateWidth();
      } else {
        audio.seek(backTo);
        updateWidth();
      }
    });

    //update the bar width based on duration left
    const progressBar = document.getElementById('played');
    const remainingBar = document.getElementById('remaining');
    setInterval(() => {
      updateWidth();
    }, 333);

    function updateWidth() {
      // if (audio.playing()) {
      //update the timer with the correct times
      let secondsElapsed = audio.seek();
      let secondsTotal = audio.duration();
      // console.log(secondsElapsed, secondsTotal);

      // update the elapsed time
      let secondsElapsedInt = Math.round(secondsElapsed);
      let hoursElapsed = Math.floor(secondsElapsedInt / 3600);
      secondsElapsedInt %= 3600;
      let minutesElapsed = Math.floor(secondsElapsedInt / 60);
      secondsElapsed = secondsElapsedInt % 60;

      minutesElapsed = String(minutesElapsed).padStart(2, "0");
      hoursElapsed = String(hoursElapsed).padStart(2, "0");
      secondsElapsed = String(secondsElapsed).padStart(2, "0");
      let elapsedString = hoursElapsed + ":" + minutesElapsed + ":" + secondsElapsed;
      if (hoursElapsed === "00") {
        elapsedString = minutesElapsed + ":" + secondsElapsed;
      }

      // update the duration time
      let secondsTotalInt = Math.round(secondsTotal);
      let hoursTotal = Math.floor(secondsTotalInt / 3600);
      secondsTotalInt %= 3600;
      let minutesTotal = Math.floor(secondsTotalInt / 60);
      secondsTotal = secondsTotalInt % 60;

      minutesTotal = String(minutesTotal).padStart(2, "0");
      hoursTotal = String(hoursTotal).padStart(2, "0");
      secondsTotal = String(secondsTotal).padStart(2, "0");
      let totalString = hoursTotal + ":" + minutesTotal + ":" + secondsTotal;
      if (hoursTotal === "00") {
        totalString = minutesTotal + ":" + secondsTotal;
      }

      let timerString = elapsedString + " / " + totalString;
      let timerNode = document.createTextNode(timerString);
      let timer = document.getElementById("audioTimer");
      // timer.appendChild(timerNode);
      timer.innerHTML = timerString;

      // update the progress bar
      let width = (audio.seek() / audio.duration()) * 100;
      let progressWidth = Math.round(width * 100) / 100;
      let remainingWidth = Math.round((100.0 - width) * 100) / 100;
      // console.log(progressWidth, remainingWidth);
      progressBar.style.width = progressWidth + "%";
      remainingBar.style.width = remainingWidth + "%";
      // }
    }
  });

