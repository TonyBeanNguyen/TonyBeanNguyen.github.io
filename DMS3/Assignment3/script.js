/////////////////////////////////////// colour selection and wet/dry brush

document.getElementById("dialogCloseBtn").addEventListener("click", () => {
  document.getElementById("topDialogBtn").close();
});

document.getElementById("topDialogBtn").showModal();

/* expects an rgb() string and a=n alpha value as a number */
function rgbaFromRGBString(rgbString, newAlpha){
  /* first we need to get the number values from our string */
  /* the below will return an array with our seperate r,g,b values */
  let colours = rgbString.match(/\d+/g);
  /* then we need to turn this, plus our alpha number into an rgba() string */
  /* below uses template literals to make short script */
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals */
  let newRGBAString = `rgba(${colours[0]}, ${colours[1]}, ${colours[2]}, ${newAlpha})`;
  /* finally return this new string */
  return newRGBAString;
}

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




/////////////////////////////////////// undo/redo

/* create empty arrays to hold our undo/redo states */
let undoStack = [];
let redoStack = [];

/* save our current (original) state */
/* this is currently set up for the canvas image, so its going to use toDataURL() on the canvas */
/* if you were using this for another type of saved data, such as an object, you would need to change this out */
let currentState = canvas.toDataURL();

/* create a limit for undo/redo amount */
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
  /* create img element */
  let img2Draw = new Image();
  /* create an event listener to trigger on src loading */
  img2Draw.addEventListener("load", function drawOnLoad(){
    /* clear what's already on the canvas */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* draw the img using the canvas context - ctx is created in konvaSetup.js */
    /* the two 0s are the x and y position */
    ctx.drawImage(img2Draw, 0, 0);
    /* we have to then redraw the konva layer manually */
    layer.batchDraw();
    /* stop listening for the load event on this element */
    img2Draw.removeEventListener("load", drawOnLoad);
    /* get rid of this element */
    img2Draw.remove();
  });
  /* give the element a source, kicking off the event listener */
  img2Draw.src = imgDataURL;  
}

document.getElementById("undoBtn").addEventListener("click", () => {
  restoreUndoState();
});

document.getElementById("redoBtn").addEventListener("click", () => {
  restoreRedoState();
});

/////////////////////////////////////// save canvas as file

function downloadCanvasImage(dataURL, fileName){
  /* create an <a> element */
  let downloadLink = document.createElement("a");
  /* set its href and download attributes */
  downloadLink.href = dataURL;
  downloadLink.download = fileName;
  /* simulate clicking the link */
  downloadLink.click();
  /* remove element once we're done */
  downloadLink.remove();
} 

document.getElementById("saveBtn").addEventListener("click", () => {
  /* save canvas image as dataURL */
  let canvasCapture = canvas.toDataURL();
  /* define name of file */
  let downloadName = "myImage";
  /* feed into download function */
  downloadCanvasImage(canvasCapture, downloadName);
});