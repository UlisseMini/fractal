precision mediump float;

uniform vec2 u_resolution;

vec2 f(vec2 z, vec2 c) {
  // z^2 + c, written out
  return vec2(z.x*z.x - z.y*z.y, 2.0*z.y*z.x) + c;

  /* z^2 + c written with a matrix multiply
  return c + mat2(
      z.x, z.y,
      -z.y, z.x
  )*z;
  */
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  float color = 0.0;

  // scale to x to (-2.5, 1), and y to (-1, 1)
  // they're already in (0, 1) from dividing by u_resolution
  // TODO: add dynamic zoom
  vec2 c = vec2(uv.x * 3.5 - 2.5, uv.y * 2.0 - 1.0);


  vec2 z = vec2(0.0);
  bool escaped = false;

  int iterations = 0;
  const int maxIterations = 100;
  for (int i = 0; i < maxIterations; i++) {
    iterations = i; // webgl :<(
    z = f(z, c);
    if (length(z) > 2.0) {
      escaped = true;
      break;
    }
  }

  float k = float(iterations)/float(maxIterations);
  if (escaped) {
    gl_FragColor = vec4(0.0, k, 0.0, 1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}
