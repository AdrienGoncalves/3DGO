/**
 * Script javascript qui contiendra les initialisations des caméras et des élements 3D
 * @author Maël Le Goff
 */
	var container;
	var width;
	var height;
	
	var camera, scene, controls, renderer;
	
	var plane; // le sol
	
	var clock = new THREE.Clock();
	
	var raycaster = new THREE.Raycaster();
	var projector = new THREE.Projector();
	var directionVector = new THREE.Vector3();
	
	var generalInfosNode;
	var vueInfosNode;
	
	var marker;
	
	var result;
	$.ajax( { //Création de l'objet AJAX
            type: "GET",
            async: false,
            url: 'collada/collada.dae',
            dataType: "xml",
            success: function(data) {
              result = data;
            }
        });
		
	var	right = new THREE.Vector3();
	var	up = new THREE.Vector3();
	var	at = new THREE.Vector3();
	//////////////////////////////////////////////////////////////////////////////////////

	initContainer();
	document.onload = initInformations();
	initCameraScene();
	initLights();
	
	initControls();
	
	initGround();
	initCollada();
	initMarker();
	
	initRenderer();
	
	animate();
	
	//////////////////////////////////////////////////////////////////////////////////////
	
	/*On determine le conteneur du rendu et sa taille*/
	function initContainer() {	
		/*container = document.createElement('div');
		container.setAttribute("id", "rendererArea");
		document.body.appendChild(container);*/
		container=document.getElementById('dessein');
		//document.body.appendChild(container);
		width = container.clientWidth;
		height = container.clientHeight;
	}
	
	/*On determine les zone ou afficher les informations*/
	function initInformations() {	
		generalInfosNode = document.getElementById('nav1'); //Le menu "Informations général"
		vueInfosNode = document.getElementById('nav2'); //Le menu "Informations sur la vue");
	}
	
	/*Initialisation de la scène et d'une camera*/
	function initCameraScene() {		
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0x808080 ); //couleur de fond du rendu
		
		camera = new THREE.PerspectiveCamera( 70, width / height, 1, 10000 );
		camera.position.set(185,185,120);
		scene.add(camera);
	}
	
	/*Initialisation des lumières */
	function initLights() {	
		var ambientLight = new THREE.AmbientLight(0x606060);
        scene.add(ambientLight);
		
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        scene.add(directionalLight);
	}
	
	/**Création d'un controleur de type trackball qui permettra d'effectuer
     * des roation ainsi que des zooms à différente vitesses
     */
	function initControls() {	
		controls = new THREE.TrackballControls( camera,container );	
			controls.rotateSpeed = 2.0;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;
			controls.noZoom = false;
			controls.noPan = true; //pour que le clic droit ne serve à rien pour le trackball
			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.3;
			controls.keys = [65, 83, 68];
		controls.addEventListener('change', render);
	}
	
	/*Initialisation d'un sol pour le rendu*/
	function initGround() {
		plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }));
        plane.name = 'Sol';
		plane.position.set(0,0,0);
		plane.rotation.x = 1.57;
		plane.name = 'Sol';
        scene.add(plane);
	}
	
	/* Charger un fichier Collada */
	function initCollada() {
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load( 'collada/collada.dae', function ( collada ) {
			
			var dae = collada.scene;
			
			dae.position = plane.position //on le pose sur le sol
			dae.scale.set(1.5,1.5,1.5);

			scene.add(dae);
		});
	}
	
	/*Definition du marqueur lorsqu'on clique*/
	function initMarker() {
		marker = new THREE.Mesh( new THREE.SphereGeometry(1), new THREE.MeshLambertMaterial( { color: 0xff0000 } ) );
        scene.add(marker);
	}
	
	/*Initialisation du rendu*/
	function initRenderer() {
		//jouter des aides : les axes et une grille
		// var axes = new THREE.AxisHelper(50);
		// axes.position.set(0,0,0);
		// scene.add(axes);
		// var gridXZ = new THREE.GridHelper(100, 10);
		// gridXZ.position.set(0,0,0 );
		// scene.add(gridXZ);
		
		//Rendu pour collada
		renderer = new THREE.WebGLRenderer( { antialias: false } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( width, height );
		container.appendChild( renderer.domElement );
		
		//Evenement lorsque que l'on clique sur le click droit de la souris dans le container
		container.addEventListener( 'contextmenu', onDocumentRightClick, false );

		window.addEventListener( 'resize', onWindowResize, false );
	}
	
	//////////////////////////////////////////////////////////////////////////////////////


	/*Fonction qui redimensionne la scene quand on redimensionne la fenêtre */
	function onWindowResize() {
		width = container.clientWidth; //pour que le menu de droite reste affiché
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		
		renderer.setSize( width, height );
	}

	/*Fonction qui ajoute une particule à l'endroit cliqué*/
	function onDocumentRightClick( event ) {
		event.preventDefault();
		
		generalInfosNode.innerHTML = '';
		vueInfosNode.innerHTML = '';
		
		//Definition de la zone ou l'utilisateur a cliqué
		var x = ( (event.clientX-container.offsetLeft)/ width ) * 2 - 1;
		var y = - ( event.clientY / height ) * 2 + 1;
		
		//Définition de notre vecteur de direction à ces valeurs initiales
		directionVector.set(x, y, 1);

		//Ne pas projeter
		projector.unprojectVector(directionVector, camera);

		//Soustraire le vecteur représentant la position de la caméra
		directionVector.sub(camera.position);

		//Permet de normalisé le vecteur, pour éviter de grands nombres de la projection et de la soustraction
		directionVector.normalize();

		// On initialise le lancer de rayon (raycaster)
		raycaster.set(camera.position, directionVector);

		// On appel le lancer de rayon
		// (Le second argument signifie "recursif")
		var intersects = raycaster.intersectObjects(scene.children, true);

		if (intersects.length>0) {
			//On positionne le marqueur à l'endroit cliqué
			marker.position.x = intersects[0].point.x;
			marker.position.y = intersects[0].point.y;
			marker.position.z = intersects[0].point.z;
			
			//On affiche les informations
			displayInformations(intersects);
		}
	}
	
	/*Fonction qui affiche les informations spécifiques à l'élément du fichier séléctionné dans les menus*/
	function displayInformations(intersects) {

		/*Parcourir le  fichier collada à la recherche de la balise création*/
		var creation_temp = '';
		var creation = '';
		var creation_temp = $(result).find('created').text();
		if (creation_temp != '') {
			creation = creation_temp.replace("T", " à ");
		}
		
		var target = intersects[0].object;
		generalInfosNode.innerHTML = '<h2>ID: ' + target.id + '</h2>' +
									 '<h2>Date de création: ' + creation + '</h2>';
	}
	
	/*Fonction appelée depuis l'interface qui permet de zoomer*/
	function zoomIn() {
		camera.matrix.extractBasis(right,up,at);
        camera.position.add(at.multiplyScalar(-5));
        camera.matrix.extractBasis(right,up,at);
	}
	
	/*Fonction appelée depuis l'interface qui permet de dézoomer*/
	function zoomOut() {
		camera.matrix.extractBasis(right,up,at);
        camera.position.add(at.multiplyScalar(+5));
        camera.matrix.extractBasis(right,up,at); 
	}

	/*Fonction appelée depuis l'interface qui permet de faire une rotation vers le haut*/
	function moveUp() {
		camera.matrix.extractBasis(right,up,at);
		camera.position.add(up.multiplyScalar(5));
        camera.matrix.extractBasis(right,up,at);  
	}
	
	/*Fonction appelée depuis l'interface qui permet de faire une rotation vers la gauche*/
	function moveLeft() {
		camera.matrix.extractBasis(right,up,at);
        camera.position.add(right.multiplyScalar(-5));
        camera.matrix.extractBasis(right,up,at); 
	}

	/*Fonction appelée depuis l'interface qui permet de faire une rotation vers la droite*/
	function moveRight() {
		camera.matrix.extractBasis(right,up,at);
		camera.position.add(right.multiplyScalar(5));
        camera.matrix.extractBasis(right,up,at); 
	}

	/*Fonction appelée depuis l'interface qui permet de faire une rotation vers le bas*/
	function moveDown() {
		camera.matrix.extractBasis(right,up,at);
		camera.position.add(up.multiplyScalar(-5));
        camera.matrix.extractBasis(right,up,at); 
	}

	function animate(){
		var delta = clock.getDelta();
		requestAnimationFrame( animate );
		controls.update();
		render(delta);
	}

	function render(delta){			
		camera.lookAt( scene.position );
		renderer.render( scene, camera );
	}