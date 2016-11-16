/**
 * Script javascript qui contiendra les initialisations des caméras et des élements 3D 
 */

	var container;
	var width;
	var height;
	
	var camera;
	var scene;
	
	var controls;
	
	var objects = [];
	
	var raycaster;
	var mouse;
	
	var renderer;

	//////////////////////////////////////////////////////////////////////////////////////

	initContainer();
	initCameraScene();
	initControls();
	//initCollada();
	initObjects();
	initParticle();
	initLights();
	initRayCaster();
	initRenderer();
	
	animate();
	
	//////////////////////////////////////////////////////////////////////////////////////
	
	/*On determine le conteneur du rendu et sa taille*/
	function initContainer() {	
		container = document.createElement('div');
		container.setAttribute("id", "rendererArea");
		document.body.appendChild( container );
		
		width = container.clientWidth;
		height = container.clientHeight;
	}
	
	/*Initialisation d'une camera classique et de la scène*/
	function initCameraScene() {		
		camera = new THREE.PerspectiveCamera( 70, width / height, 1, 10000 );
		camera.position.z = 500;
		scene = new THREE.Scene();
	}
	
	/**Création d'un controleur de type trackball qui permettra d'effectuer
     * des roation ainsi que des zooms à différente vitesses
     */
	function initControls() {	
		controls = new THREE.TrackballControls( camera,container );	
			controls.rotateSpeed = 7.0;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.noZoom = false;
			controls.noPan = false;
			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.3;
			controls.keys = [65, 83, 68];
		controls.addEventListener('change', render);
	}
	
	/* Charger un fichier Collada */
	function initCollada() {
		/*Rendu spécial précédemment utilisé*/
		/*renderer = new THREE.WebGLRenderer();
		renderer.setSize(WIDTH, HEIGHT);
		document.body.appendChild(renderer.domElement);
		camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.9, 10000);
		camera.position.set(30,30,30);
		scene.add(camera);*/

		
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load( 'models/UTBM-Mieg.dae', function ( collada ) {
			var dae = collada.scene;
			var skin = collada.skins[ 0 ];
			dae.position.set(0,0,0);
			dae.scale.set(1.5,1.5,1.5);
			scene.add(dae);
			/*Le definir comme cliquable*/
			//objects.push(dae);
		});
	}
	
	/*Initialisation des objets qui seront dans la scene*/
	function initObjects() {
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
	}
	
	/*Definition des particules lorsqu'on clique*/
	function initParticle() {	
		particleMaterial = new THREE.SpriteCanvasMaterial( {
			color: 0x000000,
			program: function ( context ) {
				context.beginPath();
				context.arc( 0, 0, 0.5, 0,Math.PI * 2, true );
				context.fill();
			}
		} );
	}
	
	/* Initialisation des lumières */
	function initLights() {	
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
	}
	
	/*Création du Raycaster*/
	function initRayCaster() {
		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();
	}
	
	/*Initialisation du rendu*/
	function initRenderer() {
		/* Ajouter des aides : les axes et une grille
		var axes = new THREE.AxisHelper(50);
		axes.position = dae.position;
		scene.add(axes);
		var gridXZ = new THREE.GridHelper(100, 10);
		gridXZ.setColors( new THREE.Color(0x8f8f8f), new THREE.Color(0x8f8f8f);
		gridXZ.position.set(0,0,0 );
		scene.add(gridXZ);*/
		//});
		
		renderer = new THREE.CanvasRenderer();
			renderer.setClearColor( 0xf0f0f0 );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( width, height );
		container.appendChild( renderer.domElement );
		
		/*Evenement lorsque que l'on clique sur le bouton gauche de la souris*/
		document.addEventListener( 'mousedown', onDocumentMouseDown, false );

		window.addEventListener( 'resize', onWindowResize, false );
	}
	
	//////////////////////////////////////////////////////////////////////////////////////


	/*Fonction qui redimensionne la scene quand on redimensionne la fenêtre */
	function onWindowResize() {
		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize( width, height );
	}

	/*Fonction qui ait appelé lorsque que l'on clique sur le bouton gauche de la souris*/
	function onDocumentMouseDown( event ) {
		event.preventDefault();
		
		/*Definition de la zone ou l'utilisateur a cliqué*/
		mouse.x = ( event.clientX / width ) * 2 - 1;
		mouse.y = - ( event.clientY / height ) * 2 + 1;
		
		/*On effectue le lancé de rayons*/
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
		camera.lookAt( scene.position );
		renderer.render( scene, camera );
	}