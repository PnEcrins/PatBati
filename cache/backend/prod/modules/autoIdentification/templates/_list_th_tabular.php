<?php slot('sf_admin.current_header') ?>
<th class="sf_admin_boolean sf_admin_list_th_valide">
  <?php if ('valide' == $sort[0]): ?>
    <?php echo link_to(__('Validé', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=valide&sort_type='.($sort[1] == 'asc' ? 'desc' : 'asc'))) ?>
    <?php echo image_tag(sfConfig::get('sf_admin_module_web_dir').'/images/'.$sort[1].'.png', array('alt' => __($sort[1], array(), 'sf_admin'), 'title' => __($sort[1], array(), 'sf_admin'))) ?>
  <?php else: ?>
    <?php echo link_to(__('Validé', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=valide&sort_type=asc')) ?>
  <?php endif; ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_text sf_admin_list_th_indexbatiment">
  <?php if ('indexbatiment' == $sort[0]): ?>
    <?php echo link_to(__('Nouveau numéro', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=indexbatiment&sort_type='.($sort[1] == 'asc' ? 'desc' : 'asc'))) ?>
    <?php echo image_tag(sfConfig::get('sf_admin_module_web_dir').'/images/'.$sort[1].'.png', array('alt' => __($sort[1], array(), 'sf_admin'), 'title' => __($sort[1], array(), 'sf_admin'))) ?>
  <?php else: ?>
    <?php echo link_to(__('Nouveau numéro', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=indexbatiment&sort_type=asc')) ?>
  <?php endif; ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_text sf_admin_list_th_appelation">
  <?php if ('appelation' == $sort[0]): ?>
    <?php echo link_to(__('Appellation', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=appelation&sort_type='.($sort[1] == 'asc' ? 'desc' : 'asc'))) ?>
    <?php echo image_tag(sfConfig::get('sf_admin_module_web_dir').'/images/'.$sort[1].'.png', array('alt' => __($sort[1], array(), 'sf_admin'), 'title' => __($sort[1], array(), 'sf_admin'))) ?>
  <?php else: ?>
    <?php echo link_to(__('Appellation', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=appelation&sort_type=asc')) ?>
  <?php endif; ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_foreignkey sf_admin_list_th_codeclasse">
  <?php if ('codeclasse' == $sort[0]): ?>
    <?php echo link_to(__('Type architectural', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=codeclasse&sort_type='.($sort[1] == 'asc' ? 'desc' : 'asc'))) ?>
    <?php echo image_tag(sfConfig::get('sf_admin_module_web_dir').'/images/'.$sort[1].'.png', array('alt' => __($sort[1], array(), 'sf_admin'), 'title' => __($sort[1], array(), 'sf_admin'))) ?>
  <?php else: ?>
    <?php echo link_to(__('Type architectural', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=codeclasse&sort_type=asc')) ?>
  <?php endif; ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_foreignkey sf_admin_list_th_notepatri">
  <?php if ('notepatri' == $sort[0]): ?>
    <?php echo link_to(__('Valeur patrimoniale', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=notepatri&sort_type='.($sort[1] == 'asc' ? 'desc' : 'asc'))) ?>
    <?php echo image_tag(sfConfig::get('sf_admin_module_web_dir').'/images/'.$sort[1].'.png', array('alt' => __($sort[1], array(), 'sf_admin'), 'title' => __($sort[1], array(), 'sf_admin'))) ?>
  <?php else: ?>
    <?php echo link_to(__('Valeur patrimoniale', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=notepatri&sort_type=asc')) ?>
  <?php endif; ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_foreignkey sf_admin_list_th_codeconservation">
  <?php if ('codeconservation' == $sort[0]): ?>
    <?php echo link_to(__('Etat général', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=codeconservation&sort_type='.($sort[1] == 'asc' ? 'desc' : 'asc'))) ?>
    <?php echo image_tag(sfConfig::get('sf_admin_module_web_dir').'/images/'.$sort[1].'.png', array('alt' => __($sort[1], array(), 'sf_admin'), 'title' => __($sort[1], array(), 'sf_admin'))) ?>
  <?php else: ?>
    <?php echo link_to(__('Etat général', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=codeconservation&sort_type=asc')) ?>
  <?php endif; ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_foreignkey sf_admin_list_th_codeinsee">
  <?php if ('codeinsee' == $sort[0]): ?>
    <?php echo link_to(__('Commune', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=codeinsee&sort_type='.($sort[1] == 'asc' ? 'desc' : 'asc'))) ?>
    <?php echo image_tag(sfConfig::get('sf_admin_module_web_dir').'/images/'.$sort[1].'.png', array('alt' => __($sort[1], array(), 'sf_admin'), 'title' => __($sort[1], array(), 'sf_admin'))) ?>
  <?php else: ?>
    <?php echo link_to(__('Commune', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=codeinsee&sort_type=asc')) ?>
  <?php endif; ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_text sf_admin_list_th_secteur_commune">
  <?php echo __('Secteur', array(), 'messages') ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_text sf_admin_list_th_link_fiche_summary">
  <?php echo __('Fiche-résumé', array(), 'messages') ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_text sf_admin_list_th_link_fiche">
  <?php echo __('Fiche', array(), 'messages') ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?><?php slot('sf_admin.current_header') ?>
<th class="sf_admin_date sf_admin_list_th_date_update">
  <?php if ('date_update' == $sort[0]): ?>
    <?php echo link_to(__('Date de mise à jour', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=date_update&sort_type='.($sort[1] == 'asc' ? 'desc' : 'asc'))) ?>
    <?php echo image_tag(sfConfig::get('sf_admin_module_web_dir').'/images/'.$sort[1].'.png', array('alt' => __($sort[1], array(), 'sf_admin'), 'title' => __($sort[1], array(), 'sf_admin'))) ?>
  <?php else: ?>
    <?php echo link_to(__('Date de mise à jour', array(), 'messages'), 'identification', array(), array('query_string' => 'sort=date_update&sort_type=asc')) ?>
  <?php endif; ?>
</th>
<?php end_slot(); ?>
<?php include_slot('sf_admin.current_header') ?>