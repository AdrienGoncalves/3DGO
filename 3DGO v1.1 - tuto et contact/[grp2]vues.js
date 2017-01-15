/**
 * Fichier javascript dédié au groupe 2 : Vues
 */

/*Fonction qui affiche ou non la liste des caméra suivant qu'elle checkBox est cochée*/
function changeVue() {

    if (document.getElementById('vueOne').checked) { //si coché affiche list1 plus check2
        document.getElementById('listOne').style.display = "inline";
        document.getElementById('checkTwo').style.display = "inline";
        vueSelection(2, list2.options[list2.selectedIndex].innerHTML);
    } else { //sinon on cache
        document.getElementById('listOne').style.display = "none";
        document.getElementById('checkTwo').style.display = "none";
        document.getElementById('listTwo').style.display = "none";
        document.getElementById('checkThree').style.display = "none";
        document.getElementById('listThree').style.display = "none";
        changeCam(0);
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

/*Affiche la camera selectionnée*/
function vueSelection(vueSelection, cameraName) {
    if (cameraName == "Caméra 1")
        changeCam(1);
    if (cameraName == "Caméra 2")
        changeCam(2);
    if (cameraName == "Caméra 3")
        changeCam(3);
    if (cameraName == "Caméra 4")
        changeCam(4);
    if (cameraName == "Caméra 5")
        changeCam(5);
}

/*Fonction pour rénitialiser la caméra*/
function resetCamera() {
    document.getElementById('vueOne').checked = false;
    document.getElementById('vueTwo').checked = false;
    document.getElementById('vueThree').checked = false;
    changeVue();
    changeCam(-1);
}