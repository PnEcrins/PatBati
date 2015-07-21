<?php

/**
 * Enquetes form base class.
 *
 * @package    form
 * @subpackage enquetes
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseEnquetesForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexenquete'   => new sfWidgetFormInputHidden(),
      'codepersonne'   => new sfWidgetFormDoctrineChoice(array('model' => 'BibPersonnes', 'add_empty' => false)),
      'indexbatiment'  => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'date_enquete'   => new sfWidgetFormDate(),
      'date_redaction' => new sfWidgetFormDate(),
    ));

    $this->setValidators(array(
      'indexenquete'   => new sfValidatorDoctrineChoice(array('model' => 'Enquetes', 'column' => 'indexenquete', 'required' => false)),
      'codepersonne'   => new sfValidatorDoctrineChoice(array('model' => 'BibPersonnes')),
      'indexbatiment'  => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'date_enquete'   => new sfValidatorDate(array('required' => false)),
      'date_redaction' => new sfValidatorDate(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('enquetes[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Enquetes';
  }

}
