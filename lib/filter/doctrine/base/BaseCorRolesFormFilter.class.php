<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * CorRoles filter form base class.
 *
 * @package    filters
 * @subpackage CorRoles *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseCorRolesFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'id_role_groupe'      => new sfWidgetFormFilterInput(),
      'id_role_utilisateur' => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'id_role_groupe'      => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'id_role_utilisateur' => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
    ));

    $this->widgetSchema->setNameFormat('cor_roles_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'CorRoles';
  }

  public function getFields()
  {
    return array(
      'id'                  => 'Number',
      'id_role_groupe'      => 'Number',
      'id_role_utilisateur' => 'Number',
    );
  }
}