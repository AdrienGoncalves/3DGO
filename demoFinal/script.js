var scene, camera, renderer, controls;


init();
animate();


function init() {

	scene = new THREE.Scene();
	var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);
	camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.9, 10000);
	camera.position.set(30,30,30);
	scene.add(camera);

	/* redimensionner la scene quand on redimensionne la fenêtre */
	window.addEventListener('resize', function() {
		var WIDTH = window.innerWidth,
		HEIGHT = window.innerHeight;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});

	/* Ajout de deux lumières */
	var light = new THREE.PointLight(0xfffff3, 0.8);
	light.position.set(-100,100,100);
	scene.add(light);
	var sphereSize = 1;
	var pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
	scene.add(pointLightHelper);

	var light2 = new THREE.PointLight(0xfffff3, 0.8);
	light2.position.set(100,-100,-100);
	scene.add(light2);
	var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize );
	scene.add(pointLightHelper2);

	/* Charger un fichier Collada */
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'models/cube.dae', function ( collada ) {
		var dae = collada.scene;
		var skin = collada.skins[ 0 ];
		dae.position.set(0,0,0);
		dae.scale.set(1.5,1.5,1.5);
		scene.add(dae);
		
		/*Ajout du control à la souris*/
    controls = new THREE.TrackballControls( camera );
		controls.rotateSpeed = 50.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;
		controls.keys = [65, 83, 68];
		controls.addEventListener('change', render);

  	scene = new THREE.Scene();
		/* Ajouter des aides : les axes et une grille*/
		var axisHelper = new THREE.AxisHelper(5);//Crée les axes x y z
		scene.add(axisHelper);//On ajoute les axes
		/*var gridXZ = new THREE.GridHelper(100, 10);
		gridXZ.setColors( new THREE.Color(0x8f8f8f), new THREE.Color(0x8f8f8f);
		gridXZ.position.set(0,0,0 );
		scene.add(gridXZ);*/
	});
}



function animate() {
	renderer.render(scene, camera);
	requestAnimationFrame( animate );
  controls.update();
}
