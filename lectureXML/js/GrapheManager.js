/** Classe permettant la transition entre données brut du fichier XML et le graphe 
  * @author Dylan Barquilla
  */

//constructeur + définition des attributs
function GrapheManager() {
    this.listePortes = [];
    this.a = 1;
}

//prototype, liste des méthodes
GrapheManager.prototype = {

    /**
      * Méthode permettant de générer la liste des portes
      * chemin : le chemin du fichier XML où se trouve les ressources
      */
    recolterPortes: function recolterPortes(chemin) {
      var result;     //Le contenu non scané du fichier XML
      var liste=[];   //La liste des portes

      $.ajax( { //Création de l'objet AJAX : modèle vu sur le net.
            type: "GET",
            async: false,
            url: chemin,
            dataType: "xml",
            success: function(data) {
              result = data;
            }
        });

      liste = this.traitement(result);  //On traite le fichier avec this.traitement

      for (var i = 0; i < liste.length; i++) {
          this.listePortes.push(liste[i]);
      }
      this.connecterPorte();

    },

    /**
      * Méthode test, implémentation plus tardive selon le contenu des fichiers
      */
    connecterPorte: function connecterPorte(chemin) {
      this.listePortes[0].lier(this.listePortes[2]);
      this.listePortes[2].lier(this.listePortes[1]);
    },

    /**
      * Le traitement des données du fichier XML : scan chaque porte en l'ajoutant à une liste
      * return : la liste des portes 
      */
    traitement:function traitement(xml) {
      var balise = 'porte'; //Le noeud que l'on recherche
      var liste = [];       //La liste des portes, variables retournée

      $(xml).find(balise).each(function() {
                                        var id = $(this).attr('id');          //On prend les valeurs qui nous intéressent
                                        var posX = $(this).find('posX').text();
                                        var posY = $(this).find('posY').text();
                                        var posZ = $(this).find('posZ').text();

                                        var porte = new Porte(posX,posY,posZ,id);   //On créé notre porte

                                        liste.push(porte);    //On ajoute notre porte à la liste des portes
                                      });
      return liste;
    },

    /**
      * generer le plus court chemin entre p1 et p2
      * p1,p2 : Les portes
      */
    genererPlusCourtChemin: function genererPlusCourtChemin(p1,p2) {
        var map = {};
        var sommet;
        var listeArrete;

        for (var i = 0; i < this.listePortes.length; i++) {
            sommet = this.listePortes[i].getId();
            listeArrete = this.listePortes[i].getArretes();
            map[sommet] = listeArrete;
        }
        var monGraphe = new Graph(map);
        return monGraphe.findShortestPath(p1,p2);
    },

    toString: function toString() {
      var res = "";
      for (var i = 0; i < this.listePortes.length; i++) {
          res+=(this.listePortes[i]);
          res+='\n';
      }
      return res;
      },

};