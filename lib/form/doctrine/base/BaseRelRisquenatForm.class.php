<?php

/**
 * RelRisquenat form base class.
 *
 * @package    form
 * @subpackage rel_risquenat
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelRisquenatForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexbatiment' => new sfWidgetFormInputHidden(),
      'coderisque'    => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'indexbatiment' => new sfValidatorDoctrineChoice(array('model' => 'RelRisquenat', 'column' => 'indexbatiment', 'required' => false)),
      'coderisque'    => new sfValidatorDoctrineChoice(array('model' => 'RelRisquenat', 'column' => 'coderisque', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_risquenat[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelRisquenat';
  }

}
