<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * CorRoleDroitApplication filter form base class.
 *
 * @package    filters
 * @subpackage CorRoleDroitApplication *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseCorRoleDroitApplicationFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'id_role'        => new sfWidgetFormFilterInput(),
      'id_droit'       => new sfWidgetFormFilterInput(),
      'id_application' => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'id_role'        => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'id_droit'       => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'id_application' => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
    ));

    $this->widgetSchema->setNameFormat('cor_role_droit_application_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'CorRoleDroitApplication';
  }

  public function getFields()
  {
    return array(
      'id'             => 'Number',
      'id_role'        => 'Number',
      'id_droit'       => 'Number',
      'id_application' => 'Number',
    );
  }
}