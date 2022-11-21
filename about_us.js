'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
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


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const audioRef = ref(storage, 'audio');
const smallAdRef = ref(storage, 'audio/30secondAd.mp3');
getDownloadURL(smallAdRef)
	.then((url) => {
		const smallAdAudio = document.getElementById('30secAd');
		smallAdAudio.setAttribute('src',url);
	});
