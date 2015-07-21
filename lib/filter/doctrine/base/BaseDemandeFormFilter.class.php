<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Demande filter form base class.
 *
 * @package    filters
 * @subpackage Demande *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseDemandeFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexbatiment' => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'demandep'      => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
      'autorisationp' => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
      'date_permis'   => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'num_permis'    => new sfWidgetFormFilterInput(),
      'date_demandep' => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
    ));

    $this->setValidators(array(
      'indexbatiment' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'demandep'      => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
      'autorisationp' => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
      'date_permis'   => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'num_permis'    => new sfValidatorPass(array('required' => false)),
      'date_demandep' => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
    ));

    $this->widgetSchema->setNameFormat('demande_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Demande';
  }

  public function getFields()
  {
    return array(
      'indexdemande'  => 'Number',
      'indexbatiment' => 'ForeignKey',
      'demandep'      => 'Boolean',
      'autorisationp' => 'Boolean',
      'date_permis'   => 'Date',
      'num_permis'    => 'Text',
      'date_demandep' => 'Date',
    );
  }
}