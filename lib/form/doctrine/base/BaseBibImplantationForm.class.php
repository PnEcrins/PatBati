<?php

/**
 * BibImplantation form base class.
 *
 * @package    form
 * @subpackage bib_implantation
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibImplantationForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codepem' => new sfWidgetFormInputHidden(),
      'pem'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codepem' => new sfValidatorDoctrineChoice(array('model' => 'BibImplantation', 'column' => 'codepem', 'required' => false)),
      'pem'     => new sfValidatorString(array('max_length' => 10, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_implantation[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibImplantation';
  }

}
