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


function redirectToVideo() {
    const button = document.querySelector('toVideoButton');
    button.classList.add('fade-out');  // Add fade-out class to trigger transition

    // Wait for the fade-out to finish (1s), then redirect
    setTimeout(function() {
     window.location.href='index.html'; 
    }, 1000); // 1000ms = 1s, matches the transition time
  }
  