/**
* Fichier javascript dédié au groupe 3 : Graphes
*/

var manager; 

/*Fonction qui est appelée lorsque l'on clique sur le bouton "Créer les portes"*/
function createDoors() {
	manager = new GrapheManager();	//On créé notre manager
	manager.recolterPortes("./xml/testPorte.xml");	//On lui injecte les portes
    alert(manager.toString()); 
}

/*Fonction qui est appelée lorsque l'on clique sur le bouton "Générer chemin"*/
function createRoad() {
	if ( (document.getElementById('door1').value != '') && (document.getElementById('door2').value != ''))
	{
		var p1 = document.getElementById('door1').value;
		var p2 = document.getElementById('door2').value;

		var text = "Le plus court chemin entre la porte "+p1+" et la porte "+p2+ " est : ";
		text += manager.genererPlusCourtChemin(p1,p2);
		alert(text);
	}
	else
		alert("Entrer les Ids des 2 portes");
}