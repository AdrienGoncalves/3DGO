/** Classe permettant la gestion d'une porte 
  * @author Dylan Barquilla
  */

//constructeur + définition des attributs
function Porte(x,y,z,code) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.code = code;
    this.listeArretes = {};
}

//prototype, liste des méthodes
Porte.prototype = {

    getId:function getId() {
        return this.code;
    },

    getArretes:function getArretes() {
        return this.listeArretes;
    },
	/* Permet de mettre en place une arrête entre une porte et la porte courante
	en précisant le poids de l'arrête */
    lierAvecPoids: function lierAvecPoids(porte,poids) {
        this.listeArretes[porte.code] = poids;
    },

    /* Permet de mettre en place une arrête entre une porte et la porte courante
	sans préciser le poids (qui sera la distance entre ces dernières) */
    lier: function lier(porte) {
    	var poids;
    	poids = Math.sqrt((this.x)*(porte.x) + (this.y)*(porte.y) + (this.z)*(porte.z))
        this.listeArretes[porte.code] = poids;
    },

    toString: function toString() {
        var res;
        res = "Porte n°"+this.code + " : ("+this.x+","+this.y+","+this.z+")."
        return res;
    },

};