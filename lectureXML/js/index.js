var manager = new GrapheManager();	//On créé notre manager
manager.recolterPortes("./xml/testPorte.xml");	//On lui injecte les portes

var txt = '<p>'+manager.toString()+'</p>';

$(txt).appendTo('#Div_XML');	//On affiche le résultat : les portes crées

var court = manager.genererPlusCourtChemin('1','2');
txt = '<br/><p>Plus court chemin entre 1 et 2 : '+court+'</p>';
$(txt).appendTo('#Div_XML');	//On affiche le résultat : les portes crées

