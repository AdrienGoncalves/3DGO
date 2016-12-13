<!DOCTYPE html>
<html lang="fr">

<head>
    <title>3D GO</title>
    <meta charset="utf-8">
	<link rel="stylesheet" href="stylesheet.css"/>
    <link rel="icon" type="image/ico" href="Images/logo_le2i.png"/>
	
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
				
				<div style="position:absolute; bottom:10px; left:10px">
					<input type="button" onclick="tutoriel()" value="Tutoriel"/></input>
				</div>
				<divstyle="position:absolute; bottom:10px; right:10px;">
				<div style="position:absolute; bottom:10px; right:10px;">
					<input type="button" onclick="contact()" value="Contact"/></input>
				</div>
			</nav>
		</div>
	</div>

	<div class="centre" id="dessein">
		
	</div>
	
	<div class="menuDroite">
		<div class="menu3" id="menu3">
			<nav>		
				<!-- <h1>Informations général</h1> -->
				
				<!-- <h2>Nom de la scène :<h2> -->
				
				<!-- <h2>Description :<h2> -->
				
				<!-- <h2>Date de création :<h2> -->
				
				<!-- <h2>Dimension :<h2> -->
				
			</nav>	
		</div>
		<div class="menu4" id="menu4">
			<!-- <nav>		 -->
				<!-- <h1>Informations sur la vue</h1> -->
				
				<!-- <h2>Vue actuelle :<h2> -->
				
				<!-- <h2>Coordonnées actuelles de la caméra :<h2> -->
				
				<!-- <h2>Champs de vision :<h2> -->

			<!-- </nav>	 -->
		</div>
	</div>
	
	
	<script src="3d_rendering.js"></script>

</body>
</html>