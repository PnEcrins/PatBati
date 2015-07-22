<?php use_helper('I18N', 'Date'); ?>

<?php if (count($devices)): ?>

<table border="1" bordercolor="#000000">
	<thead>
		<tr>
			<td>Index batiment</td>
			<td>Secteur</td>
			<td>Commune</td>
			<td>Appellation</td>
			<td>CoordX</td>
			<td>CoordY</td>
			<td>Reglementation</td>
			<td>Type architectural</td>
			<td>Valeur patrimoniale</td>
			<td><?php echo utf8_decode('Etat général')?></td>
			<td>Perspective</td>
			<td>Date derniers travaux</td>
			<td>Structure porteuse verticale</td>
			<td>Structure porteuse horizontale</td>
			<td>Charpente</td>
			<td>Couverture</td>
			<td>Equipements</td>
		</tr>
	</thead>
<tbody>
	<?php foreach($devices as $device): ?>
	<tr>
		<td><?php echo utf8_decode($device->getIndexbatiment()); ?></td>
		<td><?php echo utf8_decode($device->getSecteurCommune()); ?></td>
		<td><?php echo utf8_decode($device->getBibCommune()); ?></td>
		<td><?php echo utf8_decode($device->getAppelation()); ?></td>
		<td><?php echo utf8_decode($device->getX());?></td>
		<td><?php echo utf8_decode($device->getY());?></td>
		<?php
			  $value_protection = array();
			  foreach($device->getRelProtections() as $protection):
					$value_protection[] = utf8_decode(str_replace('œ', 'oe', $protection->getProtection()));
		  	  endforeach;
		?>
		<td><?php echo is_array($value_protection) ? implode(', ', $value_protection) :'';?></td>
		<td><?php echo utf8_decode($device->getBibClasseArchi()); ?></td>
		<td><?php echo utf8_decode($device->getNotePatri()); ?></td>
		<td><?php echo utf8_decode($device->getBibConservation()->getConservation()); ?></td>
		<?php
			  $value_perspective = array();
			  foreach($device->getRelIdentPerspectives() as $perspective):
					$value_perspective[] = utf8_decode($perspective->getPerspective());
		  	  endforeach;
		  	  
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
		<td><?php echo is_array($value_perspective) ? implode(', ', $value_perspective) : '';?></td>
		<td><?php echo $device->getLastDateTravaux() ? format_date($device->getLastDateTravaux()->getDateTravaux(), 'dd/MM/yyyy', 'fr'): ''; ?></td>
		
		<td><?php echo is_array($structureVertical) ? implode(', ', $structureVertical) : '';?></td>
		<td><?php echo is_array($structureHorizontal) ? implode(', ', $structureHorizontal) : '';?></td>
		<td><?php echo is_array($structureCharpente) ? implode(', ', $structureCharpente) : '';?></td>
		<td><?php echo is_array($structureCouverture) ? implode(', ', $structureCouverture) : '';?></td>
		<?php
			  $equipements = array();
			  foreach($device->getEquipementss() as $equipementsObject):
					$equipements[] = utf8_decode($equipementsObject->getBibEquipement()->__toString());
			  endforeach;
		?>
		<td><?php echo is_array($equipements) ? implode(', ', $equipements) : ''; ?></td>

	</tr>
	<?php endforeach; ?>
</tbody>
</table>

<?php else: ?>

Aucun bâtiment n'est disponible.

<?php endif; ?>