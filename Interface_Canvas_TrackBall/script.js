window.onload = function() {
	var container;
	var context;

	var diametreBalle = 20;
	
	var posX = 1+diametreBalle/2;
	var posY = 1+diametreBalle/2;
	var vitesseX = 3;
	var vitesseY = 3;
	
	var myInterval = setInterval(animate, 1000/30);
	
	init();
	animate();

	function init() {
		container = document.getElementById("rendererArea");
		if(!container)
		{
			alert("Impossible de récupérer le canvas");
			return;
		}
		
		context = container.getContext("2d");
		if(!context)
		{
			alert("Impossible de récupérer le context");
			return;
		}
	}

	function animate(){
        context.clearRect(0, 0, container.width, container.height);
        
        //Tracé de la balle
        context.beginPath();
        context.arc(posX, posY, diametreBalle/2, 0, Math.PI*2);
        context.fill();
        
        //On va vérifier si la balle à toucher l'un des bords du canvas.
        if(posX+diametreBalle/2 >= container.width || posX <= 0+diametreBalle/2)//Si on touche le bord gauche ou droit
        {
            vitesseX *= -1;//On inverse la vitesse de déplacement sur l'axe horizontal.
        }

        if(posY+diametreBalle/2 >= container.height || posY <= 0+diametreBalle/2)//Si on touche le bord du bas ou du haut
        {
            vitesseY *= -1;//On inverse la vitesse de déplacement sur l'axe vertical.
        }
        
        //On additionne les vitesses de déplacement avec les positions
        posX += vitesseX;
        posY += vitesseY;
	}

}