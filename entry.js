var THREE = require("three");
var WIDTH = 1200, HEIGHT = 800;
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
var scene = new THREE.Scene();
camera.position.z = 300;
renderer.setSize(WIDTH, HEIGHT);

var container = document.getElementById("container");
container.appendChild(renderer.domElement);

// Shaders and stuff
var vertexShader = require("raw!./vertexShader.glsl");
var fragmentShader = require("raw!./fragment-shader.glsl");

var shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: performance.now() / 1000} ,
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});
var plane = new THREE.Mesh(new THREE.PlaneGeometry(500,300,1), shaderMaterial);
scene.add(plane);

var pointLight = new THREE.PointLight(0xFFFFFF);

pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 300;
scene.add(pointLight);

(function render() {
  requestAnimationFrame(render);
  shaderMaterial.uniforms.time = { value: performance.now() / 1000 };
  renderer.render(scene, camera);
})();
