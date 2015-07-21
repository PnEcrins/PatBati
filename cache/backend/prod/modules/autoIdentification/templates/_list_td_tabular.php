<td class="sf_admin_boolean sf_admin_list_th_valide">
  <?php echo $identification->getValide() ? call_user_func_array('function(value) { return scope.getRecordCheckboxDisplayImage(value); }', array_merge(array($identification->getValide()), array())) : '&nbsp;' ?>
</td>
<td class="sf_admin_text sf_admin_list_th_indexbatiment">
  <?php echo link_to($identification->getIndexbatiment(), 'identification_edit', $identification) ?>
</td>
<td class="sf_admin_text sf_admin_list_th_appelation">
  <?php echo $identification->getAppelation() ?>
</td>
<td class="sf_admin_foreignkey sf_admin_list_th_codeclasse">
  <?php echo $identification->getCodeclasse() ?>
</td>
<td class="sf_admin_foreignkey sf_admin_list_th_notepatri">
  <?php echo $identification->getNotepatri() ?>
</td>
<td class="sf_admin_foreignkey sf_admin_list_th_codeconservation">
  <?php echo $identification->getCodeconservation() ?>
</td>
<td class="sf_admin_foreignkey sf_admin_list_th_codeinsee">
  <?php echo $identification->getCodeinsee() ?>
</td>
<td class="sf_admin_text sf_admin_list_th_secteur_commune">
  <?php echo $identification->getSecteurCommune() ?>
</td>
<td class="sf_admin_text sf_admin_list_th_link_fiche_summary">
  <?php echo $identification->getLinkFicheSummary() ?>
</td>
<td class="sf_admin_text sf_admin_list_th_link_fiche">
  <?php echo $identification->getLinkFiche() ?>
</td>
<td class="sf_admin_date sf_admin_list_th_date_update">
  <?php echo false !== strtotime($identification->getDateUpdate()) ? format_date($identification->getDateUpdate(), "f") : '&nbsp;' ?>
</td>
