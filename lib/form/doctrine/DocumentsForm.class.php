<?php

/**
 * Documents form.
 *
 * @package    form
 * @subpackage Documents
 * @version    SVN: $Id: sfDoctrineFormTemplate.php 6174 2007-11-27 06:22:40Z fabien $
 */
class DocumentsForm extends BaseDocumentsForm
{
	public function configure()
	{
		$yamlConf = sfYaml::load(sfConfig::get('sf_apps_dir').'/backend/config/app.yml');

		$this->setWidget('fichier_source', new sfWidgetFormInputFileEditable(
		array('file_src'=> $yamlConf['all']['document_upload_dir'].$this->getObject()->getFichierSource(),
		'with_delete' => false,
		'edit_mode' => false
		)));
		$this->validatorSchema['fichier_source'] = new sfValidatorFile(array(
  			'required' => false,
			'path' => $yamlConf['all']['document_upload_dir'],
		));
			
		$this->validatorSchema['date_document'] = new sfValidatorDate(array('required' => false, 'date_format' => '~(?P<day>\d{2})/(?P<month>\d{2})/(?P<year>\d{2})~'));
	}

	protected function saveFile($field, $filename = null, sfValidatedFile $file = null)
	{
		if (!$this->validatorSchema[$field] instanceof sfValidatorFile)
		{
			throw new LogicException(sprintf('You cannot save the current file for field "%s" as the field is not a file.', $field));
		}
		if (is_null($file))
		{
			$file = $this->getValue($field);
		}

		$method = sprintf('generate%sFilename', $field);

		$filename = $file->getOriginalName();
		$filename = time().$filename;

		if (!is_null($filename))
		{

			return $file->save($filename);
		}
		else if (method_exists($this->object, $method))
		{
			return $file->save($this->object->$method($file));
		}
		else
		{
			return $file->save();
		}
	}
}