/*
 * Classe outil gérant un couple
 */
package bibliothequegraphe.Modèles;

import java.awt.Point;
import static java.lang.Math.pow;
import static java.lang.Math.sqrt;

/**
 *
 * @author simonetma
 */
public class Couple {
    private int x;
    private int y;
    
    //constructeur
    public Couple(int _x,int _y) {
        this.x = _x;
        this.y = _y;
    }
    public Couple(Point p) {
        this.x = (int) p.getX();
        this.y = (int) p.getY();
    }
    
    //getteurs
    public int getX() {
        return this.x;
    }
    public int getY() {
        return this.y;
    }
    
    //gestion de l'egalité
    @Override
    public boolean equals(Object o) {
        if (o instanceof Couple) {
            Couple c = (Couple) o;
            return (this.x == c.x) && (this.y == c.y);
        }
        return false;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + this.x;
        hash = 79 * hash + this.y;
        return hash;
    }
    
    public Point toPoint() {
        return new Point(this.getX(),this.getY());
    }
    
    public double norme() {
        return sqrt(pow(this.x,2)+pow(this.y,2));
    }
    
    public Couple perpendiculaire() {
        return new Couple(this.y,-this.x);
    }
    
    public Couple difference(Couple c) {
        return new Couple(this.x-c.x,this.y-c.y);
    }
    
    public Couple normalisation(double rapport) {
        double n = this.norme();
        return new Couple((int) ((rapport*this.x)/n), (int) ((this.y*rapport)/n));
    }
    
    public Couple decalage(Couple v) {
        return new Couple(this.x + v.x,this.y+v.y);
    }
    
    public Couple sommetFleche(Couple fin,int coté){
        Couple direction = fin.difference(this);
        Couple directionFleche;
        if(coté == 1) {
            directionFleche = new Couple((int) (sqrt(3)*direction.x-direction.y),(int) (direction.x+sqrt(3)*direction.y));
        }
        else {
            directionFleche = new Couple((int) (sqrt(3)*direction.x+direction.y),(int) (sqrt(3)*direction.y-direction.x));
        }
        directionFleche = directionFleche.normalisation(20);
        return this.decalage(directionFleche);
    }
}
