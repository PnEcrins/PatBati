<div class="header">
	<div class="center_header">
		<span class="header_title">
		<br />
		<?php echo strtoupper($identification->getAppelation()); ?> Alt. <?php echo $identification->getAltitude() ?> m
		<br />
		Commune
		<?php
		$commune = $identification->getBibCommune();

		if(in_array(strtolower(substr($commune, 0, 1)), array('a', 'e', 'i', 'o', 'u', 'y', 'h'))):?>
			<?php $prefix = 'd\'';?>
		<?php else:?>
			<?php $prefix = 'de';?>
		<?php endif;?>

		<?php echo $identification->getBibCommune() ? $prefix.$identification->getBibCommune() : '' ?>, <?php echo $identification->getBibCommune() ? $identification->getBibCommune()->getBibSecteur() : '' ?>
		<br />
		<?php echo $identification->getX() ?> ; <?php echo $identification->getY() ?>
		</span>
	</div>
</div>
<?php echo $identification->getIllustrationByType(6)->getFichierSource().'ttt';?>
<div class="information">
	<div class="picture">
		<?php //echo $identification->getPrincipalIllustration() ?>
				<img src= "<?php echo url_for('illustration/print?indexbatiment='.$identification->getIndexbatiment()) ?>" />
	</div>
	<br />
	<div class="typologie"><b>Typologie: </b><?php echo $identification->getBibClasseArchi() ?></div>
	<br />
	<?php $perspectives = array(); ?>
	<?php $equipements = array(); ?>
	<?php foreach($identification->getRelIdentPerspectives() as $BibPerspective): ?>
		<?php $perspectives[] = $BibPerspective->__toString() ?>
	<?php endforeach; ?>
	<?php foreach($identification->getEquipementss() as $equipementsObject): ?>
		<?php $equipements[] = $equipementsObject->getBibEquipement()->__toString() ?>
	<?php endforeach; ?>
	<?php 
	  $structureVertical = array();
	  foreach($device->getStructureVerticalePorteuse() as $vertical):
			$structureVertical[] = utf8_decode($vertical->getBibMateriauxGe());
  	  endforeach;
  	  
  	   $structureHorizontal = array();
	  foreach($device->getStructureHorizontalePorteuse() as $horizontal):
			$structureHorizontal[] = utf8_decode($horizontal->getBibMateriauxGe());
  	  endforeach;
  	  
  	   $structureCharpente = array();
	  foreach($device->getStructureCharpente() as $charpente):
			$structureCharpente[] = utf8_decode($charpente->getBibMateriauxGe());
  	  endforeach;
  	  
  	   $structureCouverture = array();
	  foreach($device->getStructureCouverture() as $couverture):
			$structureCouverture[] = utf8_decode($couverture->getBibMateriauxGe());
  	  endforeach;
  	  ?>

	<table class="center">
		<tr>
			<td><b>Degré de patrimonialité: </b><?php echo $identification->getNotepatri() ?></td>
			<td><b>Structure porteuse verticale: </b><?php echo is_array($structureVertical) ? implode(', ', $structureVertical) : '';?></td>
		</tr>
		<tr>
			<td><b>Etat de conservation: </b><?php echo $identification->getBibConservation()->getCodeconservation() ? $identification->getBibConservation() : ''?></td>
			<td><b>Charpente:</b> <?php echo is_array($structureCharpente) ? implode(', ', $structureCharpente) : '';?></td>
		</tr>
		<tr>
			<td><b>Perspective: </b><?php echo implode(' / ', $perspectives)?></td>
			<td><b>Couverture:</b> <?php echo is_array($structureCouverture) ? implode(', ', $structureCouverture) : '';?></td>
		</tr>
		<tr>
			<td><b>Travaux: </b><?php echo $identification->getCountTravaux() ? 'Oui' : 'Non' ?></td>
		</tr>
		<tr>
			<td><b>Equipements: </b>
			<div class="equipements"><?php echo implode('<br />', $equipements)?></div>
			</td>

		</tr>
	</table>
</div>


<div class="button">
	<input type="button" value="Imprimer" onclick="javascript:window.print()" />
</div>



