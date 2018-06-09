uniform float time;

void main() {
  float uvx = sin(gl_FragCoord.x / 900.0);
  float uvy = sin(gl_FragCoord.y / 1400.0);

  gl_FragColor = vec4(uvx,  // R
                      uvy,  // G
                      sin(time),  // B
                      1.0); // A
}
