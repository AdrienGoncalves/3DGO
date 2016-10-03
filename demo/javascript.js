
var container;

var camera, controls, scene, renderer;


init();
animate();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    scene.add(camera);

    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
    controls.addEventListener('change', render);



    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry(10, 10, 10);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -50;
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
   
    container = document.getElementById('container');
    container.appendChild(renderer.domElement);
	
	

   
   


    window.addEventListener('resize', onWindowResize, false);

    render();
}


function animate() {
   // mesh.rotation.x += .04;
  //  mesh.rotation.y += .02;

    render();
    requestAnimationFrame(animate);
    controls.update();
}

function render() {

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
}