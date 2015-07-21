<?php

/**
 * BibCanton form base class.
 *
 * @package    form
 * @subpackage bib_canton
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibCantonForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codecanton' => new sfWidgetFormInputHidden(),
      'canton'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codecanton' => new sfValidatorDoctrineChoice(array('model' => 'BibCanton', 'column' => 'codecanton', 'required' => false)),
      'canton'     => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_canton[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibCanton';
  }

}
