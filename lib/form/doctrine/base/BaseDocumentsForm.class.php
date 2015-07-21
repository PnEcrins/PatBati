<?php

/**
 * Documents form base class.
 *
 * @package    form
 * @subpackage documents
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseDocumentsForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexdocument'  => new sfWidgetFormInputHidden(),
      'indexbatiment'  => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'date_document'  => new sfWidgetFormDate(),
      'fichier_source' => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'indexdocument'  => new sfValidatorDoctrineChoice(array('model' => 'Documents', 'column' => 'indexdocument', 'required' => false)),
      'indexbatiment'  => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'date_document'  => new sfValidatorDate(array('required' => false)),
      'fichier_source' => new sfValidatorString(array('max_length' => 100, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('documents[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Documents';
  }

}
