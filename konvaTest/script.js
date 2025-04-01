let myStage = new Konva.Stage({
    container:"konvaStage",
    width: 500,
    height: 500
});

let LayerOne = new Konva.Layer();

let currentColour = 'pink';

function addCircle(){
    let circle = new Konva.Circle({
        x: myStage.width() / 2,
        y: myStage.height() /2,
        radius: 70, 
        fill: currentColour,
        draggable:true
    });
    LayerOne.add(circle);
    LayerOne.cache()
}
addCircle();

document.getElementById("circle").addEventListener("click", addCircle);

document.getElementById("colorpicker").addEventListener("change", changecirclecolor)
function changecirclecolor(e){
    currentColour = e.target.value;
}
LayerOne.cache()
LayerOne.filters([Konva.Filters.Blur]);
LayerOne.blurRadius(10);
document.getElementById("range1").addEventListener("change", (e) => {
    LayerOne.cache()
    LayerOne.blurRadius(e.target.value )
})

myStage.add(LayerOne)

var blurvalue = remapRange(value, 0, 100, 0, 30);
image.blurRadius(blurvalue);
console.log(`xPos: ${value}`);
