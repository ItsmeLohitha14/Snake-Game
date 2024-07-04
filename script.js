const score = document.getElementById('score')
let s = 0

const board = document.getElementById('gameBoard')
let ctx = board.getContext('2d')

let width = board.width
let height = board.height
let food = 25
let xFood = 0
let yFood = 0
let xs = food
let ys = 0
let started = false

let snake = [{x:75, y:0},
             {x:50, y:0},
             {x:25, y:0},
             {x:0, y:0}]

window.addEventListener('keydown', startGame)//event
start()

function start(){
    background()
    displaySnake()
    displayFood()
}

function background(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)
}

function displaySnake(){
    ctx.fillStyle = '#FF004D'
    ctx.strokeStyle = 'black'  
    
    // for(let i=0; i<snake.length; i++)
    //     ctx.fillRect(snake[i].x, snake[i].y, food, food)

    snake.forEach((part)=>{
        ctx.fillRect(part.x, part.y, food, food)
        ctx.strokeRect(part.x, part.y, food, food)
    }) 
}

function displayFood(){
    xFood = Math.floor(Math.random()*(width/food))*food
    yFood = Math.floor(Math.random()*(height/food))*food
    ctx.fillStyle = '#cc036b'
    ctx.fillRect(xFood, yFood, food, food)
}

function startGame(event){
   
    if(!started){
        started = true
        nextMove()
    }

    if(event.keyCode == 37 && xs!=food){
        xs = -food
        ys = 0
    }
    else if(event.keyCode == 39 && xs!=-food){
        xs = food
        ys = 0
    }
    else if(event.keyCode == 38 && ys!=food){
        xs = 0
        ys = -food;
    }
    else if(event.keyCode == 40 && ys!=-food){
        xs = 0
        ys = food
    }
}

function nextMove(){
    setInterval(()=>{
        if(collisionWall()){
            snakeMoving()
        }
        else{
            ctx.clearRect(0, 0, width, height)
            ctx.font = "bold 50px serif"
            ctx.fillStyle = "black"
            ctx.textAlign = 'center'
            ctx.fillText("Game Over!!", width/2, height/2)
        }
    }, 200)
}

function snakeMoving(){
    // head
    let head = {x: snake[0].x + xs, y: snake[0].y + ys}
    // paint the head
    ctx.fillStyle = '#FF004D'
    ctx.strokeStyle = 'black'
    ctx.fillRect(head.x, head.y, food, food)
    ctx.strokeRect(head.x, head.y, food, food)  
    // add the head
    snake.unshift(head)
    
    if(snake[0].x == xFood && snake[0].y == yFood){
        s++
        score.innerHTML = s
        displayFood()
    }
    else{
        // del the tail
        let tail = snake.pop()
        // repaint the tail
        ctx.fillStyle = 'black'
        ctx.fillRect(tail.x, tail.y, food, food)    
    }
}

function collisionWall(){

    if(snake[0].x<0 || snake[0].x>width || snake[0].y<0 || snake[0].y>height)
        return false
    else
        return true
}


