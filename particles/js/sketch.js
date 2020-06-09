let bubbles = [];

function preload() {

}

function setup(){
    frameRate(60)
    let canvas = createCanvas(window.innerWidth,window.innerHeight)
    canvas.parent('vis')
}

function mouseDragged() {
    let r = random(10, 50);
    let b = new Bubble(mouseX, mouseY, r);
    bubbles.push(b);
  }


function draw(){
    background(50,50,50);

    for(var i = bubbles.length -1; i >= 0 ; i--){
        let bubble = bubbles[i]
        bubble.move();
        bubble.show();
        if (bubble.size > 0){
            bubble.reduce();
        } else {
            bubbles.splice(i, 1);
        }
    }
}

class Bubble{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 20;
        this.color = Math.random()
        this.reduceAmount = Math.random() > 0.5 ? 0.2 : 0.1
    }

    move() {
        this.x = this.x + random(-5, 5);
        this.y = this.y + random(-5, 5);
    }

    reduce(){
        this.size = this.size - this.reduceAmount
    }

    show(){
        let colorScale  = chroma.scale('Spectral').mode('lch');
        noStroke()
        fill(colorScale(this.color).hex())
        circle(this.x, this.y, this.size)
    }

}

function windowResized() {
    resizeCanvas(window.innerWidth,window.innerHeight);
}