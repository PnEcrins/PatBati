<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * TRoles filter form base class.
 *
 * @package    filters
 * @subpackage TRoles *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseTRolesFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'groupe'        => new sfWidgetFormFilterInput(),
      'id_role'       => new sfWidgetFormFilterInput(),
      'nom_role'      => new sfWidgetFormFilterInput(),
      'prenom_role'   => new sfWidgetFormFilterInput(),
      'desc_role'     => new sfWidgetFormFilterInput(),
      'pass'          => new sfWidgetFormFilterInput(),
      'email'         => new sfWidgetFormFilterInput(),
      'organisme'     => new sfWidgetFormFilterInput(),
      'id_unite'      => new sfWidgetFormFilterInput(),
      'pn'           => new sfWidgetFormFilterInput(),
      'session_appli' => new sfWidgetFormFilterInput(),
      'date_insert'   => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'date_update'   => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
    ));

    $this->setValidators(array(
      'groupe'        => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'id_role'       => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'nom_role'      => new sfValidatorPass(array('required' => false)),
      'prenom_role'   => new sfValidatorPass(array('required' => false)),
      'desc_role'     => new sfValidatorPass(array('required' => false)),
      'pass'          => new sfValidatorPass(array('required' => false)),
      'email'         => new sfValidatorPass(array('required' => false)),
      'organisme'     => new sfValidatorPass(array('required' => false)),
      'id_unite'      => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'pn'           => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'session_appli' => new sfValidatorPass(array('required' => false)),
      'date_insert'   => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'date_update'   => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
    ));

    $this->widgetSchema->setNameFormat('t_roles_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'TRoles';
  }

  public function getFields()
  {
    return array(
      'groupe'        => 'Number',
      'id_role'       => 'Number',
      'identifiant'   => 'Text',
      'nom_role'      => 'Text',
      'prenom_role'   => 'Text',
      'desc_role'     => 'Text',
      'pass'          => 'Text',
      'email'         => 'Text',
      'organisme'     => 'Text',
      'id_unite'      => 'Number',
      'pn'           => 'Number',
      'session_appli' => 'Text',
      'date_insert'   => 'Date',
      'date_update'   => 'Date',
    );
  }
}