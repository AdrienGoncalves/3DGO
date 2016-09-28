// création de la scène et la caméra
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ajoute une lumière pour voir le cube
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);


// on crée le cube
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('three/examples/textures/crate.gif') });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    /*
    //faire tourner le cube façon régulière
    cube.rotation.x += 0.2;
    cube.rotation.y += 0.2;*/
}
render();