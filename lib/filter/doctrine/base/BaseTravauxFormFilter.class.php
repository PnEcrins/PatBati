<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Travaux filter form base class.
 *
 * @package    filters
 * @subpackage Travaux *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseTravauxFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeusage'      => new sfWidgetFormDoctrineChoice(array('model' => 'BibUsage', 'add_empty' => true)),
      'codenature'     => new sfWidgetFormDoctrineChoice(array('model' => 'BibNature', 'add_empty' => true)),
      'indexdemande'   => new sfWidgetFormDoctrineChoice(array('model' => 'Demande', 'add_empty' => true)),
      'date_travaux'   => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'autorisation'   => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
      'subvention_pne' => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'codeusage'      => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibUsage', 'column' => 'codeusage')),
      'codenature'     => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibNature', 'column' => 'codenature')),
      'indexdemande'   => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Demande', 'column' => 'indexdemande')),
      'date_travaux'   => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'autorisation'   => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
      'subvention_pne' => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
    ));

    $this->widgetSchema->setNameFormat('travaux_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Travaux';
  }

  public function getFields()
  {
    return array(
      'indextravaux'   => 'Number',
      'codeusage'      => 'ForeignKey',
      'codenature'     => 'ForeignKey',
      'indexdemande'   => 'ForeignKey',
      'date_travaux'   => 'Date',
      'autorisation'   => 'Boolean',
      'subvention_pne' => 'Number',
    );
  }
}