class Graphe{
    var nbSommet;
    var map;
        /*
            Correspond à la Hashmap de java.
            Déclaration. Méthode trouver sur le net.
            var map= {'m1': 12,'m2': 13,'m3': 14,'m4': 15}
    
            alert(map['m1']); --> Renvoie la valeur de m1
        */
    var oriente;
    
    /*
    *
    */
     constructor(){
        this.nbSommet = 0;
        this.map = new Map(); 
        this.oriente = false;
    }
    /*
    * Définit le nombre de sommets du graphe
    */
    function setNbSommet(n){
        this.nbSommet = n;
    }

    /*
    * Retourne le nombre de sommet
    */
    function getNbSommet(){
        return this.nbSommet;
    }

    /*
    * Oriente ou non le graphe
    */
    function setOrientation(bool){
        if(bool == false || bool == true)
            oriente = bool;
        else;
            //erreur mauvais type           
    }

    /*
    * Retourne true ou false si le graphe est orienté ou pas
    */
    function getOrientation(){
        return oriente;
    }

    /*
    * Modifie la matrice d'adjacence
    */
    function modifierMatrice(i,j,valeur){
        if(i<=0 || j<=0){
            //erreur, hors matrice
        }
        else if(i>this.nbSommet || j>this.nbSommet){
            //erreur, hors matrice
        }
        else{
            var c = new Couple(i,j);
            this.map.set(c,valeur); //Ajoute valeur voulu au couple i j dans la matrice
        }
    }

    /*
    * Retourne la matrice d'adjacence
    */
    function getMatrice(i,j){
        if(i<=0 || j<=0){
            //erreur la amtrice ne possede pas de i j 
        }
        else if(i>this.nbSommet || j>this.nbSommet){
            //erreur, la matrice ne possède pas de i j
        }
        else{
            var c = new Couple(i,j);
            if(alert['c']){
                return this.map[c];
            }
			/*
			 Couple c = new Couple(i,j);
            if(this.matrice.containsKey(c)) {
                return this.matrice.get(c);
            }
			*/
        }
    }

    /*
    * A faire, mais plus tard
    */
    function toString(){
        return '';
    }

    /*
    * Function qui permet d'ajouter un arc entre des points existants
    */
    function ajouterArc(deb, fin,l){
        if(this.oriente==false){
            this.modifierMatrice(fin,deb,l) //si orienté alors on ajoute dans les deux sens
        }
        this.modifierMatrice(deb,fin,l); //Ajout d'un arc
    }

    /*
    *renvoie true si le graphe est réflexif
    * A faire, pas necessaire pour le moment je pense
    */
    function estReflexif(){
        return false;
    }

    /*
    * Renvoie true si le graphe est symétrique
    * A faire, pas necessaire pour le moment je pense
    */
    function estSymetrique(){
        return false;
    }

    /*
    * Renvoie true si le graphe est Anti-symétrique
    * A faire, pas necessaire pour le moment je pense
    */
    function estAntiSymetrique(){
        return false;
    }

    /*
    * Il reste existeChemin, relachement et dijsktra dans la classe de base 
    *pas sur que ça soit utile atm.
    */
    }