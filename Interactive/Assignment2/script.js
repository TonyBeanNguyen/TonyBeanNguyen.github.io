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
// Add other functionalities here

const switchButton = document.getElementById('backgroundSwitch');

switchButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Optional: change the button text
  if (document.body.classList.contains('dark-theme')) {
    switchButton.textContent = "Switch to Light Theme";
  } else {
    switchButton.textContent = "Switch to Dark Theme";
  }
});



const volumeSlider = document.getElementById('volume-slider');

volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
});



