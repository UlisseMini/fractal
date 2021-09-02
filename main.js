import "./style.css"
import * as twgl from "twgl.js"
import fs from "./fragment-shader.glsl?raw"
import vs from "./vertex-shader.glsl?raw"

const width = document.documentElement.clientWidth
const height = document.documentElement.clientHeight

const canvas = document.createElement('canvas')
canvas.width = width
canvas.height = height
document.body.appendChild(canvas)

const gl = canvas.getContext("webgl")

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],

}

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

function render(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  const uniforms = {
    u_resolution: [gl.canvas.width, gl.canvas.height],
  }
  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo)

  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)

