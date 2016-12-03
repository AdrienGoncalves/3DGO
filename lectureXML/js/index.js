var manager = new GrapheManager();	//On créé notre manager
manager.recolterPortes("./xml/testPorte.xml");	//On lui injecte les portes

var txt = '<p>'+manager.toString()+'</p>';

$(txt).appendTo('#Div_XML');	//On affiche le résultat : les portes crées
