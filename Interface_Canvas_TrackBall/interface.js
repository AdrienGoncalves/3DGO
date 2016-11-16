function zoomIn() {
    alert("Zoom +"); 
}

function zoomOut() {
    alert("Zoom -"); 
}

function moveUp() {
	alert("UP !"); 
}

function moveLeft() {
	alert("LEFT !"); 
}

function moveRight() {
	alert("RIGHT !"); 
}

function moveDown() {
	alert("DOWN !"); 
}

/*Fonction qui affiche ou non suivant qu'elle checkBox est cohée*/
function changeVue() {

	if (document.getElementById('vueOne').checked) { //si coché affiche list1 plus check2
		document.getElementById('listOne').style.display="inline";
		document.getElementById('checkTwo').style.display="inline";
	}
	else { //sinon on cache
		document.getElementById('listOne').style.display="none";
		document.getElementById('checkTwo').style.display="none";
		document.getElementById('listTwo').style.display="none";
		document.getElementById('checkThree').style.display="none";
		document.getElementById('listThree').style.display="none";
	}
	if ((document.getElementById('vueOne').checked) && (document.getElementById('vueTwo').checked)) { //si coché affiche affiche list2 plus check3
		document.getElementById('listTwo').style.display="inline";
		document.getElementById('checkThree').style.display="inline";
	}
	else { //sinon on cache
		document.getElementById('listTwo').style.display="none";
		document.getElementById('checkThree').style.display="none";
		document.getElementById('listThree').style.display="none";
	}
	if ((document.getElementById('vueOne').checked) && (document.getElementById('vueTwo').checked) && (document.getElementById('vueThree').checked)){ //si coché affiche affiche list3
		document.getElementById('listThree').style.display="inline";
	}
	else { //sinon on cache
		document.getElementById('listThree').style.display="none";
	}
}

function vueSelection(vueSelection,cameraName) {
	alert('La '+vueSelection+'e vue affiche la '+cameraName); 
}

function addCollada() {
     alert("Ajouter fichier Collada"); 
}

function resetCamera() {
     alert("Reset Camera"); 
}

function inMode() {
     alert("Indoor Mode"); 
}

function outMode() {
     alert("Outdoor Mode"); 
}

function createRoad() {
     alert("createRoad"); 
}

function isolate() {
     alert("isolate"); 
}

function tutoriel() {
     alert("Tutoriel"); 
}

function tutoriel() {
     alert("Tutoriel"); 
}

function contact() {
     alert("Contact"); 
}