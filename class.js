/**********************
Ball class
 **********************/
class Ball {
  constructor(x, y, radius, color, vx, vy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.vx = vx
    this.vy = vy
  }

  draw(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius - 5, 0, Math.PI * 2, true)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius - 10, 0, Math.PI * 2, true)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }

  update() {
    this.x += this.vx
    this.y += this.vy
  }

  collisionWithWall(width, height) {
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.vy *= -1
    }
    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.vx *= -1
    }
  }

  collisionWithObject(array) {
    for (var i = 0; i < array.length; i++) {
      var distance = Math.sqrt((this.x - array[i].x) ** 2 + (this.y - array[i].y) ** 2)
      if (distance < this.radius + array[i].radius) {
        this.vx *= -1
        this.vy *= -1
        array[i].vx *= -1
        array[i].vy *= -1
      }

    }
  }

}

/**********************
Player class
 **********************/
class Player {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = '#DCDCDC'
    this.speed = 5
    this.angle = 0
    this.vAngle = 0
    this.point = 0
    this.health = 3
    this.gameOver = 'false'
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.beginPath()
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true)
    ctx.fillStyle = '#f4f4f4'
    ctx.fill()
    ctx.moveTo(0, 0 - this.radius)
    ctx.lineTo(0, 0 + this.radius)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5
    ctx.stroke()


    ctx.beginPath()
    ctx.arc(0 - 6, 0, this.radius - 12, Math.PI * 3 / 2, Math.PI / 2, true)
    ctx.fillStyle = this.color
    ctx.fill()

    ctx.beginPath()
    ctx.arc(0 + 6, 0, this.radius - 12, Math.PI / 2, Math.PI * 3 / 2, true)
    ctx.fillStyle = this.color
    ctx.fill()

    ctx.restore()
  }

  update() {
    if (this.gameOver == 'false') {
      this.angle += this.vAngle
      this.y += this.speed * Math.cos(this.angle)
      this.x += -this.speed * Math.sin(this.angle)
    } else {
      this.speed = this.speed + 0.3
      this.y = this.y + this.speed
    }
  }

  collisionWithObject(array) {
    for (var i = 0; i < array.length; i++) {
      var distance = Math.sqrt((this.x - array[i].x) ** 2 + (this.y - array[i].y) ** 2)
      if (distance < this.radius + array[i].radius) {
        this.speed *= -1
        array[i].vx *= -1
        array[i].vy *= -1

        if (this.color == array[i].color) {
          this.point++
          console.log('point' + this.point)
        } else {
          this.health--
          console.log('health' + this.health)
        }
      }
    }
  }
  collisionWithWall(width, height) {
    if (this.gameOver == 'false') {
      if (this.y + this.radius > height || this.y - this.radius < 0) {
        this.speed *= -1
      }
      if (this.x + this.radius > width || this.x - this.radius < 0) {
        this.speed *= -1
      }
    }
  }

  gameOverCheck() {
    if (this.health <= 0) {
      this.gameOver = 'true'
    }
  }


}

/**********************
Coin class
 **********************/
class Coin {
  constructor(imgSrc, width, height, x, y, numberOfFrame) {
    this.image = new Image()
    this.image.src = imgSrc
    this.width = width
    this.height = height
    this.x = x
    this.y = y - this.height / 2


    this.numberOfFrame = numberOfFrame
    this.tickPerFrame = 0
    this.frameIndex = 0
    this.vx = 1
    this.vy = .5
  }

  draw(ctx) {
    ctx.save()
    ctx.drawImage(this.image, (this.frameIndex % this.numberOfFrame) * this.width / this.numberOfFrame, 0, this.width / this.numberOfFrame, this.height, this.x, this.y, this.width / this.numberOfFrame, this.height)

    this.tickPerFrame++
    if (this.tickPerFrame % 4 == 0) {
      this.frameIndex++

    }
    ctx.restore()

  }

  update() {
    this.x += this.vx
    this.y += this.vy
  }


}

/**********************
Charging Dock class
 **********************/
class Dock {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = {
      normal: 'white',
      red: 'red',
      green: 'green',
      blue: 'blue',
      yellow: 'yellow'
    }
    this.status = 'red'
  }
  draw(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fillStyle = this.color[this.status]
    ctx.fill()
    ctx.restore()

  }
}

class middleDock {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }


}
