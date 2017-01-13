/**
 * Fichier javascript dédié au groupe 2 : Vues
 */

/*Fonction qui affiche ou non la liste des caméra suivant qu'elle checkBox est cochée*/
function changeVue() {

    if (document.getElementById('vueOne').checked) { //si coché affiche list1 plus check2
        document.getElementById('listOne').style.display = "inline";
        document.getElementById('checkTwo').style.display = "inline";
    } else { //sinon on cache
        document.getElementById('listOne').style.display = "none";
        document.getElementById('checkTwo').style.display = "none";
        document.getElementById('listTwo').style.display = "none";
        document.getElementById('checkThree').style.display = "none";
        document.getElementById('listThree').style.display = "none";
    }
    if ((document.getElementById('vueOne').checked) && (document.getElementById('vueTwo').checked)) { //si coché affiche affiche list2 plus check3
        document.getElementById('listTwo').style.display = "inline";
        document.getElementById('checkThree').style.display = "inline";
    } else { //sinon on cache
        document.getElementById('listTwo').style.display = "none";
        document.getElementById('checkThree').style.display = "none";
        document.getElementById('listThree').style.display = "none";
    }
    if ((document.getElementById('vueOne').checked) && (document.getElementById('vueTwo').checked) && (document.getElementById('vueThree').checked)) { //si coché affiche affiche list3
        document.getElementById('listThree').style.display = "inline";
    } else { //sinon on cache
        document.getElementById('listThree').style.display = "none";
    }
}

/*Affiche le nom de la camera selectionnée*/
function vueSelection(vueSelection, cameraName) {
    //alert('La '+vueSelection+'e vue affiche la '+cameraName);
    if (cameraName == "Caméra 1")
        changeCam(-3.9, 10, -20, 15, 5, 0);
    if (cameraName == "Caméra 2")
        changeCam(7, 9.9, -7.9, -5, 3.5, -10);
    if (cameraName == "Caméra 3")
        changeCam(37, 9.9, -7.7, 30, 7.5, -10);
    if (cameraName == "Caméra 4")
        changeCam(39, 10, -20, 30, 5.5, -10);
    if (cameraName == "Caméra 5")
        changeCam(17.5, 10, -20, 1, 5.5, -10);
}

/*Fonction pour rénitialiser la caméra*/
function resetCamera() {
    //alert("Reset Camera");
    changeCam(100, 100, 100, 0, 0, 0);
    document.getElementById('vueOne').checked = false;
    document.getElementById('vueTwo').checked = false;
    document.getElementById('vueThree').checked = false;
    changeVue();
}