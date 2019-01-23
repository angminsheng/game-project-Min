
/**********************
 Defining all the variables of canvas
 **********************/
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height

/**********************
Draw charging Dock
 **********************/
var docker = new Dock(350, 350, 80)

/**********************
Drawing the background
 **********************/
function drawBg() {
  if (docker.status == 'green') {
    ctx.save()
    ctx.fillStyle = '#004C00';
    ctx.fillRect(0, 0, 350, 350);
    ctx.fillStyle = '#00B200';
    ctx.fillRect(350, 0, 350, 350);
    ctx.fillStyle = '#19FF19';
    ctx.fillRect(0, 350, 350, 350);
    ctx.fillStyle = '#7FFF7F';
    ctx.fillRect(350, 350, 350, 350);
    ctx.fillStyle = '#FFF';
  } else if (docker.status == 'red') {
    ctx.save()
    ctx.fillStyle = '	#4C0000';
    ctx.fillRect(0, 0, 350, 350);
    ctx.fillStyle = '#B20000';
    ctx.fillRect(350, 0, 350, 350);
    ctx.fillStyle = '#FF1919';
    ctx.fillRect(0, 350, 350, 350);
    ctx.fillStyle = '#FF7F7F';
    ctx.fillRect(350, 350, 350, 350);
    ctx.fillStyle = '#FFF';
  } else if (docker.status == 'blue') {
    ctx.save()
    ctx.fillStyle = '	#00004C';
    ctx.fillRect(0, 0, 350, 350);
    ctx.fillStyle = '#0000B2';
    ctx.fillRect(350, 0, 350, 350);
    ctx.fillStyle = '#1919FF';
    ctx.fillRect(0, 350, 350, 350);
    ctx.fillStyle = '#7F7FFF';
    ctx.fillRect(350, 350, 350, 350);
    ctx.fillStyle = '#FFF';

  } else if (docker.status == 'yellow') {
    ctx.save()
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(0, 0, 350, 350);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(350, 0, 350, 350);
    ctx.fillStyle = '#FFFF19';
    ctx.fillRect(0, 350, 350, 350);
    ctx.fillStyle = '#FFFF7F';
    ctx.fillRect(350, 350, 350, 350);
    ctx.fillStyle = '#FFF';
  }

  ctx.globalAlpha = 0.5;

  // Draw semi transparent circles
  for (i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.arc(350, 350, 10 + 40 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
  ctx.restore()
}
drawBg();

/**********************
Changing color of dork 
 **********************/
var colorCounter = 0
var colorArray = ['blue', 'green', 'yellow', 'red']
setInterval(function () {
  docker.status = colorArray[colorCounter % 4]
  colorCounter++
  console.log('change!')
  drawBg()
  chargeCounter = 0
  player.color = '#DCDCDC'
}, 15000)

/**********************
Creating the balls and object
 **********************/
var ballArrayRed = []
var ballArrayBlue = []
var ballArrayGreen = []
var ballArrayYellow = []
var ballspeedX = 2.5
var ballspeedY = 2

setInterval(function () {
  if (ballArrayRed.length < 1) {
    ballArrayRed.push(new Ball(25, 25, 25, 'red', ballspeedX, ballspeedY))
  }

  if (ballArrayBlue.length < 1) {
    ballArrayBlue.push(new Ball(675, 25, 25, 'blue', -ballspeedX, -ballspeedY))
  }

  if (ballArrayGreen.length < 1) {
    ballArrayGreen.push(new Ball(25, 675, 25, 'green', ballspeedX, -ballspeedY))
  }

  if (ballArrayYellow.length < 1) {
    ballArrayYellow.push(new Ball(675, 675, 25, 'yellow', -ballspeedX, ballspeedY))
  }


}, 2000)


// var coin = new Coin('images/coin-sprite-animation-sprite-sheet.png', 440, 40, 200, 200, 10)


/**********************
 Creating the player
 **********************/
playerArray = []
playerArray.push(new Player(250, 250, 25))
// var player2 = new Player(250, 100, 25)

/**********************
 function to define edges
 **********************/
function edges(ball) {
  if (ball.y + ball.radius > height || ball.y - ball.radius < 0) {
    ball.vy *= -1
  }
  if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
    ball.vx *= -1
  }
}

/**********************
 collision
 **********************/
function collideBetweenPlayer(ball1, ball2) {
  var distance = Math.sqrt((ball1.x - ball2.x) ** 2 + (ball1.y - ball2.y) ** 2)
  if (distance < ball1.radius + ball2.radius) {
    ball1.speed *= -1
    ball2.speed *= -1

  }
}

/**********************
Charging function
 **********************/
var chargeCounter = 0

function chargeDetection(player, dock) {
  var distance = Math.sqrt((player.x - dock.x) ** 2 + (player.y - dock.y) ** 2)
  if (distance < dock.radius) {
    chargeCounter++
  }
  if (chargeCounter > 30) {
    player.color = dock.color[dock.status]
    chargeCounter = 0
  }

}

/**********************
player motion
 **********************/
document.onkeydown = function (e) {
  e.preventDefault() // stop default behaviour (scrolling)
  // console.log(e.keyCode)
  switch (e.keyCode) {

    case 37: // left
      player.vAngle = -0.1
      break

    case 39: // right
      player.vAngle = 0.1
      break

    case 65: // A
      player2.vAngle = -0.08
      break

    case 68: // D
      player2.vAngle = 0.08
      break
  }


}

document.onkeyup = function (e) {
  switch (e.keyCode) {
    case 37: // left
    case 39: // right
      player.vAngle = 0

    // case 65: // A
    // case 68: // D
    //   player2.vAngle = 0
    //   break
  }


}

/**********************
game over check
 **********************/
function gameOver() {
  if (player.sta)
}


function drawEverything() {
  ctx.clearRect(0, 0, width, height)
  drawBg()
  docker.draw(ctx)

  player.draw(ctx)
  // player2.draw(ctx)

  for (var i = 0; i < ballArrayRed.length; i++) {
    ballArrayRed[i].draw(ctx)
  }

  for (var i = 0; i < ballArrayBlue.length; i++) {
    ballArrayBlue[i].draw(ctx)
  }

  for (var i = 0; i < ballArrayGreen.length; i++) {
    ballArrayGreen[i].draw(ctx)
  }

  for (var i = 0; i < ballArrayYellow.length; i++) {
    ballArrayYellow[i].draw(ctx)
  }

  // coin.draw(ctx)
}

function updateEverything() {

  player.gameOverCheck()
  player.update()
  // player2.update()

  player.collisionWithWall(width, height)
  // player2.collisionWithWall(width, height)

  player.collisionWithObject(ballArrayRed)
  player.collisionWithObject(ballArrayBlue)
  player.collisionWithObject(ballArrayGreen)
  player.collisionWithObject(ballArrayYellow)

  // player2.collisionWithObject(ballArrayRed)
  // player2.collisionWithObject(ballArrayBlue)
  // player2.collisionWithObject(ballArrayGreen)
  // player2.collisionWithObject(ballArrayYellow)


  for (var i = 0; i < ballArrayRed.length; i++) {
    ballArrayRed[i].update()
    ballArrayRed[i].collisionWithWall(width, height)
    ballArrayRed[i].collisionWithObject(ballArrayBlue)
    ballArrayRed[i].collisionWithObject(ballArrayGreen)
    ballArrayRed[i].collisionWithObject(ballArrayYellow)
  }

  for (var i = 0; i < ballArrayBlue.length; i++) {
    ballArrayBlue[i].update()
    ballArrayBlue[i].collisionWithWall(width, height)
    ballArrayBlue[i].collisionWithObject(ballArrayGreen)
    ballArrayBlue[i].collisionWithObject(ballArrayRed)
    ballArrayBlue[i].collisionWithObject(ballArrayYellow)
  }

  for (var i = 0; i < ballArrayGreen.length; i++) {
    ballArrayGreen[i].update()
    ballArrayGreen[i].collisionWithWall(width, height)
    ballArrayGreen[i].collisionWithObject(ballArrayBlue)
    ballArrayGreen[i].collisionWithObject(ballArrayRed)
    ballArrayGreen[i].collisionWithObject(ballArrayYellow)
  }

  for (var i = 0; i < ballArrayYellow.length; i++) {
    ballArrayYellow[i].update()
    ballArrayYellow[i].collisionWithWall(width, height)
    ballArrayYellow[i].collisionWithObject(ballArrayBlue)
    ballArrayYellow[i].collisionWithObject(ballArrayGreen)
    ballArrayYellow[i].collisionWithObject(ballArrayRed)
  }
  // coin.update()

  // edgesCoin(coin)



  // collideBetweenPlayer(player, player2)
  chargeDetection(player, docker)
}

function animation() {
  updateEverything()
  drawEverything()

  // console.log(ball.color)
  window.requestAnimationFrame(animation)

}


animation()