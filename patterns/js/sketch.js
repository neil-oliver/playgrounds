let backgroundColor = 255
let numberOfShapes = 30
let shape = 1

function preload() {

}

function setup(){
    frameRate(60)
    let canvas = createCanvas(window.innerWidth,window.innerHeight)
    canvas.parent('vis')
    noLoop()
}

$(document).ready(function() {
    $('input[type=radio]').change(function() {
      shape = $(this)[0].value;
      draw()
    });
});

function draw(){
    background(backgroundColor);
    noStroke()
    let alphaVal = 1
    let shapeWidth = window.innerWidth / numberOfShapes
    for(let i=0;i<numberOfShapes;i++){
        for(let x=0;x<(window.innerHeight/shapeWidth);x++){
            //add corner fade 
            alphaVal = (1 / (numberOfShapes + (window.innerHeight/shapeWidth))) * (i + x)
            drawShape(shapeWidth*i,shapeWidth*x,shapeWidth,1-alphaVal)
        }
    }
}
function drawShape(x,y,size,alpha){
    if (shape == 1){
        fill(`rgba(92, 201, 245,${alpha})`)
        square(x,y,size)
        fill(backgroundColor)
        circle(x+size,y+size,size*2)
    } else if (shape == 2){
        fill(`rgba(255, 96, 118,${alpha})`)
        square(x,y,size)
        fill(backgroundColor)
        quad(x+(size/2), y, x+(size), y+(size/2), x+(size/2), y+(size), x, y+(size/2))
    }  else if (shape == 3){
        noFill()
        strokeWeight(size/5);
        stroke(`rgba(255, 113, 0,${alpha})`)
        arc(x, y, size, size, 0, HALF_PI);
    } else if (shape == 4){
        fill(`rgba(92, 201, 245,${alpha})`)
        square(x,y,size)
        fill(backgroundColor)
        circle(x+size/2,y+size/2,size)
    }  else if (shape == 5){
        noFill()
        strokeWeight(size/5);
        stroke(`rgba(255, 96, 118,${alpha})`)
        quad(x+(size/2), y, x+(size), y+(size/2), x+(size/2), y+(size), x, y+(size/2))
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth,window.innerHeight);
  }