import "./style.css"

class Complex {
  constructor(re, im) {
    this.re = re
    this.im = im
  }

  mul(other) {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.im * other.re + this.re * other.im,
    )
  }
  add(other) {
    return new Complex(this.re + other.re, this.im + other.im)
  }

  magSquared() {
    return this.re ** 2 + this.im ** 2
  }
}


const width = document.documentElement.clientWidth
const height = document.documentElement.clientHeight


const canvas = document.createElement('canvas')
canvas.width = width
canvas.height = height
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
ctx.fillStyle = 'black'
ctx.fillRect(0, 0, width, height)


const maxIter = 100

let c = new Complex(-1, 1)
let z = new Complex(0, 0)

for (let Px = 0; Px < width; Px++) {
  for (let Py = 0; Py < height; Py++) {
    let x = Px * (3.5 / width) - 2.5 // scale to (-2.5, 1)
    let y = Py * (2 / height) - 1   // scale to (-1, 1)

    let c = new Complex(x, y)

    let z = new Complex(0, 0)
    let iteration = 0
    // Any z with magnitude greater then 2 definitely diverges, this comes from
    // the triangle inequality, see http://mrob.com/pub/muency/escaperadius.html
    while (iteration < maxIter && z.magSquared() < 4) {
      z = z.mul(z).add(c)
      iteration += 1
    }
    const k = (iteration / maxIter)
    ctx.fillStyle = `rgb(${255 * k}, 0, 0)`
    ctx.fillRect(Px, Py, 1, 1)
  }
}
