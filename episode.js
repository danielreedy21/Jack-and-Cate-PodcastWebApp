'use strict';


const title = 'Top Five Examples';
const titleNode = document.createTextNode(title);
const main = document.getElementById("main");

const imgSrc = "images/Forest_in_Japan.jpeg";

// create thumbnail
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

