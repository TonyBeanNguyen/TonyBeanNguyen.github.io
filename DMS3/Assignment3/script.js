

document.getElementById("dialogCloseBtn").addEventListener("click", () => {
  document.getElementById("topDialogBtn").close();
});

document.getElementById("topDialogBtn").showModal();

function setBrushColour(newColour){
  ctx.strokeStyle = newColour;
}

const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg)

const BackgroundMusic=document.querySelector("#BackgroundMusic");

muteUnmuteButton.addEventListener("click", toggleSound);
function toggleSound() {
  if (BackgroundMusic.muted) {
    muteUnmuteImg.src = "./assets/Audio/AudioOn.png";
    BackgroundMusic.muted=false;
  } else {
    muteUnmuteImg.src = "./assets/Audio/AudioOff.png";
    BackgroundMusic.muted=true;
  }

}

let brushImage = null
let currentBrushName= 'pink-button';

const brushes = [
  {name: 'pink-button', img: new Image(), src: './assets/Flower1.png'},
  {name: 'red-button', img: new Image(), src: './assets/Flower2.png'},
  {name: 'two-leaves-button', img: new Image(), src: './assets/Leaf1.png'},
  {name: 'bud-one-button', img: new Image(), src: './assets/Bud1.png'},
  {name: 'blue-button', img: new Image(), src: './assets/Flower3.png'},
  {name: 'black-button', img: new Image(), src: './assets/Flower4.png'},
  {name: 'white-button', img: new Image(), src: './assets/Flower5.png'},
  {name: 'purple-button', img: new Image(), src: './assets/Flower6.png'},
  {name: 'yellow-button', img: new Image(), src: './assets/Flower7.png'},
  {name: 'dark-button', img: new Image(), src: './assets/Flower8.png'},
  {name: 'bud-two-button', img: new Image(), src: './assets/Bud2.png'},
  {name: 'one-leaf-button', img: new Image(), src: './assets/Leaf2.png'},
];

brushes.forEach(brush => {
  brush.img.src = brush.src;
  if (brush.name === currentBrushName) brushImage = brush.img;
});

document.querySelectorAll('[data-brush]').forEach(button => {
  button.addEventListener('click', () => {
    const brushName = button.getAttribute('data-brush');
    const brushObj = brushes.find(b => b.name === brushName);
    if (brushObj) {
      brushImage = brushObj.img;
      currentBrushName = brushName;
    }
  });
});
// document.getElementById("flowerPicker").addEventListener("change", (e) => {
//   const selected = e.target.value;
//   const brushObj = brushes.find(b => b.name === selected);
//   if (brushObj) {
//     brushImage = brushObj.img;
//   }
// });

const brushScales = {
  'pink-button': 0.5,
  'two-leaves-button': 0.2,
  'red-button': 0.12,
  'bud-one-button': 0.18,
  'blue-button': 0.2,
  'black-button':0.15,
  'white-button':0.2,
  'purple-button':0.2,
  'yellow-button':0.22,
  'dark-button':0.12,
  'bud-two-button':0.2,
   'one-leaf-button':0.12
};

let undoStack = [];
let redoStack = [];

let currentState = canvas.toDataURL();

let maxUndo = 100;

function saveUndoState(){
  
  if(undoStack.length === maxUndo){ 
    undoStack.shift();
  }
  
  undoStack.push(currentState);
  
  currentState = canvas.toDataURL();
  
  redoStack = [];
}


function restoreUndoState(){
  
  if(undoStack.length > 0){
    redoStack.push(currentState);
    let newState = undoStack.pop();
    currentState = newState;
    drawDataURLToCanvas(newState);
  }
}


function restoreRedoState(){
  
  if(redoStack.length > 0){
    undoStack.push(currentState);
    let newState = redoStack.pop();
    currentState = newState;
    drawDataURLToCanvas(newState);
  }
}

function drawDataURLToCanvas(imgDataURL){
  let img2Draw = new Image();
  img2Draw.addEventListener("load", function drawOnLoad(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img2Draw, 0, 0);
    layer.batchDraw();
    img2Draw.removeEventListener("load", drawOnLoad);
    img2Draw.remove();
  });
  img2Draw.src = imgDataURL;  
}

document.getElementById("undoBtn").addEventListener("click", () => {
  restoreUndoState();
});

document.getElementById("redoBtn").addEventListener("click", () => {
  restoreRedoState();
});

function downloadCanvasImage(dataURL, fileName){
  let downloadLink = document.createElement("a");
  downloadLink.href = dataURL;
  downloadLink.download = fileName;
  downloadLink.click();
  downloadLink.remove();
} 

document.getElementById("saveBtn").addEventListener("click", () => {
  let canvasCapture = canvas.toDataURL();
  let downloadName = "myImage";
  downloadCanvasImage(canvasCapture, downloadName);
});