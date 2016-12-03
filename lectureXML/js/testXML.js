$(document).ready(  
 function()
 {
   $.ajax( {	//Création de l'objet AJAX : modèle vu sur le net.
            type: "GET",
            url: "./xml/testPorte.xml",
            dataType: "xml",
            success: traitement
        });
  }
);

/**
  * La fonction qui va permettre le traitement de notre fichier XML 
  * xml : l'objet contenant notre fichier
  **/
function traitement(xml) {
	var balise = 'porte';	//Le noeud que l'on recherche

	$(xml).find(balise).each(chaqueNoeud);	//On appelle la fonction chaqueNoeud à chaque noeud trouvé
}


/**
  * La fonction décrivant ce que l'on doit faire pour chaque noeud trouvé 
  **/
function chaqueNoeud() {
	var id = $(this).attr('id');					//On prend les valeurs qui nous intéressent
	var posX = $(this).find('posX').text();
	var posY = $(this).find('posY').text();
	var posZ = $(this).find('posZ').text();

	var porte = new Porte(posX,posY,posZ,id);		//On créé notre porte
	$('<p>'+porte.toString()+'</p>').appendTo('#Div_XML');	//On affiche le résultat : les portes crées
}