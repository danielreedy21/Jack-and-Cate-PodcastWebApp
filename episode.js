'use strict';


const title = 'Top Five Examples';
const titleNode = document.createTextNode(title);
const main = document.getElementById("main");

const imgSrc = "images/Forest_in_Japan.jpeg";


// create episode wrapper
const episodeWrapper = document.createElement('div');
episodeWrapper.classList.add("latestEpisode");
main.appendChild(episodeWrapper);

// create thumbnail section
const thumbnailSection = document.createElement('div');
thumbnailSection.classList.add("latestThumbnailSection");
episodeWrapper.appendChild(thumbnailSection);

// create description section
const descriptionSection = document.createElement('div');
descriptionSection.classList.add("latestDescriptionSection");
episodeWrapper.appendChild(descriptionSection);

// create image wrapper
const imageWrapper = document.createElement('div');
imageWrapper.classList.add("latestImageWrapper");
thumbnailSection.appendChild(imageWrapper);

// create Comments header
const commentHeader = document.createElement('h2');
const commentHNode = document.createTextNode('Comments:');
commentHeader.classList.add("commentsHeader");
commentHeader.appendChild(commentHNode);
main.appendChild(commentHeader);
// ABOVE THIS CAN JUST BE REGULAR HTML ///


// create thumbnail
const thumbnail = document.createElement('img');
thumbnail.alt="Forest Image";
thumbnail.src=imgSrc;
imageWrapper.appendChild(thumbnail);

// create title
const episodeName = document.createElement('h1');
episodeName.appendChild(titleNode);
episodeName.classList.add("latestName");
descriptionSection.appendChild(episodeName);

