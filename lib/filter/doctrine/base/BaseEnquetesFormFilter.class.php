<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Enquetes filter form base class.
 *
 * @package    filters
 * @subpackage Enquetes *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseEnquetesFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codepersonne'   => new sfWidgetFormDoctrineChoice(array('model' => 'BibPersonnes', 'add_empty' => true)),
      'indexbatiment'  => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'date_enquete'   => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'date_redaction' => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
    ));

    $this->setValidators(array(
      'codepersonne'   => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibPersonnes', 'column' => 'codepersonne')),
      'indexbatiment'  => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'date_enquete'   => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'date_redaction' => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
    ));

    $this->widgetSchema->setNameFormat('enquetes_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Enquetes';
  }

  public function getFields()
  {
    return array(
      'indexenquete'   => 'Number',
      'codepersonne'   => 'ForeignKey',
      'indexbatiment'  => 'ForeignKey',
      'date_enquete'   => 'Date',
      'date_redaction' => 'Date',
    );
  }
}