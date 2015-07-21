[?php

require_once(dirname(__FILE__).'/../lib/Base<?php echo ucfirst($this->moduleName) ?>GeneratorConfiguration.class.php');
require_once(dirname(__FILE__).'/../lib/Base<?php echo ucfirst($this->moduleName) ?>GeneratorHelper.class.php');

/**
 * <?php echo $this->getModuleName() ?> actions.
 *
 * @package    ##PROJECT_NAME##
 * @subpackage <?php echo $this->getModuleName()."\n" ?>
 * @author     ##AUTHOR_NAME##
 * @version    SVN: $Id: actions.class.php 12493 2008-10-31 14:43:26Z fabien $
 */
class <?php echo $this->getGeneratedModuleName() ?>Actions extends sfBaseMmwExtjsActions
{
  public function preExecute()
  {
  	$this->json['data'] = array();
  	
    $this->configuration = new <?php echo $this->getModuleName() ?>GeneratorConfiguration();

    if (!$this->getUser()->hasCredential($this->configuration->getCredentials($this->getActionName())))
    {
      $this->forward(sfConfig::get('sf_secure_module'), sfConfig::get('sf_secure_action'));
    }

	// set credential info for extjs
	// this is used for extjs for example to hide the "save" button in form
	$this->json['credentials']['save'] = $this->getUser()->hasCredential($this->configuration->getCredentials('save'));
 	$this->json['credentials']['delete'] = $this->getUser()->hasCredential($this->configuration->getCredentials('delete'));
 	
 	// check if the user has admin rights, may be used for different purposes
 	$this->json['credentials']['admin'] = $this->getUser()->hasCredential($this->configuration->getCredentials('admin'));

    $this->dispatcher->notify(new sfEvent($this, 'admin.pre_execute', array('configuration' => $this->configuration)));

    $this->helper = new <?php echo $this->getModuleName() ?>GeneratorHelper();
  }


<?php include dirname(__FILE__).'/../../parts/jsonEncodeFunction.php' ?>

<?php include dirname(__FILE__).'/../../parts/indexAction.php' ?>


<?php /*if ($this->configuration->hasFilterForm()): ?>
<?php include dirname(__FILE__).'/../../parts/filterAction.php' ?>
<?php endif; */?>

<?php include dirname(__FILE__).'/../../parts/newAction.php' ?>

<?php include dirname(__FILE__).'/../../parts/createAction.php' ?>

<?php include dirname(__FILE__).'/../../parts/editAction.php' ?>

<?php include dirname(__FILE__).'/../../parts/updateAction.php' ?>

<?php include dirname(__FILE__).'/../../parts/deleteAction.php' ?>

<?php /*if ($this->configuration->getValue('list.batch_actions')): ?>
<?php include dirname(__FILE__).'/../../parts/batchAction.php' ?>
<?php endif; */?>

<?php include dirname(__FILE__).'/../../parts/processFormAction.php' ?>

<?php /*if ($this->configuration->hasFilterForm()): ?>
<?php include dirname(__FILE__).'/../../parts/filtersAction.php' ?>
<?php endif; */?>

<?php include dirname(__FILE__).'/../../parts/paginationAction.php' ?>

<?php include dirname(__FILE__).'/../../parts/sortingAction.php' ?>
}
