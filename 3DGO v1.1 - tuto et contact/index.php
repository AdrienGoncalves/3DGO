<!DOCTYPE html>
<html lang="fr">

<head>
    <title>3D GO</title>
    <meta charset="utf-8">
	<link rel="stylesheet" href="stylesheet.css"/>
    <link rel="icon" type="image/png" href="Images/logo_3DGO.png"/>
	
	<!--Bibliothèque principal-->
    <script src="js/Three.js"></script>
	<!--Bibliothèques basés sur Three.js-->
	<script src="js/CanvasRenderer.js"></script>
    <script src="js/ColladaLoader.js"></script>
	<script src="js/Projector.js"></script>
    <script src="js/TrackballControls.js"></script>
	<script src="js/Stats.js"></script>
	<!--Nos fichiers javascript-->
	<script src="[grp1]interface.js"></script>
	<script src="[grp2]vues.js"></script>
	<script src="[grp3]graphes.js"></script>
	<script src="js/graph.js"></script>
	<script src="js/GrapheManager.js"></script>
	<script src="js/porte.js"></script>
	<script src="js/jquerry.js"></script>
	<script src="3d_rendering.js"></script>
</head>

<body>

	<div class="menuGauche">
		<div class="menu1" id="menu1">
			<nav>
				<h1>Déplacement</h1>
				
				<div id="leftImage">
					<img src="Images/zoom_in.png" width="50" height="50" style="cursor: pointer;" onclick="zoomIn()"/><br/>
					<img src="Images/zoom_out.png" width="50" height="50" style="cursor: pointer;" onclick="zoomOut()"/>
				</div>
				<div id="rightImage">
					<img src="Images/directional_arrows.png" width="100" height="100" alt="move" usemap="#direction" />
						<map name="direction">
						  <area shape="rect" coords="65,0,35,38" onClick="moveUp()" alt="UP"/>
						  <area shape="rect" coords="38,35,0,65" onClick="moveLeft()" alt="LEFT" />
						  <area shape="rect" coords="62,35,100,65" onClick="moveRight()" alt="RIGHT"/>
						  <area shape="rect" coords="65,100,35,62" onClick="moveDown()" alt="DOWN"/>
						</map>
				</div>
				
				<div id="boutons">

					<label><input type="checkBox" name="vueOne" value="vueCheckOne" onclick="changeVue()" id="vueOne"/> Activer la vue caméra </label>

					<div id="listOne"  style="display:none;">
						<select name="list1" id="list1">
							   <option>Caméra 1</option>
							   <option>Caméra 2</option>
							   <option>Caméra 3</option>
							   <option>Caméra 4</option>
							</select>
						<br />					
						<script>
							var list = document.getElementById('list1');
							list.addEventListener('change', function() {						
								// On envoi 1 et le contenu de l'élément <option> ciblé par la propriété selectedIndex
								vueSelection(1,list.options[list.selectedIndex].innerHTML);
							}, true);
						</script>						
					</div>
					
					<div id="checkTwo"  style="display:none;">
						<br/>
						<label><input type="checkBox" name="vueTwo" value="vueCheckTwo" onclick="changeVue()" id="vueTwo"/> Activer la vue caméra </label>

						<div id="listTwo"  style="display:none;">
						<select name="list2" id="list2">
							   <option>Caméra 1</option>
							   <option>Caméra 2</option>
							   <option>Caméra 3</option>
							   <option>Caméra 4</option>
							</select>
						</div>
						<br />
						<script>
							var list2 = document.getElementById('list2');
							list2.addEventListener('change', function() {						
								// On envoi 2 et le contenu de l'élément <option> ciblé par la propriété selectedIndex
								vueSelection(2,list2.options[list2.selectedIndex].innerHTML);
							}, true);
						</script>
					</div>

					<div id="checkThree"  style="display:none;">
						<br/>
						<label><input type="checkBox" name="vueThree" value="vueCheckThree" onclick="changeVue()" id="vueThree"/> Activer la vue caméra </label>

						<div id="listThree"  style="display:none;">
						<select name="list3" id="list3">
							   <option>Caméra 1</option>
							   <option>Caméra 2</option>
							   <option>Caméra 3</option>
							   <option>Caméra 4</option>
							</select>
						</div>
						<br />
						<script>
							var list3 = document.getElementById('list3');
							list3.addEventListener('change', function() {						
								// On envoi 1 et le contenu de l'élément <option> ciblé par la propriété selectedIndex
								vueSelection(3,list3.options[list3.selectedIndex].innerHTML);
							}, true);
						</script>
					</div>
					
					<br/><br/>
					<!-- Importation du fichier collada-->
					<form method="post" action="index.php" enctype="multipart/form-data">
						 <label for="fichier_collada">Fichier Collada (.dae) :</label><br />
						 <input type="file" name="fichier_collada" id="fichier_collada" accept=".dae"/><br />
						 <input type="submit" name="submit_collada" value="Envoyer" />
					</form>
					<?php
						if(isset($_POST['submit_collada']))
						{	
							//Vérifier si bien uploadé
							if ($_FILES['fichier_collada']['error'] > 0) $erreur = 'Erreur lors du transfert Collada<br/>';
							else
							{
								//Vérifier le format du fichier
								$extensions_valides = array( 'dae' ); //liste des formats correctes
								$extension_upload = strtolower(  substr(  strrchr($_FILES['fichier_collada']['name'], '.')  ,1)  );
								if ( in_array($extension_upload,$extensions_valides) )
								{
									//Déplacer le fichier
									$nom = "collada/collada.dae";
									$resultat = move_uploaded_file($_FILES['fichier_collada']['tmp_name'],$nom);
									if ($resultat) echo "Transfert réussi (Si rien ne s'affiche il se peut que votre fichier soit non lisible)";
									else echo "Problème lors du tranfert";
								}
								else echo "Le format du fichier doit être un .dae";
							}
						}
					?>
					<br />
					<input type="button" onclick="resetCamera()" value="Réinitialiser la vue"/></input>
				</div>

		</div>
		<div class="menu2" id="menu2">
			<nav>
				<h1>Actions</h1>
				<br/>
				<!-- Importation du fichier XML-->
				<form method="post" action="index.php" enctype="multipart/form-data">
					 <label for="fichier_xml">Fichier XML (.xml) :</label><br />
					 <input type="file" name="fichier_xml" id="fichier_xml" accept=".xml"/><br />
					 <input type="submit" name="submit_xml" value="Envoyer" />
				</form>
				<?php
					if(isset($_POST['submit_xml']))
					{	
						//Vérifier si bien uploadé
						if ($_FILES['fichier_xml']['error'] > 0) $erreur = 'Erreur lors du transfert<br/>';
						
						//Vérifier le format du fichier
						$extensions_valides = array( 'xml' ); //liste des formats correctes
						$extension_upload = strtolower(  substr(  strrchr($_FILES['fichier_xml']['name'], '.')  ,1)  );
						if ( in_array($extension_upload,$extensions_valides) ) '<script>alert.log("Extension correcte")';
						
						//Déplacer le fichier
						$nom = "xml/testPorte.xml";
						$resultat = move_uploaded_file($_FILES['fichier_xml']['tmp_name'],$nom);
						if ($resultat) '<script>alert.log("Transfert réussi")';
					}
				?>
				
				<div id="boutons" style="margin-top:15px;">
					<input type="button" onclick="createDoors()" value="Créer les portes"/></input>
				</div>
				
				<div id="boutons" style="margin-top:15px;">
					<label for="fichier_xml">Id Porte 1 :</label>
					<input type="text" name="door1" id="door1"><br>
					<label for="fichier_xml">Id Porte 2 :</label>
					<input type="text" name="door2" id="door2"><br>
					<input type="button" onclick="createRoad()" value="Générer chemin"/></input>
				</div>
				
				<div class="lienModal" style="left:10px">
					<a href="#modal_tuto">Tutoriel</a>
				</div>
				<div class="lienModal" style="right:10px;">
					<a href="#modal_contact">À propos</a>
				</div>
			</nav>
		</div>
	</div>
	
	<!--Fenêtre modale du tuto-->
	<div id="modal_tuto" class="modalDialog">
		<div>	
			<a href="#close" title="Fermer" class="close">X</a>
			<h3>Tutoriel</h3>
			<p>Bienvenue dans 3DGO !</p>
			<p>3DGO vous permet d'afficher vos fichiers COLLADA.</p>
			<p>Pour cela rien de plus simple : cliquez sur "Choississez un fichier" et sélectionnez votre fichier COLLADA puis cliquer sur "Envoyer". L'application va ensuite importer le fichier puis va l'afficher.</p>
			<p>Pour interagir avec le fichier :</p>
			<ul>
				<li><u>Pour tourner autour de l'objet :</u> Clic gauche et déplacer la souris ou vous pouvez utiliser les flèches de l'interface.</li>
				<li><u>Pour zoomer/dézoomer :</u> Si vous êtes sur Mozilla Firefox vous pouvez utiliser la molette de la souris, sinon vous pouvez utiliser les loupes de l'interface.</li>
				<li><u>Pour afficher des informations sur l'objet :</u> Vous pouvez faire un clic droit sur le fichier.</li>
			</ul>
			<p>Pour afficher les caméras :</p>
			<ul>
				<li>Cochez "Activer la vue caméra" puis choisissez la caméra que vous souhaitez afficher.</li>
				<li>Répéter l'action pour le nombre de caméras que vous voulez afficher (4 maximum).</li>
			</ul>
			<p>Pour afficher le plus court chemin entre 2 portes :</p>
			<p>Pour cela il faut importer le fichier XML associé à votre fichier COLLADA.</p>
			<ul>
				<li>Cliquez sur "Choississez un fichier" puis choississez le fichier XML associé puis cliquez sur "Envoyer".</li>
				<li>Cliquer sur "Créer les portes" pour générer les portes du fichier, une fenêtre va afficher la liste des portes générées ainsi que leurs coordonnées.</li>
				<li>Entrer les numéros des 2 portes dont vous souhaitez connaitre le plus court chemin puis faites générer chemin.</li>
				<li>Une nouvelle fenêtre affichant le plus court chemin est apparue.</li>
			</ul>
			<p>Bonne utilisation !</p>
		</div>
	</div>
	
	<!--Fenêtre modale de contact-->
	<div id="modal_contact" class="modalDialog">
		<div>	
			<a href="#close" title="Fermer" class="close">X</a>
			<h3>À propos</h3>
			<p>3DGO a été développée par : <a href="https://www.linkedin.com/in/dylan-barquilla-5aa512b3" target="_blank">Barquilla Dylan</a>, <a href="https://www.linkedin.com/in/elo%C3%AFse-grillet-1b5884133" target="_blank">Grillet Éloïse</a>, <a href="https://www.linkedin.com/in/adrien-goncalves-08ba70120" target="_blank">Goncalves Adrien</a>, <a href="https://www.linkedin.com/in/gautier-kasperek-086884133" target="_blank">Kasperek Gautier</a>, <a href="https://www.linkedin.com/in/lucas-lamarque-820884133" target="_blank">Lamarque Lucas</a>, <a href="https://www.linkedin.com/in/legoffmael" target="_blank">Le Goff Maël</a> et <a href="https://www.linkedin.com/in/enzo-menassol-3b31a1136" target="_blank">Mennassol Enzo</a>;
			tous étudiants de 2e année à l'IUT informatique de Dijon (2016/2017), dans le cadre de notre projet de 2e année.</p>
			<p>Nous avons été encadrés par <a href="https://www.linkedin.com/in/arnaudrolet" target="_blank">Rolet Arnaud</a> et <a href="https://www.linkedin.com/in/christophenicolle" target="_blank">Nicolle Christophe</a>, appartenant au laboratoire <a href="https://checksem.u-bourgogne.fr/#/home" target="_blank">Checksem</a>.</p>
		</div>
	</div>

	<div class="centre" id="dessein">
		
	</div>
	
	<div class="menuDroite">
		<div class="menu3" id="menu3">
			<nav>		
				<h1>Informations générales</h1>
				<nav id="nav1">		
				
				
				
			</nav>
				
				
			</nav>	
		</div>
		<div class="menu4" id="menu4">
			<nav>
				<h1>Informations sur la vue</h1>
				
				<nav id="nav2">		
				
				
				
			</nav>

			</nav>
		</div>
	</div>
	
	
	<script src="3d_rendering.js"></script>

</body>
</html>
