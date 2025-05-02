const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}

const switchButton = document.getElementById('backgroundSwitch');

// This part is the toggle that will specifically changes the theme from one theme to another as its 
// add the dark theme class to the body
switchButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

// This part is the changes of the text depending on the theme that's being used
  if (document.body.classList.contains('dark-theme')) {
    switchButton.textContent = "Switch to Light Theme";
  } else {
    switchButton.textContent = "Switch to Dark Theme";
  }
});


// This is just adding the colume slider input to the video and changing the value
const volumeSlider = document.getElementById('volume-slider');

volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
});

// This is what we studied at school in which it's toggling sound based on the function and the icons changing
// bases on the function press
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg)

muteUnmuteButton.addEventListener("click", toggleSound);
function toggleSound() {
  if (video.muted) {
    muteUnmuteImg.src = "./Assets/icons8-audio-30.png";
    video.muted=false;
  } else {
    muteUnmuteImg.src = "./Assets/icons8-no-audio-30.png";
    video.muted=true;
  }

}

// Lastly, the javascript that I definitely think will help the website because it get to make the video screen go
// full screen in which many viwers may want to be able to do in the website, it looks for the click in which it then
// will run the toggle full screen function
const fullscreenButton = document.querySelector("#fullscreen-button");
console.log(fullscreenButton);

fullscreenButton.addEventListener("click", toggleFullscreen);

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
    

