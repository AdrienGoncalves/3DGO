var camera
var controls
var scene
var renderer;

var container;
var raycaster;
var mouse;
var objects = [];

var WIDTH = window.innerWidth-((window.innerWidth*18)/100); //taille de la fenetre - la largeur de l'interface (18%)
var HEIGHT = window.innerHeight; //hauteur de la fenetre

init();
animate();

function init() {
	container = document.createElement( 'div' ); //créer une div "container"
	document.body.appendChild( container ); //TOUJOURS PAS COMPRIS CE A QUOI CELA SERVAIT
	
	/*Initialisation de la camera*/
	camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 10000 );
	camera.position.set( 0, 300, 500 );
	
	/*Initialisation de la scène*/
	scene = new THREE.Scene();
	

	/*renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);
	camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.9, 10000);
	camera.position.set(30,30,30);
	scene.add(camera);*/

	/* Charger un fichier Collada */
	/*var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'models/UTBM-Mieg.dae', function ( collada ) {
		var dae = collada.scene;
		var skin = collada.skins[ 0 ];
		dae.position.set(0,0,0);
		dae.scale.set(1.5,1.5,1.5);
		scene.add(dae);
		/*Le definir comme cliquable*/
		//objects.push(dae);
	
	/*Cube orange*/
	var geometry = new THREE.BoxGeometry( 100, 100, 100 );
	var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color:0xffa500, opacity: 0.5 } ) );
		scene.add(object);
		objects.push(object);
	
	/*Cube vert*/
	var geometry2 = new THREE.BoxGeometry( 100, 100, 100 );
	var object2 = new THREE.Mesh( geometry2, new THREE.MeshBasicMaterial( { color:0x00ff00, opacity: 0.5 } ) );
	object2.position.z = 0-200;
		scene.add(object2);
		objects.push(object2);
	
	/*Definition des particules lorsqu'on clique*/
	particleMaterial = new THREE.SpriteCanvasMaterial( {
		color: 0x000000,
		program: function ( context ) {
			context.beginPath();
			context.arc( 0, 0, 0.5, 0,Math.PI * 2, true );
			context.fill();
		}
	} );
	
	/* Initialisation du TrackBall */
    controls = new THREE.TrackballControls( camera );	
		controls.rotateSpeed = 7.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;
		controls.keys = [65, 83, 68];
	controls.addEventListener('change', render);

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

	/* Ajouter des aides : les axes et une grille
	var axes = new THREE.AxisHelper(50);
	axes.position = dae.position;
	scene.add(axes);
	var gridXZ = new THREE.GridHelper(100, 10);
	gridXZ.setColors( new THREE.Color(0x8f8f8f), new THREE.Color(0x8f8f8f);
	gridXZ.position.set(0,0,0 );
	scene.add(gridXZ);*/
	//});
	
	/*Création du Raycaster*/
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	renderer = new THREE.CanvasRenderer();
		renderer.setClearColor( 0xf0f0f0 );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( WIDTH, HEIGHT );

	container.appendChild( renderer.domElement ); //TOUJOURS PAS COMPRIS CE A QUOI CELA SERVAIT

	document.addEventListener( 'mousedown', onDocumentMouseDown, false ); //COMPREND MOUSEDOWN 
	document.addEventListener( 'touchstart', onDocumentTouchStart, false ); //COMPREND PAS TOUCHSTART

	window.addEventListener( 'resize', onWindowResize, false );
}

/*Fonction qui redimensionne la scene quand on redimensionne la fenêtre */
function onWindowResize() {
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();

	renderer.setSize( WIDTH, HEIGHT );
}

/*Fonction qui ait appelé lorsque que l'on appuie sur le clic souris*/ //APPROXIMATIF
function onDocumentTouchStart( event ) {
	event.preventDefault();

	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;
	onDocumentMouseDown( event );

}

/*Fonction qui ait appelé lorsque que l'on clic sur le clic gauche de la souris*/ //APPROXIMATIF
function onDocumentMouseDown( event ) {
	event.preventDefault();
	
	/*Definition de la zone ou l'utilisateur a cliqué*/
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
	
	/*on effectue le lancé de rayons*/
	raycaster.setFromCamera( mouse, camera );
	
	/*Contient la distance avec l'objet le plus proche*/
	var intersects = raycaster.intersectObjects( objects );
	
	/*Lorsque le rayon est en contact avec un objet on afficher une particule a cet endroit*/
	if ( intersects.length > 0 ) {
		var particle = new THREE.Sprite( particleMaterial );
		particle.position.copy( intersects[ 0 ].point );
		particle.scale.x = particle.scale.y = 16;
		scene.add( particle );
	}
}

function animate(){
	requestAnimationFrame( animate );
	controls.update();
	render();
}

function render(){			
	renderer.render( scene, camera );
}