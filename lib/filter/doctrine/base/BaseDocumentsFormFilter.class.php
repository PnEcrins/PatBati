<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Documents filter form base class.
 *
 * @package    filters
 * @subpackage Documents *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseDocumentsFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexbatiment'  => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'date_document'  => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'fichier_source' => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'indexbatiment'  => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'date_document'  => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'fichier_source' => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('documents_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Documents';
  }

  public function getFields()
  {
    return array(
      'indexdocument'  => 'Number',
      'indexbatiment'  => 'ForeignKey',
      'date_document'  => 'Date',
      'fichier_source' => 'Text',
    );
  }
}