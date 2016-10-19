var container;
var views, scene, renderer;
var mesh, group1, group2, group3, light;
var mouseX = 0, mouseY = 0;
var windowWidth, windowHeight;
var views = [
    { //1
        left: 0,
        bottom: 0,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color().setRGB(0.5, 0.5, 0.7),
        eye: [1800, 600, 300],
        up: [0, 1, 0],
        fov: 30,
        updateCamera: function (camera, scene, mouseX, mouseY) {
            camera.position.x += mouseX * 0.05;
            camera.position.x = Math.max(Math.min(camera.position.x, 2000), -2000);
            camera.lookAt(scene.position);
        }
    },

    {//2
        left: 0,
        bottom: 0.5,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color().setRGB(0.8, 0.6, 0.7),
        eye: [800, 800, 300],
        up: [0, 1, 0],
        fov: 50,
        updateCamera: function (camera, scene, mouseX, mouseY) {
            camera.position.y -= mouseX * 0.05;
            camera.position.y = Math.max(Math.min(camera.position.y, 1600), -1600);
            camera.lookAt(scene.position);
        }

    }, {//3

        left: 0.5,
        bottom: 0,
        width: 0.5,
        height: 1/3,
        background: new THREE.Color().setRGB(0.6,0.7, 0.8),
        eye: [700, 1200, 1500],
        up: [0, 1, 0],
        fov: 30,
        updateCamera: function (camera, scene, mouseX, mouseY) {
            camera.position.y -= mouseX * 0.05;
            camera.position.y = Math.max(Math.min(camera.position.y, 3000), -3000);
            camera.lookAt(scene.position);
        }
    },
     {
         //4
         left: 0.5,
         bottom: 1/3,
        width: 0.5,
        height: 0.34,
        background: new THREE.Color().setRGB(0.5, 0.8,0.6),
        eye: [140, 200, 95],
        up: [0, 1, 0],
        fov: 30,
        updateCamera: function (camera, scene, mouseX, mouseY) {
            camera.position.y -= mouseX * 0.05;
            camera.position.y = Math.max(Math.min(camera.position.y, 1600), -1600);
            camera.lookAt(scene.position);
        }
     }, {//5

         left: 0.5,
         bottom: 2/3,
         width: 0.5,
         height: 1/3,
         background: new THREE.Color().setRGB(0.7,0.8,0.4),
         eye: [2400, 600, 200],
         up: [0, 1, 0],
         fov: 30,
         updateCamera: function (camera, scene, mouseX, mouseY) {
             camera.position.y -= mouseX * 0.05;
             camera.position.y = Math.max(Math.min(camera.position.y, 1600), -1600);
             camera.lookAt(scene.position);
         }
     }
];
init();
animate();
function init() {
    
    for (var ii = 0; ii < views.length; ++ii) {
        var view = views[ii];
        camera = new THREE.PerspectiveCamera(view.fov, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.x = view.eye[0];
        camera.position.y = view.eye[1];
        camera.position.z = view.eye[2];
        camera.up.x = view.up[0];
        camera.up.y = view.up[1];
        camera.up.z = view.up[2];
        view.camera = camera;
    }
    scene = new THREE.Scene();
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1);
    scene.add(light);
    // shadow
    var canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0.1, 'rgba(0,0,0,0.15)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    var shadowTexture = new THREE.CanvasTexture(canvas);
    var shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true });
    var shadowGeo = new THREE.PlaneBufferGeometry(300, 300, 1, 1);
    var geometry = new THREE.CubeGeometry(100, 100, 100); // forme 
    var material = new THREE.MeshNormalMaterial();  //material
    var cube = new THREE.Mesh(geometry, material); //init cube
    scene.add(cube); //ajout du cube à la scène
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
  
   
}
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowWidth / 2);
    mouseY = (event.clientY - windowHeight / 2);
}
function updateSize() {
    if (windowWidth != window.innerWidth || windowHeight != window.innerHeight) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        renderer.setSize(windowWidth, windowHeight);
    }
}
function animate() {
    render();
   
    requestAnimationFrame(animate);
}
function render() {
    updateSize();
    for (var ii = 0; ii < views.length; ++ii) {
        view = views[ii];
        camera = view.camera;
        view.updateCamera(camera, scene, mouseX, mouseY);
        var left = Math.floor(windowWidth * view.left);
        var bottom = Math.floor(windowHeight * view.bottom);
        var width = Math.floor(windowWidth * view.width);
        var height = Math.floor(windowHeight * view.height);
        renderer.setViewport(left, bottom, width, height);
        renderer.setScissor(left, bottom, width, height);
        renderer.setScissorTest(true);
        renderer.setClearColor(view.background);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }
}
