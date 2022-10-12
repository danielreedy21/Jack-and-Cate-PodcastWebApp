'use strict';

var clicks = 0;

document.getElementById("testButton").addEventListener("click", onClick);

function onClick() {
    console.log("CLicked!")
    clicks += 1;
    document.getElementById("clicks").innerHTML = clicks;
}