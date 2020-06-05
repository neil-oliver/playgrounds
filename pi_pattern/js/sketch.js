let backgroundColor = 255
let longPi="3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198"
let bubbles = [];
let circleSize = window.innerWidth / 7

function setup(){
    frameRate(60)
    let canvas = createCanvas(window.innerWidth,window.innerHeight)
    canvas.parent('vis')
    noLoop()

    //create bubbles
    for(let i=0;i<360;i++){
        let b = new bubble((window.innerWidth / 2) + cos(i)*circleSize, (window.innerHeight / 2) + sin(i)*circleSize, i)
        bubbles.push(b)
    }
}

function draw(){
    background(backgroundColor);
    for(let i=0;i<360;i++){
        bubbles[i].show()
    }
    textSize(32);
    fill(0)
    text('π',window.innerWidth / 2, window.innerHeight / 2,)
}

function mouseClicked(){
    for(let i=0;i<360;i++){
        bubbles[i].selected()
    }
}

class bubble{
    constructor(x,y,index){
        this.x = x;
        this.y = y;
        this.index = index;
        this.size = (this.index == 0) ? longPi[this.index]*30 : longPi[this.index]*3;
        this.stroke = 1;
        this.color = [0,0,0]
    }

    selected(){
        let distance = dist(mouseX, mouseY, this.x, this.y)
        if (distance <= this.size/2){
            console.log('clicked')
            this.stroke = 3
            this.color = [255,0,0]
            draw()
        } else {
            this.stroke = 1
            this.color = [0,0,0]
        }
    }

    show(){
        noFill()
        strokeWeight(this.stroke)
        stroke(this.color)
        circle(this.x, this.y, this.size)
    }

}

function windowResized() {
    //recenter the bubbles on resize
    for(let i in bubbles){
        bubbles[i].x = (window.innerWidth / 2) + cos(i)*circleSize
        bubbles[i].y = (window.innerHeight / 2) + sin(i)*circleSize
    }

    resizeCanvas(window.innerWidth,window.innerHeight);

  }