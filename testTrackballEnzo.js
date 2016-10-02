var camera, controls, scene, renderer;



function init() {

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    /*controls = new THREE.TrackballControls(camera);
    controls.addEventListener('change', render);*/

    scene = new THREE.scene();

    var geometry = new THREE.CubeGeometry(100, 100, 100);
    var material = new THREE.MeshNormalMaterial();

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    //controls.update();
}

function render() {
    renderer.render(scene, camera);
}

init();
animate();
