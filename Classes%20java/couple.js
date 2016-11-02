class Couple {
    /*
    *    Classe outil gérant les couples
    */

    var x; //int 
    var y; //int

    /*
    * Constructeur 
    */
    constructor(_x,_y) {
        this.x = _x;
        this.y = _y;
    }

    /*
    Couple(Point p) {
        this.x = (int) p.getX();
        this.y = (int) p.getY();
    }
    On verra plus tard pour ça
    */

    /*
    * Getteur x et y du couple
    */
    function getX() {
        return this.x;
    }

    function getY() {
        return this.y;
    }

    /*
    * /!\ Rien de sur pour cette fonction, peut être pas indispensable pour le moment /!\ 
    * Test d'égalité entre deux couples
    */
    function equals(o){
        if (o instanceof Couple) {
            var c = o; //Pas certains à vérifier
            return (this.x == c.x) && (this.y == c.y);
        }
        return false;
    }


}