<?php

/**
 * CorRoleDroitApplication form base class.
 *
 * @package    form
 * @subpackage cor_role_droit_application
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseCorRoleDroitApplicationForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'id'             => new sfWidgetFormInputHidden(),
      'id_role'        => new sfWidgetFormInput(),
      'id_droit'       => new sfWidgetFormInput(),
      'id_application' => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'id'             => new sfValidatorDoctrineChoice(array('model' => 'CorRoleDroitApplication', 'column' => 'id', 'required' => false)),
      'id_role'        => new sfValidatorInteger(),
      'id_droit'       => new sfValidatorInteger(),
      'id_application' => new sfValidatorInteger(),
    ));

    $this->widgetSchema->setNameFormat('cor_role_droit_application[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'CorRoleDroitApplication';
  }

}
