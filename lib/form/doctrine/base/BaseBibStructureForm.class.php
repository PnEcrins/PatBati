<?php

/**
 * BibStructure form base class.
 *
 * @package    form
 * @subpackage bib_structure
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibStructureForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codestructure' => new sfWidgetFormInputHidden(),
      'structure'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codestructure' => new sfValidatorDoctrineChoice(array('model' => 'BibStructure', 'column' => 'codestructure', 'required' => false)),
      'structure'     => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_structure[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibStructure';
  }

}
