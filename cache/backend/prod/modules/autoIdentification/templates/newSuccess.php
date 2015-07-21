<?php use_helper('I18N', 'Date') ?>
<?php include_partial('identification/assets') ?>

<div id="sf_admin_container">
  <h1><?php echo __('New Identification', array(), 'messages') ?></h1>

  <?php include_partial('identification/flashes') ?>

  <div id="sf_admin_header">
    <?php include_partial('identification/form_header', array('identification' => $identification, 'form' => $form, 'configuration' => $configuration)) ?>
  </div>

  <div id="sf_admin_content">
    <?php include_partial('identification/form', array('identification' => $identification, 'form' => $form, 'configuration' => $configuration, 'helper' => $helper)) ?>
  </div>

  <div id="sf_admin_footer">
    <?php include_partial('identification/form_footer', array('identification' => $identification, 'form' => $form, 'configuration' => $configuration)) ?>
  </div>
</div>
