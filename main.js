var bounceSound = new Audio('sounds/zapsplat_cartoon_boing_ascend_jaw_harp_008_24206 (1).ogg')
bounceSound.load()

var crashSound = new Audio('sounds/zapsplat_leisure_rubber_ball_heavy_bounce_wood_22102.ogg')
crashSound.load()

var pointSound = new Audio('sounds/zapsplat_multimedia_game_collect_point_004_24876.ogg')
pointSound.load()

var gameOverSound = new Audio('sounds/music_david_gwyn_jones_the_moonpool_instrumental.ogg')
gameOverSound.load()


var backgroundSound = new Audio('sounds/music_zapsplat_above_the_clouds_100/jes_smith_music_it_takes_one.ogg')
backgroundSound.load()

var startSound = new Audio('sounds/music_zapsplat_above_the_clouds_100/music_zapsplat_above_the_clouds_100.ogg')
startSound.load()

var levelSound = new Audio('sounds/lesser_vibes_Impacts_and_Hits_Exploding_Fairy_01_061.ogg')

backgroundSound.play()
backgroundSound.loop = true
/**********************
Start button and instruction animation
 **********************/
$("#start-game-btn").click(function () {


  $('.box').html('<span class="instruction">The goal is simple</span>')
  setTimeout(function () {
    $('.box').html('<span class="instruction">Every 15 seconds the color in the middle changes</span>')
  }, 2000)

  setTimeout(function () {
    $('.box').html('<span class="instruction">Stay in the middle for a short time to change your color</span>')
    // restart()
  }, 4000)

  setTimeout(function () {
    $('.box').html('<span class="instruction">Use left and right button to BOUNCE around</span>')
    // restart()
  }, 7000)

  setTimeout(function () {
    $('.box').html('<span class="instruction">POUNCE on the ball with the same color as the background to earn point.</span>')
    // restart()
  }, 11000)

  setTimeout(function () {
    $('.box').html('<span class="instruction">Ready?</span>')
  }, 15000)

  setTimeout(function () {
    $('#game-board').find('.box').remove()
    $('#canvas1').css('display', 'block')
    $('#canvas2').css('display', 'block')
    $('#canvas3').css('display', 'block')
    // restart()
    // $('#game-board').append('<canvaswidth="700" height="700"></canvas>')

    backgroundSound.pause()
    start()

  }, 17000)
});

/**********************
  Restart button
  **********************/
