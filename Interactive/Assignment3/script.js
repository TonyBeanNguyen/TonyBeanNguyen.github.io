

document.getElementById("dialogCloseBtn").addEventListener("click", () => {
  document.getElementById("topDialogBtn").close();
});

document.getElementById("topDialogBtn").showModal();

let pieces = [
  "Img1TopLeftCorner",
  "Img2TopMiddle",
  "Img3TopRightCorner",
  "Img5MiddleMiddle",
  "Img6MiddleRight",
  "Img8BottomMiddle",
  "Img4MiddleLeft",
  "",
  "Img7BottomLeftCorner"
];

//Basically, I've made the fixed arrays for the puzzle when it first started
//as in how the game starts will always be like it, as I've figured out the
//specific locations that will guarantee to be solvable but still gives a bit
//of challenge for the player

const puzzle = document.getElementById("puzzle");
const resetButton = document.getElementById("resetButton");      // Reset puzzle button
const restartButton = document.getElementById("restartButton");  // Shown after win
const saveButton = document.getElementById("saveButton");        // Save artwork button
const completeImg = document.getElementById("completeImg");      // Full image after solving

// At first, I've chosen to shuffle the puzzle randomly using mat.random
//But after multiple testings, I found out that half of the movement will
//not complete the puzzle as only some can while others are impossible to
//complete therefore, I've changed it to what I wrote above
//pieces = pieces.sort(() => Math.random() - 0.5);

function render() {
  puzzle.innerHTML = "";
  pieces.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.index = index;

    if (value !== "") {
      const img = document.createElement("img");
      img.src = `Assets/${value}.jpg`;
      tile.appendChild(img);
    }

    tile.addEventListener("click", () => {
      moveTile(index);
    });

    puzzle.appendChild(tile);
  });

  checkWin();
}

function moveTile(index) {
  const emptyIndex = pieces.indexOf("");
  const sameRow = Math.floor(index / 3) === Math.floor(emptyIndex / 3);
  const horizontal = (index === emptyIndex - 1 || index === emptyIndex + 1) && sameRow;
  const vertical = index === emptyIndex - 3 || index === emptyIndex + 3;
// +1 and -1 with +3 and -3 means the movement the player can move, -1 being the left space of the
// puzzle while +1 is the right space of the puzzle, similarly to -3 which means 1 row up from the 
// space and +3 being vertically down row such as for the 5th piece, +1 is 6, -1 is 4 while -3 is 
// 8 while +3 is 2 just showing the valid space that it can move

  if (horizontal || vertical) {
    [pieces[index], pieces[emptyIndex]] = [pieces[emptyIndex], pieces[index]];
    render();
  }
}

function checkWin() {
  const correct = [
    "Img1TopLeftCorner",
    "Img2TopMiddle",
    "Img3TopRightCorner",
    "Img4MiddleLeft",
    "Img5MiddleMiddle",
    "Img6MiddleRight",
    "Img7BottomLeftCorner",
    "Img8BottomMiddle",
    ""
  ];
  // This is the correct spaces of the first part, the moment the player put all the pieces into
  // the correct space, it will be completed

  if (JSON.stringify(pieces) === JSON.stringify(correct)) {
    setTimeout(() => {
      alert("Puzzle completed!");

      puzzle.style.visibility = "hidden";
      completeImg.classList.add("show");

      restartButton.style.display = "block";
      saveButton.style.display = "block";
      resetButton.style.display = "none"; // Hide reset button when puzzle is solved

      const tiles = document.querySelectorAll(".tile");
      tiles.forEach(tile => tile.style.pointerEvents = "none");

    }, 100);
  }
}

function restartGame() {
  pieces = [
    "Img1TopLeftCorner",
    "Img2TopMiddle",
    "Img3TopRightCorner",
    "Img5MiddleMiddle",
    "Img6MiddleRight",
    "Img8BottomMiddle",
    "Img4MiddleLeft",
    "",
    "Img7BottomLeftCorner"
  ];

  completeImg.classList.remove("show");
  restartButton.style.display = "none";
  saveButton.style.display = "none";   // Hide save button again
  resetButton.style.display = "block"; // Show reset button again
  puzzle.style.visibility = "visible";

  render();
}

// Event listeners
restartButton.addEventListener("click", restartGame);

resetButton.addEventListener("click", () => {
  restartGame(); 
});


document.getElementById("saveButton").addEventListener("click", () => {
  const completeImg = document.getElementById("completeImg");
  const imageURL = completeImg.src;

  const downloadLink = document.createElement("a");
  downloadLink.href = imageURL;
  downloadLink.download = "FinishedPuzzle.jpg";
  downloadLink.click();
});


render();

const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg)

const backgroundMusic=document.querySelector("#backgroundMusic");

muteUnmuteButton.addEventListener("click", toggleSound);
function toggleSound() {
  if (backgroundMusic.muted) {
    muteUnmuteImg.src = "./Assets/UnmuteButton.png";
    backgroundMusic.muted=false;
  } else {
    muteUnmuteImg.src = "./Assets/MuteButton.png";
    backgroundMusic.muted=true;
  }

}

const hintButton=document.getElementById('hintButton');

hintButton.addEventListener('click', () => {
  // Show the image
  completeImg.classList.add('show');

  // Hide it again after 3 seconds
  setTimeout(() => {
    completeImg.classList.remove('show');
  }, 2000); // 3000 ms = 3 seconds
});