uniform float time;

void main() {
  float uvx = sin(gl_FragCoord.x / 100.0);
  float uvy = sin(gl_FragCoord.y / 300.0);

  gl_FragColor = vec4(uvx,  // R
                      uvy,  // G
                      uvx / uvy,  // B
                      1.0); // A
}
