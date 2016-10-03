var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 300)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var axisHelper = new THREE.AxisHelper(5); //Crée les axes x y z
scene.add(axisHelper); //On ajoute les axes

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

}
render();

render();