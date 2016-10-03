var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


loader = new THREE.ColladaLoader();
loader.load('modele/cube.dae', function colladaReady(collada) {
    cube = collada.scene;
    skin = collada.skins[0];
    scene.add(cube);
});

camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

}
render();

render();