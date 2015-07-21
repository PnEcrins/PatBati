<?php

/**
 * Document form base class.
 *
 * @package    form
 * @subpackage document
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseDocumentForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexdocument'  => new sfWidgetFormInputHidden(),
      'codepersonne'   => new sfWidgetFormDoctrineChoice(array('model' => 'BibPersonnes', 'add_empty' => true)),
      'indexbatiment'  => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'indexajaris'    => new sfWidgetFormInput(),
      'date_document'  => new sfWidgetFormDate(),
      'fichier_source' => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'indexdocument'  => new sfValidatorDoctrineChoice(array('model' => 'Document', 'column' => 'indexdocument', 'required' => false)),
      'codepersonne'   => new sfValidatorDoctrineChoice(array('model' => 'BibPersonnes', 'required' => false)),
      'indexbatiment'  => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'indexajaris'    => new sfValidatorInteger(array('required' => false)),
      'date_document'  => new sfValidatorDate(array('required' => false)),
      'fichier_source' => new sfValidatorString(array('max_length' => 100, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('document[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Document';
  }

}
