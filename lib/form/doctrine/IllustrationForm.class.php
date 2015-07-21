<?php

/**
 * Illustration form.
 *
 * @package    form
 * @subpackage Illustration
 * @version    SVN: $Id: sfDoctrineFormTemplate.php 6174 2007-11-27 06:22:40Z fabien $
 */
class IllustrationForm extends BaseIllustrationForm
{
	public function configure()
	{
		$yamlConf = sfYaml::load(sfConfig::get('sf_apps_dir').'/backend/config/app.yml');

		parent::configure();
		$this->setWidget('vignette', new sfWidgetFormInputFileEditable(
		array('file_src'=> $yamlConf['all']['images_upload_dir'].$this->getObject()->getVignette(),'with_delete' => false
		)));

		// attention, cette ligne est absolument indispensable, sinon
		// la valeur de fichier sera "Array", apr�s �tre pass� dans convertFileInformation($this->taintedFiles)) dans la class
		// sfForm
		$this->validatorSchema['vignette'] = new sfValidatorFile(array(
  			'required' => false,
			'path' => $yamlConf['all']['images_upload_dir'],
		));
		$this->validatorSchema['vignette_delete'] = new sfValidatorBoolean();

		$this->setWidget('fichier_source', new sfWidgetFormInputFileEditable(
		array('file_src'=> $yamlConf['all']['images_upload_dir'].$this->getObject()->getFichierSource(),
		'with_delete' => false,
		'edit_mode' => false
		)));

		// attention, cette ligne est absolument indispensable, sinon
		// la valeur de fichier sera "Array", apr�s �tre pass� dans convertFileInformation($this->taintedFiles)) dans la class
		// sfForm
		$this->validatorSchema['fichier_source'] = new sfValidatorFile(array(
  			'required' => false,
			'path' => $yamlConf['all']['images_upload_dir'],
		));
		$this->validatorSchema['date_illustration'] = new sfValidatorDate(array('required' => false, 'date_format' => '~(?P<day>\d{2})/(?P<month>\d{2})/(?P<year>\d{2})~'));
	}
}