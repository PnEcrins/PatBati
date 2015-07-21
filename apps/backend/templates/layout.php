<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <?php include_http_metas() ?>
    <?php include_metas() ?>
    <?php include_title() ?>
<!--    <link rel="shortcut icon" href="/favicon.ico" />-->
  </head>
  <body>
	<div id="header">
		<h1>Parc national des Ecrins</h1>
		<!--
		<ul>
			<li><a href="#" onclick="menu.showGestionBati()">Gestion des bâtiments</a></li>
			|
			<li><a href="#" onclick="menu.showGestionSO()">Gestion des éléments de second oeuvre</a></li>
		</ul>
		-->
		<?php echo link_to('Déconnexion', '@logout');?>
	</div><!--//end #header//-->
	<?php echo $sf_content ?>
  </body>
</html>