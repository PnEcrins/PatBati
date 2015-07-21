<?php

/**
 * BibConservation form base class.
 *
 * @package    form
 * @subpackage bib_conservation
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibConservationForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeconservation' => new sfWidgetFormInputHidden(),
      'conservation'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codeconservation' => new sfValidatorDoctrineChoice(array('model' => 'BibConservation', 'column' => 'codeconservation', 'required' => false)),
      'conservation'     => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_conservation[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibConservation';
  }

}
