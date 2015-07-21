<?php

/**
 * RelProtection form base class.
 *
 * @package    form
 * @subpackage rel_protection
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelProtectionForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexbatiment'  => new sfWidgetFormInputHidden(),
      'codeprotection' => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'indexbatiment'  => new sfValidatorDoctrineChoice(array('model' => 'RelProtection', 'column' => 'indexbatiment', 'required' => false)),
      'codeprotection' => new sfValidatorDoctrineChoice(array('model' => 'RelProtection', 'column' => 'codeprotection', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_protection[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelProtection';
  }

}
