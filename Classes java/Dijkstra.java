package bibliothequegraphe.Modèles;

import bibliothequegraphe.Modèles.Graphe;
import java.util.ArrayList;

/**
 * Les listes sont nativement indicées de 0 à n
 * Notre graphe à ses sommets numérotés de 1 à n'
 * Ainsi, le sommet n devient n-1
 */

public class Dijkstra 
{
    int s;      //Sommet de départ - 1 
    int f;      //Sommet d'arrivée - 1
    
    private ArrayList<Integer> pi;          //Tableau qui contient les antecedant d'un sommet, ou le numéro de sommet est l'indice du tableau
    private ArrayList<Boolean> mark;        //Indice de la liste = numéro d'un sommet. true si le sommet est marqué
    private ArrayList<Integer> d;    		//Représente la distance progressivement calculée
 
    private Graphe g;                       //Le graphe sur le-quel on travaille
    private int nbSom;                      //Nombre de sommet du graphe
    
    private final int INF = 10000;          //RPZ l'infini
    
    
    public Dijkstra(Graphe graphe, int s, int f) {     //S : départ | f : arrivé
        this.s = s - 1;
        this.f = f - 1;

        this.pi = new ArrayList<>();
        this.mark = new ArrayList<>();
        this.d = new ArrayList<>();
        this.g = graphe;
        this.nbSom = this.g.getNbSommet();
    }
 

    public void initialisation() {
        for (int i = 0; i < this.nbSom ; i++) {
            this.mark.add(false);       //1
            this.pi.add(-1);            //2
            this.d.add(INF);     //3
        }
        this.d.set(s, 0);        //4
        for (int i = 1 ; i <= this.nbSom ; i++)      //Bonus
            for(int j = 1 ; j <= this.nbSom ; j++)
                if (this.g.getMatrice(i,j) == 0)
                    this.g.modifierMatrice(i, j, INF);
    }

    
    public void relachement(int a, int b) {
        if (d.get(b) > (d.get(a) + this.g.getMatrice(a+1, b+1))) {
            d.set(b,(d.get(a) + this.g.getMatrice(a+1, b+1)));
            pi.set(b, a);
        }
    }
     

    public ArrayList startDijkstra() {
        ArrayList<Integer> res = new ArrayList<>();        //Contient la liste des sommets
        int antecedent = f;

        initialisation();           //1
        while (this.mark.contains(false)) {
            int a = min();
            mark.set(a, true);
            for (int i = 0 ; i < this.nbSom ;i++) {
                this.relachement(a, i);
            }
        }

        while (antecedent!=s){
                res.add(0,antecedent+1);
                antecedent = pi.get(antecedent);
        }
        res.add(0,s+1);
        
        return res;
    }


    private int min () {
        int valeurMin = INF;
        int res = s;
        for (int i=0; i<d.size() ;i++){
            if (!mark.get(i))
                if (d.get(i)<=valeurMin){
                    res = i;
                    valeurMin = d.get(i);
                }
        }
        return res;
        }
    

}