const THREE = require("three");
const WIDTH = 400
const HEIGHT = 400;
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
camera.position.z = 300;

const scene = new THREE.Scene();
window.scene = scene;
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 300;
window.scene.add(pointLight);

const container = document.getElementById("container");
const vertexShader = require("raw!./vertexShader.glsl");

container.appendChild(renderer.domElement);

const addShaderToScene = (shader) => {
  console.log(shader);
  window.shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {time: {value: performance.now() / 1000}},
    vertexShader: vertexShader,
    fragmentShader: shader,
  });
  // Shaders and stuff
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(500,300,1),
    window.shaderMaterial
  );
  window.scene.add(plane);
}

const fragmentShader = require("raw!./fragment-shader.glsl");
addShaderToScene(fragmentShader)
const textArea = document.getElementById("shader");
textArea.innerHTML = fragmentShader;
const button = document.getElementById("submit");
button.onclick = () => {
  addShaderToScene(textArea.value);
};


(function render() {
  requestAnimationFrame(render);
  window.shaderMaterial.uniforms.time = { value: performance.now() / 1000 };
  renderer.render(window.scene, camera);
})();
