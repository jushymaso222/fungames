var vid = document.getElementById("envOpen");
var playButton = document.getElementById("playButton")

function playVideo() { 
 vid.play(); 
 playButton.classList.add("hidden")
} 

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("envOpen");

    video.addEventListener("timeupdate", function () {
        if (video.currentTime >= 3) { // Change '5' to your desired timestamp in seconds
            triggerFunction();
            video.removeEventListener("timeupdate", arguments.callee); // Remove event to prevent repeated calls
        }
    });
});

var yesButton = document.getElementById("yesButton");
var noButton = document.getElementById("noButton");

function triggerFunction() {
    console.log("The video reached the specified time!");
    yesButton.classList.toggle("hidden")
    noButton.classList.toggle("hidden")
}

function no() {
    window.location.href="emmano.html";
}

function yes() {
    window.location.href="emmayes.html";
}