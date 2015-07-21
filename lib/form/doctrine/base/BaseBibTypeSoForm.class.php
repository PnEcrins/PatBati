<?php

/**
 * BibTypeSo form base class.
 *
 * @package    form
 * @subpackage bib_type_so
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibTypeSoForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codetypeso' => new sfWidgetFormInputHidden(),
      'type_so'    => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codetypeso' => new sfValidatorDoctrineChoice(array('model' => 'BibTypeSo', 'column' => 'codetypeso', 'required' => false)),
      'type_so'    => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_type_so[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibTypeSo';
  }

}
