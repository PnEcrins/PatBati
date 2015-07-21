<?php

/**
 * CorRoles form base class.
 *
 * @package    form
 * @subpackage cor_roles
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseCorRolesForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'id'                  => new sfWidgetFormInputHidden(),
      'id_role_groupe'      => new sfWidgetFormInput(),
      'id_role_utilisateur' => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'id'                  => new sfValidatorDoctrineChoice(array('model' => 'CorRoles', 'column' => 'id', 'required' => false)),
      'id_role_groupe'      => new sfValidatorInteger(),
      'id_role_utilisateur' => new sfValidatorInteger(),
    ));

    $this->widgetSchema->setNameFormat('cor_roles[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'CorRoles';
  }

}
