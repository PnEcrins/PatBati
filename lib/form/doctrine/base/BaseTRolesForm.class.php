<?php

/**
 * TRoles form base class.
 *
 * @package    form
 * @subpackage t_roles
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseTRolesForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'groupe'        => new sfWidgetFormInput(),
      'id_role'       => new sfWidgetFormInput(),
      'identifiant'   => new sfWidgetFormInputHidden(),
      'nom_role'      => new sfWidgetFormInput(),
      'prenom_role'   => new sfWidgetFormInput(),
      'desc_role'     => new sfWidgetFormTextarea(),
      'pass'          => new sfWidgetFormInput(),
      'email'         => new sfWidgetFormInput(),
      'organisme'     => new sfWidgetFormInput(),
      'id_unite'      => new sfWidgetFormInput(),
      'pne'           => new sfWidgetFormInput(),
      'assermentes'   => new sfWidgetFormInput(),
      'enposte'       => new sfWidgetFormInput(),
      'dernieracces'  => new sfWidgetFormDate(),
      'session_appli' => new sfWidgetFormInput(),
      'date_insert'   => new sfWidgetFormDate(),
      'date_update'   => new sfWidgetFormDate(),
    ));

    $this->setValidators(array(
      'groupe'        => new sfValidatorInteger(),
      'id_role'       => new sfValidatorInteger(),
      'identifiant'   => new sfValidatorDoctrineChoice(array('model' => 'TRoles', 'column' => 'identifiant', 'required' => false)),
      'nom_role'      => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'prenom_role'   => new sfValidatorString(array('max_length' => 100, 'required' => false)),
      'desc_role'     => new sfValidatorString(array('max_length' => 500, 'required' => false)),
      'pass'          => new sfValidatorString(array('max_length' => 100, 'required' => false)),
      'email'         => new sfValidatorString(array('max_length' => 250, 'required' => false)),
      'organisme'     => new sfValidatorString(array('max_length' => 32, 'required' => false)),
      'id_unite'      => new sfValidatorInteger(array('required' => false)),
      'pne'           => new sfValidatorInteger(array('required' => false)),
      'assermentes'   => new sfValidatorInteger(array('required' => false)),
      'enposte'       => new sfValidatorInteger(array('required' => false)),
      'dernieracces'  => new sfValidatorDate(array('required' => false)),
      'session_appli' => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'date_insert'   => new sfValidatorDate(array('required' => false)),
      'date_update'   => new sfValidatorDate(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('t_roles[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'TRoles';
  }

}
