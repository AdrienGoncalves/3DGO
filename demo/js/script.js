 var camera, controls, scene, renderer;
 init();
 animate();

 function init() {
     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000); //init de la camera
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

     var lightAmb = new THREE.AmbientLight(0xffffff); //light
     scene.add(lightAmb);

     var geometry = new THREE.CubeGeometry(100, 100, 100); // forme 
     var material = new THREE.MeshNormalMaterial();  //material
     var cube = new THREE.Mesh(geometry, material); //init cube
     scene.add(cube); //ajout du cube à la scène
     renderer = new THREE.WebGLRenderer();
     renderer.setSize(window.innerWidth, window.innerHeight)
     document.body.appendChild(renderer.domElement); // permet d'intégrer la fenêtre de rendu dans la page HTML

     window.addEventListener('resize', onWindowResize, false); //event => ajuste la taille de la fenêtre
 }

 function animate() {
     requestAnimationFrame(animate); 
     controls.update();
 }

 function render() {
     renderer.render(scene, camera); 
 }

 function onWindowResize() { // fonction pour ajuster la scène à la taille de la fenêtre
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
     controls.handleResize();
     render();
 }