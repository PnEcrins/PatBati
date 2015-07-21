<?php

/**
 * BibExposition form base class.
 *
 * @package    form
 * @subpackage bib_exposition
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibExpositionForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexexposition' => new sfWidgetFormInputHidden(),
      'nomexposition'   => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'indexexposition' => new sfValidatorDoctrineChoice(array('model' => 'BibExposition', 'column' => 'indexexposition', 'required' => false)),
      'nomexposition'   => new sfValidatorString(array('max_length' => 2)),
    ));

    $this->widgetSchema->setNameFormat('bib_exposition[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibExposition';
  }

}
