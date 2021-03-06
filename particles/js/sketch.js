let bubbles = [];

function preload() {

}

function setup(){
    frameRate(60)
    let canvas = createCanvas(window.innerWidth,window.innerHeight)
    canvas.parent('vis')
    angleMode(DEGREES)
    noLoop()
}

function mouseMoved() {
    addNew(2)
}

function mouseDragged() {
    addNew(2)
}

function addNew(amount){
    amount = amount || 1
    for (let i =0; i<amount;i++){
        let r = random(10, 50);
        let b = new Bubble(mouseX, mouseY, r);
        bubbles.push(b);
    }
    loop()
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

    if(bubbles.length == 0){
        noLoop()
    }
}

class Bubble{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = random(50,100);
        this.color = Math.random();
        this.reduceAmount = random(0.06 , 0.03)
        this.moveX = random(-1,1);
        this.moveY = random(-1,1);
        this.speed = random(1,5);
        this.age = 0;

    }

    move() {
        this.x = this.x + (this.moveX*this.speed);
        this.y = this.y + (this.moveY*this.speed);
        
        //shift the direction slightly so they dont move in a straight line
        this.moveX = this.moveX + random(-0.2, 0.2)
        this.moveY = this.moveY + random(-0.2, 0.2)
    }

    reduce(){
        this.size = this.size > 1 ? this.size * (1 - this.reduceAmount) : 0
    }

    show(){
        let colorScale  = chroma.scale('Spectral').mode('lch');
        noStroke()
        fill(this.age < 1 ? "#ffffff" : colorScale(this.color).hex()) // add a flash of white as new bubbles are created.
        circle(this.x, this.y, this.size)
        this.age += 1
    }

}

function windowResized() {
    resizeCanvas(window.innerWidth,window.innerHeight);
}