function start(){
startSound.play()
startSound.loop = true

$('#restart').click(function () {
  restart()
  
  $('#restart').removeClass('delay')
  startSound.play()
  gameOverSound.pause()
  gameOverSound.currentTime = 0
  
})

/**********************
  HP bar
  **********************/
var canvasHealth = document.querySelector('#canvas2')
var ctxHealth = canvasHealth.getContext('2d')




function drawHealth() {
  ctxHealth.save()
  ctxHealth.beginPath();
  ctxHealth.arc(100, 100, 70, 0, Math.PI * 2, true);
  ctxHealth.fillStyle = 'red'
  ctxHealth.fill();
  ctxHealth.strokeStyle = 'black'
  ctxHealth.stroke()

  ctxHealth.globalAlpha = 0.4
  for (i = 0; i < 5; i++) {
    ctxHealth.beginPath();
    ctxHealth.arc(100, 100, 14 * i, 0, Math.PI * 2, true);
    ctxHealth.fillStyle = 'yellow'
    ctxHealth.fill();
  }

  ctxHealth.globalAlpha = 1
  for (i = 0; i < 6 - playerArray[0].health; i++) {
    ctxHealth.beginPath();
    ctxHealth.arc(100, 100, 14 * i, 0, Math.PI * 2, true);
    ctxHealth.fillStyle = 'black'
    ctxHealth.fill();
  }
  ctxHealth.restore()
}


/**********************
 Score board
 **********************/
var canvasScore = document.querySelector('#canvas3')
var ctxScore = canvasScore.getContext('2d')

function drawScore() {
  ctxScore.save()
  ctxScore.beginPath();
  ctxScore.arc(100, 100, 70, 0, Math.PI * 2, true);
  ctxScore.fillStyle = '#007E00'
  ctxScore.fill();
  ctxScore.strokeStyle = 'black'
  ctxScore.stroke()

  ctxScore.globalAlpha = 0.5


  for (i = 0; i <= playerArray[0].point % 5; i++) {
    ctxScore.beginPath();
    ctxScore.arc(100, 100, 14 * i, 0, Math.PI * 2, true);
    ctxScore.fillStyle = '#FFFD42'
    ctxScore.fill();
  }

  ctxScore.save()
  ctxScore.globalAlpha = 1
  ctxScore.textAlign = 'center';
  ctxScore.fillStyle = '#f4f4f4';
  ctxScore.font = 'bold 40px Baloo Thambi';
  ctxScore.strokeStyle = '#003400';
  ctxScore.lineWidth = 5;

  ctxScore.strokeText(String(playerArray[0].point), 100, 112);
  ctxScore.fillText(String(playerArray[0].point), 100, 112);
  ctxScore.restore()




  ctxScore.restore()
}



/**********************
 Defining all the variables of canvas
 **********************/
var canvas = document.querySelector('#canvas1')
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

  } else if (docker.status == 'grey') {
    ctx.save()
    ctx.fillStyle = '#191919';
    ctx.fillRect(0, 0, 350, 350);
    ctx.fillStyle = '#3A3A3A';
    ctx.fillRect(350, 0, 350, 350);
    ctx.fillStyle = '#656565';
    ctx.fillRect(0, 350, 350, 350);
    ctx.fillStyle = '#A9A9A9';
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
var colorInterval;

// function intervalColor(colorInterval) {
//   clearInterval(colorInterval)

colorInterval = setInterval(function () {
  docker.status = colorArray[colorCounter % 4]
  colorCounter++
  drawBg()
  chargeCounter = 0
  for (var i = 0; i < playerArray.length; i++) {
    playerArray[i].color = '#DCDCDC'
  }
  // console.log(colorInterval)
  console.log('change')
}, 15000)
// }


/**********************
Creating the balls and object
 **********************/
var ballArrayRed = []
var ballArrayBlue = []
var ballArrayGreen = []
var ballArrayYellow = []
var ballspeedX = 2.5
var ballspeedY = 2
var ballInterval;

function intervalBall(ballInterval) {
  clearInterval(ballInterval)

  ballInterval = setInterval(function () {
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

}


/**********************
 Creating the player
 **********************/
var playerArray = []
var positionX = 50
function checkPlayer() {
  if (playerArray.length < 1)
    playerArray.push(new Player(positionX, 250, 25))
  positionX = positionX + 600
}
// playerArray.push(new Player(150, 250, 25))

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
function collideBetweenPlayer(playerArray) {
  if (playerArray[0].gameOver == 'false' && playerArray[1].gameOver == 'false') {
    var distance = Math.sqrt((playerArray[0].x - playerArray[1].x) ** 2 + (playerArray[0].y - playerArray[1].y) ** 2)
    if (distance < playerArray[0].radius + playerArray[1].radius) {
      playerArray[0].speed *= -1
      playerArray[1].speed *= -1

    }
  }
}


// function cooldown(playerArray) {
//   for (let i = 0; i < playerArray.length; i++) {
//     // console.log(playerArray[i].justCollide)
//     if (playerArray[i].justCollide == 'true') {
//       // let player = playerArray[i];
//       setTimeout(function () {
//         playerArray[i].justCollide = 'false'
//         // console.log(playerArray[i].justCollide)
//       }, 50)
//     }
//   }
// }
/**********************
Charging function
 **********************/
var chargeCounter = 0

function chargeDetection(playerArray, dock) {
  for (var i = 0; i < playerArray.length; i++) {
    var distance = Math.sqrt((playerArray[i].x - dock.x) ** 2 + (playerArray[i].y - dock.y) ** 2)
    if (distance < dock.radius) {
      chargeCounter++
    }
    if (chargeCounter > 30) {
      playerArray[i].color = dock.color[dock.status]
      chargeCounter = 0
    }
  }
}

/**********************
player motion
 **********************/
document.onkeydown = function (e) {
  e.preventDefault() // stop default
  switch (e.keyCode) {

    case 37: // left
      playerArray[0].vAngle = -0.1
      break

    case 39: // right
      playerArray[0].vAngle = 0.1
      break

    case 13:
      restart()
      $('#restart').removeClass('delay')
      startSound.play()
      gameOverSound.pause()
      gameOverSound.currentTime = 0
      break
    // case 65: // A
    //   playerArray[1].vAngle = -0.08
    //   break

    // case 68: // D
    //   playerArray[1].vAngle = 0.08
    //   break
  }


}

document.onkeyup = function (e) {
  switch (e.keyCode) {
    case 37: // left
    case 39: // right
      playerArray[0].vAngle = 0

    // case 65: // A
    // case 68: // D
    //   playerArray[1].vAngle = 0
    //   break
  }


}

/**********************
game over check
 **********************/
function gameOver(playerArray) {
  if (playerArray.filter(player => player.gameOver == 'true').length == playerArray.length) {
    ballArrayBlue.forEach(function (ball) {
      ball.gameOver = 'true'
    })

    ballArrayYellow.forEach(function (ball) {
      ball.gameOver = 'true'
    })

    ballArrayGreen.forEach(function (ball) {
      ball.gameOver = 'true'
    })

    ballArrayRed.forEach(function (ball) {
      ball.gameOver = 'true'


    })
    clearInterval(colorInterval)
    docker.status = 'grey'
    drawBg()

    $('#restart').addClass('delay')
    // $('#restart').css('right', '295px')
    
    startSound.pause()
    startSound.currentTime = 0
    gameOverSound.play()
    
   
    return true
  } return false
}

/**********************
restart game
 **********************/
function restart() {
  clearInterval(colorInterval)
  //clear all array
  playerArray = []
  ballArrayBlue = []
  ballArrayGreen = []
  ballArrayRed = []
  ballArrayYellow = []
  // restarting the setInterval
  intervalBall(ballInterval)
  positionX = 50
  // intervalColor(colorInterval)
  colorInterval = setInterval(function () {
    docker.status = colorArray[colorCounter % 4]
    colorCounter++
    drawBg()
    chargeCounter = 0
    for (var i = 0; i < playerArray.length; i++) {
      playerArray[i].color = '#DCDCDC'
    }
    console.log('change too')
  }, 15000)
  // counters to 0
  chargeCounter = 0
  colorCounter = 0
  //create new player
  checkPlayer()
  //reset background
  docker.status = 'red'
  drawBg()
}

/**********************
draw everything
 **********************/


 
function drawEverything() {
  ctx.clearRect(0, 0, width, height)
  drawBg()
  docker.draw(ctx)
  drawHealth()
  drawScore()

  playerArray.forEach(function (player) {
    player.draw(ctx)
  })

  ballArrayRed.forEach(function (ball) {
    ball.draw(ctx)
  })

  ballArrayGreen.forEach(function (ball) {
    ball.draw(ctx)
  })

  ballArrayBlue.forEach(function (ball) {
    ball.draw(ctx)
  })

  ballArrayYellow.forEach(function (ball) {
    ball.draw(ctx)
  })

}

function updateEverything() {


  intervalBall(ballInterval)
  checkPlayer()
  gameOver(playerArray)

  if (playerArray.length > 1) {
    collideBetweenPlayer(playerArray)
  }

  playerArray.forEach(function (player) {
    player.gameOverCheck()
    player.update()
    player.collisionWithWall(width, height)
    player.collisionWithObject(ballArrayRed)
    player.collisionWithObject(ballArrayBlue)
    player.collisionWithObject(ballArrayGreen)
    player.collisionWithObject(ballArrayYellow)
    // if (playerArray.length > 1) { player.collisionWithPlayer(playerArray) }
  })


  for (var i = 0; i < ballArrayRed.length; i++) {
    ballArrayRed[i].update()
    ballArrayRed[i].collisionWithWall(width, height)
    ballArrayRed[i].collisionWithObject(ballArrayBlue)
    ballArrayRed[i].collisionWithObject(ballArrayGreen)
    ballArrayRed[i].collisionWithObject(ballArrayYellow)
    ballArrayRed[i].speedUpdate(playerArray) 
  }

  for (var i = 0; i < ballArrayBlue.length; i++) {
    ballArrayBlue[i].update()
    ballArrayBlue[i].collisionWithWall(width, height)
    ballArrayBlue[i].collisionWithObject(ballArrayGreen)
    ballArrayBlue[i].collisionWithObject(ballArrayRed)
    ballArrayBlue[i].collisionWithObject(ballArrayYellow)
    ballArrayBlue[i].speedUpdate(playerArray) 

  }

  for (var i = 0; i < ballArrayGreen.length; i++) {
    ballArrayGreen[i].update()
    ballArrayGreen[i].collisionWithWall(width, height)
    ballArrayGreen[i].collisionWithObject(ballArrayBlue)
    ballArrayGreen[i].collisionWithObject(ballArrayRed)
    ballArrayGreen[i].collisionWithObject(ballArrayYellow)
    ballArrayGreen[i].speedUpdate(playerArray) 
  }

  for (var i = 0; i < ballArrayYellow.length; i++) {
    ballArrayYellow[i].update()
    ballArrayYellow[i].collisionWithWall(width, height)
    ballArrayYellow[i].collisionWithObject(ballArrayBlue)
    ballArrayYellow[i].collisionWithObject(ballArrayGreen)
    ballArrayYellow[i].collisionWithObject(ballArrayRed)
    ballArrayYellow[i].speedUpdate(playerArray) 
  }

  chargeDetection(playerArray, docker)
}

function animation() {
  updateEverything()
  drawEverything()
 
  window.requestAnimationFrame(animation)

}
animation()
// setInterval(function () {
//   updateEverything()
//   drawEverything()
// }, 1000 / 60)
}
