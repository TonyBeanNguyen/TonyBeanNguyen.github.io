/* set up stage and layer */

console.log ()

let stageContainer = document.getElementById("stageContainer")
console.log (stageContainer.offsetWidth)

window.stage = new Konva.Stage({
    container: 'stageContainer',
    width: 600,
    height: 600
  });
  window.layer = new Konva.Layer();
  stage.add(layer);
  
  window.canvas = document.createElement('canvas');
  canvas.width = stage.width();
  canvas.height = stage.height();
  
  const image = new Konva.Image({
    image: canvas,
    x: 0,
    y: 0
  });
  layer.add(image);
  
  window.ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'source-over';
  
  window.brushImage = new Image();
  

// const brushImage= new Image();
// brushImage.src="https://tonybeannguyen.github.io/DMS3/Assignment3/assets/Flower1.png";

/* maybe don't need */
/*ctx.strokeStyle = "rgba(255, 255, 255, 1)";
ctx.lineJoin = "round";
ctx.lineWidth = 5;

/* set up drawing state */
let isPainting = false;
let lastPointerPos = null;
let mode = 'brush';

/* now we need to do some event handling */
/* this is similar to how addEventListener works but slightly different for Konva */
/* see : https://konvajs.org/docs/events/Binding_Events.html */
/* we'll also handle the drawing function a little different */
/* rather than always listening on the stage we'll instead add and remove with mousedown and mouseup */
/* first we need to define the drawing function */

brushImage.onload=() => {
    console.log("Brush image loaded!");
};



function draw() {
    if (!brushImage || !brushImage.complete) return;
  
    ctx.globalCompositeOperation = (mode === 'brush') ? 'source-over' : 'destination-out';
    
    /*ctx.beginPath();
    const localPos = {
        x: lastPointerPos.x - image.x(),
        y: lastPointerPos.y - image.y()
    };
    ctx.moveTo(localPos.x, localPos.y);*/

    const pos = stage.getPointerPosition();
    const stageOffset = {
        x: image.x(),
        y: image.y()
      };
      
    const LocalPos = {
        x: pos.x - stageOffset.x,
        y: pos.y - stageOffset.y
    };

    const baseScale = brushScales[currentBrushName] || 1;

    // const brushName = document.getElementById('flowerPicker').value;
    // const scale = brushScales[brushName] ||1;

    const randomScale=baseScale * (0.8 + Math.random() *0.4);


    const rotation = Math.random() * Math.PI * 2;
    // To calculate the circomference of the circle and will rotate it bases on *2 which supposedly means 360 Degree
    // and with the Math Random, it will present random angle such as 0 to 360

    const scaledWidth = brushImage.width * randomScale;
    const scaledHeight = brushImage.height * randomScale;

    console.log("Brush selected:", currentBrushName);

    ctx.save();
    ctx.translate(LocalPos.x, LocalPos.y);
    ctx.rotate(rotation);
    ctx.drawImage(
        brushImage,
        - scaledWidth / 2,
        - scaledHeight / 2,
        scaledWidth,
        scaledHeight
    );
    // This will draw the flower center to the cursor 

    ctx.restore();
    // This will reset canvas transform so the next stroke is cleanly painted
    
      lastPointerPos = pos;
    
      layer.batchDraw();
    }

    

image.on('mousedown', () => {
    isPainting = true;
    lastPointerPos = stage.getPointerPosition();
    /* add draw listener on mousedown */
    stage.on('mousemove', draw);
});

// This sets up the interaction
// When it's press down on the image, it will activates painting.
// It stores the pointer's start position on where it's pressed.
// Then it will follow the mouse movement which it will keep on calling draw 

document.addEventListener("mouseup", () => {
    if(isPainting){
      saveUndoState();
    }
    isPainting = false;
    /* remove draw listener on mouseup */
    stage.off('mousemove', draw);  
});