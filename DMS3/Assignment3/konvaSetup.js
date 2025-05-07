/* set up stage and layer */

window.stage = new Konva.Stage({
    container: 'stageContainer',
    width: 500,
    height: 500
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
    const LocalPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y()
    };

    const scale = brushScales[currentBrushName] || 1;

    // const brushName = document.getElementById('flowerPicker').value;
    // const scale = brushScales[brushName] ||1;

    const scaledWidth = brushImage.width * scale;
    const scaledHeight = brushImage.height * scale;

    console.log("Brush selected:", currentBrushName);

    ctx.drawImage(
        brushImage,
        LocalPos.x - scaledWidth / 2,
        LocalPos.y - scaledHeight / 2,
        scaledWidth,
        scaledHeight
    );
    
      lastPointerPos = pos;
    
      layer.batchDraw();
    }

    

image.on('mousedown', () => {
    isPainting = true;
    lastPointerPos = stage.getPointerPosition();
    /* add draw listener on mousedown */
    stage.on('mousemove', draw);
});

/* this is different from the example : the example stage took up the whole page */
/* so we could listen for mouseup there. as our stage is only a part of the page */
/* we have to instead listen on the document itself */
document.addEventListener("mouseup", () => {
    if(isPainting){
      saveUndoState();
    }
    isPainting = false;
    /* remove draw listener on mouseup */
    stage.off('mousemove', draw);  
});