 var camera, controls, scene, renderer;
 init();
 animate();

 function init() {
     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
     camera.position.z = 500;

     controls = new THREE.TrackballControls(camera);
     controls.addEventListener('change', render);
     controls.rotateSpeed = 5.0;
     controls.zoomSpeed = 1.2;
     controls.panSpeed = 0.8;
     controls.noZoom = false;
     controls.noPan = false;
     controls.staticMoving = true;
     controls.dynamicDampingFactor = 0.3;
     controls.keys = [65, 83, 68];
     scene = new THREE.Scene();

     var lightAmb = new THREE.AmbientLight(0xffffff);
     scene.add(lightAmb);

     var geometry = new THREE.CubeGeometry(100, 100, 100);
     var material = new THREE.MeshNormalMaterial();
     var cube = new THREE.Mesh(geometry, material);
     scene.add(cube);
     renderer = new THREE.WebGLRenderer();
     renderer.setSize(window.innerWidth, window.innerHeight)
     document.body.appendChild(renderer.domElement);
 }

 function animate() {
     requestAnimationFrame(animate);
     controls.update();
 }

 function render() {
     renderer.render(scene, camera);
 }