import "./style.css"
import * as twgl from "twgl.js"

const width = document.documentElement.clientWidth
const height = document.documentElement.clientHeight

const canvas = document.createElement('canvas')
canvas.width = width
canvas.height = height
document.body.appendChild(canvas)

const gl = canvas.getContext("webgl")

async function loadVertexShader() {
  const resp = await fetch('/vertex-shader.glsl')
  const source = await resp.text()

  const el = document.createElement('script')
  el.type = 'notjs'
  el.id = 'vs'
  el.textContent = source

  document.body.appendChild(el)

  return el
}

async function loadFragmentShader() {
  const resp = await fetch('/fragment-shader.glsl')
  const source = await resp.text()

  const el = document.createElement('script')
  el.type = 'notjs'
  el.id = 'fs'
  el.textContent = source

  document.body.appendChild(el)

  return el
}

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],

}

// global variables, woo!
let programInfo = null
let bufferInfo = null

function start() {
  programInfo = twgl.createProgramInfo(gl, ["vs", "fs"])

  bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

  window.requestAnimationFrame(render)
}

function render(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  const uniforms = {
    time: time * 0.001,
    resolution: [gl.canvas.width, gl.canvas.height],
  }
  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo)

  window.requestAnimationFrame(render)
}

Promise.all([loadFragmentShader(), loadVertexShader()]).then(start)


/*
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
*/
