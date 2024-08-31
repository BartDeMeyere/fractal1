class Box{

    constructor(x , y , size , color){

        this.x = x 
        this.y = y 
        this.size = size
        this.finished = false
        this.color = color
    }

    draw(){


        c.beginPath()
        c.fillStyle = this.color
        c.strokeStyle = "black"
        c.rect(this.x , this.y , this.size , this.size)
        c.stroke()
        c.fill()
        c.closePath()

    }
}