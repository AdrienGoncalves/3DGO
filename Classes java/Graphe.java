/*
 * Classe modélisant un graphe
 */
package bibliothequegraphe.Modèles;

import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author simonetma
 */
public class Graphe {
    private int nbSommet;
    private HashMap<Couple,Integer> matrice;
    private Boolean orienté;
    
    //constructeur
    public Graphe() {
        this.nbSommet = 0;
        this.matrice = new HashMap<>();
        this.orienté = false;
    }
    
    
    //Gestion du nombre de sommet
    public void setNbSommet(int n) {
        this.nbSommet = n;
    }
    
    public int getNbSommet() {
        return this.nbSommet;
    }
    
    //*************** gestion de la matrice d'adjacence ***********************
    //Modifie la valeur (i,j) de la matrice d'adjacence du graphe
    public void modifierMatrice(int i,int j,int valeur) {
        if(i<=0 || j<=0) {
            System.err.println("Erreur ! La matrice d'adjacence ne possède pas de coefficient ("+i+","+j+") !");
        }
        else if(i>this.nbSommet || j>this.nbSommet) {
            System.err.println("Erreur ! La matrice d'adjacence ne possède pas de coefficient ("+i+","+j+") !");
        }
        else
        {
            Couple c = new Couple(i,j);
            this.matrice.put(c, valeur);
        }
    }
    
    //renvoie la valeur du coefficient (i,j) de la matrice d'adjacence (0 par défaut)
    public int getMatrice(int i,int j) {
        if(i<=0 || j<=0) {
            System.err.println("Erreur ! La matrice d'adjacence ne possède pas de coefficient ("+i+","+j+") !");
        }
        else if(i>this.nbSommet || j>this.nbSommet) {
            System.err.println("Erreur ! La matrice d'adjacence ne possède pas de coefficient ("+i+","+j+") !");
        }
        else {
            Couple c = new Couple(i,j);
            if(this.matrice.containsKey(c)) {
                return this.matrice.get(c);
            }
        }
        return 0;
    }
    
    //oriente ou non le graphe (false de base)
    public void setOrientation(boolean B) {
        this.orienté = B;
    }
    
    public boolean getOrientation() {
        return this.orienté;
    }
    
    public String toString() {
        String ret = "<html><center>Matrice du graphe :<br><br>";
        for(int i=1;i<=this.nbSommet;i++) {
            for(int j=1;j<=this.nbSommet;j++) {
                Couple c = new Couple(i,j);
                if(this.matrice.containsKey(c)) {
                    ret += this.matrice.get(c);
                }
                else {
                    ret += "0";
                }
                if(j<this.nbSommet) {
                    ret+= " ";
                }
            }
            if(i<this.nbSommet) {
                ret+="<br>";
            }
        }
        ret += "</center></html>";
        return ret;
    }
    
    public void ajouterArc(int deb, int fin, int l) {
        if (this.orienté == false) {
            this.modifierMatrice(fin, deb, l);     //on définit la matrice d'adjacence
        }
        this.modifierMatrice(deb, fin, l);     //on définit la matrice d'adjacence
    }
    
    /**
     * 
     * @return Booleen qui indique si le graphe est Réflexif.
     */
    public boolean estReflexif() {
       boolean res = true;
       
       for (int i = 1 ; i <= this.nbSommet ; i++) {
           if (this.getMatrice(i,i) == 0)
               res = false;
       }
       return res;
    }
    
    /**
     * 
     * @return Booleen qui indique si le graphe est Transitif.
     */
    public boolean estTransitif() {
       boolean res = true;
       
       for (int i=1 ; i<=this.nbSommet ; i++) {
            for (int j=1 ; j<=this.nbSommet ; j++) {
                if (this.getMatrice(i,j) != 0) {
                    for (int k=1 ; k<=this.nbSommet ; k++) {
                        if (this.getMatrice(j,k) != 0)
                            if (this.getMatrice(i,k) == 0)
                                res = false;
                    }
                }
           }
        }
       
       return res;
    }
    
    /**
     * 
     * @return Booleen qui indique si le graphe est Symétrique.
     */    
    public boolean estSymetrique() {
       boolean res = true;
       
        for (int i=1 ; i<=this.nbSommet ; i++) {
            for (int j=1 ; j<=this.nbSommet ; j++) {
                if (this.getMatrice(i,j) != 0)
                    if (this.getMatrice(j,i) == 0)
                        res = false;
           }
        }
        return res;
    }
    
    /**
     * 
     * @return Booleen qui indique si le graphe est Transitif.
     */    
    public boolean estAntisymetrique() {
        boolean res = true;
        
        for (int i=1 ; i<=this.nbSommet ; i++) 
            for (int j=1 ; j<=this.nbSommet ; j++) 
                if (this.getMatrice(i,j) != 0)
                    if (this.getMatrice(j,i) != 0)
                        res = false;
        return res;
    }
    
        public boolean existeChemin (int s, int f) {
            boolean res = false;                        //Variable de résultat
            int x;                                      //Contient temporairement le sommet
            int n = this.getNbSommet();                 //Contient le nombre de sommets du graphe courant
            int i;                                      //Boucle
            
            ArrayList mark = new ArrayList();           //Boolean
            ArrayList aTraiter = new ArrayList();       //Liste des sommets à traiter
            
            for (i=0 ; i<n ; i++)      //On initialise mark à false
                mark.add(false);
            mark.set(s-1, true);                //1
            aTraiter.add(s);                    //2
            while (aTraiter.isEmpty()) {        //3
                x = (int) aTraiter.get(0);      //4
                for (i=0 ; i<n-1 ; i++) {       //5
                    if ( (!((boolean)mark.get(i))) && ((this.getMatrice(i+1,x+1)) != 0) ) {     //6
                        aTraiter.add(i);        //7
                        mark.set(i, true);      //8
                    }
                }
            }
            
            if ((boolean)mark.get(f-1))         //FINAL
                res = true;

            return res;
        }
        
        private void relachement(int c, int e, ArrayList<Float> d, Graphe g, ArrayList<Integer> pi) {
            int a = c-1;
            int b = e-1;
            if (d.get(b)>(d.get(a)+(float)g.getMatrice(a, b))) {
                d.set(b, d.get(a)+(float)g.getMatrice(a, b));
                pi.set(b, a);
            }
        }
        
       private int min (ArrayList<Integer> d) {
           int res;
           res = d.get(0);
           for (int f: d) {
               if (f<res)
                   res = f;
           }
           return res;
       }
        
        public ArrayList dikjstra(int s, int p, int taille) {
            ArrayList res = new ArrayList();
            
            int a,b;
            ArrayList<Boolean> mark = new ArrayList(taille);
            ArrayList<Integer> d = new ArrayList();
            ArrayList<Integer> pi = new ArrayList();
            
            int INF = 1000;       //Infini = 1000
            
            /*** Initialisation ***/
            for (boolean bo : mark) 
                bo = false;
            for (int bo : d) 
                bo = INF;
            d.set(s-1, 0);
            
            /*** Traitement ***/
            while (mark.contains(false)) {
                a = pi.get(min(d));
                mark.set(a, true);
                
            }
            
            
            
            
            
            
            
            
            return res;
        }
    
        
        
    
}
