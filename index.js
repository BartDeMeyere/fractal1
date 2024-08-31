var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

canvas.style.width = 100 + "%"
canvas.style.height = 100 + "%"

var size = 800 
var easing = .07
var blocks = []
var order = 1
var maxorder = 11 
var animate = false
var animId = undefined
var color = "rgba(255,255,255,.9)"

function renderContent(){

    c.clearRect(0 , 0 , canvas.width , canvas.height)

    blocks.forEach(box => {

        box.draw()
    })

}

function EaseOut(object , nx , ny , easing){

    function run(){

        object.x += (nx - object.x) * easing
        object.y += (ny - object.y) * easing

        var dx = nx - object.x 
        var dy = ny - object.y
        var dist = Math.sqrt(dx * dx + dy * dy)
        
        if(Math.abs(dist) < .01){

            object.finished = true
            return

        }else{

            requestAnimationFrame(run)
        }  
       
    }
    
    run()
}

function Createblocks(){

    for(var i = 0 ; i < blocks.length ; i++){

        if(blocks[i].finished){

            var newsize = blocks[i].size/2
            var sx = blocks[i].x
            var sy = blocks[i].y

            blocks.splice(i,1)

            var box1 = new Box(sx , sy  , newsize , color)
            var box2 = new Box(sx + newsize , sy , newsize , color)
            var box3 = new Box(sx , sy + newsize , newsize , color)
            var box4 = new Box(sx + newsize , sy + newsize , newsize , color)

            blocks.unshift(box1)
            blocks.unshift(box2)
            blocks.unshift(box3)
            blocks.unshift(box4)

            if(order % 2 === 0){

                EaseOut(box1 , box1.x + newsize/2 ,  box1.y , easing)
                EaseOut(box2 , box2.x + newsize/2 ,  box2.y , easing)
                EaseOut(box3 , box3.x - newsize/2 ,  box3.y , easing)
                EaseOut(box4 , box4.x - newsize/2 ,  box4.y , easing)
               
            }else{

                EaseOut(box1 , box1.x , box1.y - newsize/2 , easing)
                EaseOut(box2 , box2.x , box2.y + newsize/2 , easing)
                EaseOut(box3 , box3.x , box3.y - newsize/2 , easing)
                EaseOut(box4 , box4.x , box4.y + newsize/2 , easing)

            }

        }
         
    }

 }

 function CreateFractal(){

    if(order === 1){

        console.log("order: " + order)
        var box = new Box(canvas.width/2 - size/2 , canvas.height/2 - size/2 , size , color)
        box.finished = true
        blocks.push(box)
        order++
        console.log("order: " + order)

    }else{

        if(Checkblocks()){

            Createblocks()
            order++ 
            console.log("order: " + order)

            if(order >= maxorder){

                console.log("fractal generated")
                return
            }
        }
        
    }

    renderContent()

    animId = requestAnimationFrame(CreateFractal)

 }

 function Checkblocks(){

    for(var i = 0 ; i < blocks.length ; i++){

        if(!blocks[i].finished){

            return false
        }
    }

    return true

 }

 $("canvas").on("click" , () => {

    cancelAnimationFrame(animId)
    order = 1
    blocks = []
    size = 800
    animate = false 
    CreateFractal()

 })



