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