<?php use_helper('I18N', 'Date'); ?>

<?php if (count($devices)): ?>

<table border="1" bordercolor="#000000">
	<thead>
		<tr>
			<td>Index batiment</td>
			<td>Secteur</td>
			<td>Commune</td>
			<td><?php echo utf8_decode('Appellation');?></td>
			<td>CoordX</td>
			<td>CoordY</td>
			<td>Demande de permis</td>
			<td>Date de la demande</td>
			<td>Autorisation de permis</td>
			<td>Date du permis</td>
			<td><?php echo utf8_decode('N° de permis');?></td>
			<td>Date des travaux</td>
			<td>Autorisation du Parc</td>
			<td><?php echo utf8_decode('Subvention accordée par le Parc');?></td>
			<td>Nature des travaux</td>
			<td>Nouvel usage</td>
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
		if(count($device->getDemandes())):
		$i=0;
		foreach($device->getDemandes() as $demande):
			$j=0;
			if($i != 0){
				echo '</tr><tr><td></td><td></td><td></td><td></td><td></td><td></td>';
			} ?>
			
			<td><?php echo utf8_decode($demande->getDemandep() ? 'Oui' : 'Non'); ?></td>
			<td><?php echo utf8_decode(format_date($demande->getDateDemandep(), 'dd/MM/yyyy', 'fr'))?></td>
			<td><?php echo utf8_decode($demande->getAutorisationp() ? 'Oui' : 'Non'); ?></td>
			<td><?php echo utf8_decode(format_date($demande->getDatePermis(), 'dd/MM/yyyy', 'fr'))?></td>
			<td><?php echo $demande->getNumPermis();?></td>
			<?php if(count($device->getDemandes())): ?>
				<?php  foreach($demande->getTravauxs() as $travaux):?>
	
					<?php if($j != 0):?>
							</tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
					<?php endif;?>
					
					<td><?php echo utf8_decode(format_date($travaux->getDateTravaux(), 'dd/MM/yyyy', 'fr'))?></td>
					<td><?php echo utf8_decode($travaux->getAutorisation() ? 'Oui' : 'Non');?></td>
					<td><?php echo $travaux->getSubventionPne() ? utf8_decode($travaux->getSubventionPne()) : ''; ?></td>
					<td><?php echo utf8_decode($travaux->getBibNature()->getNature());?></td>
					<td><?php echo utf8_decode($travaux->getBibUsage()->getUsage());?></td>
	
					<?php $j++;?>
	
				<?php endforeach;?>
			<?php else:?>
					<td></td><td></td><td></td><td></td><td></td><td></td><td></td>
			<?php endif;?>
			
			<?php $i++;?>
		<?php endforeach;?>
			
		<?php else:?>
					<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
		<?php endif;?>

	</tr>
	<?php endforeach; ?>
</tbody>
</table>

<?php else: ?>

Aucun bâtiment n'est disponible.

<?php endif; ?>