<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibExposition filter form base class.
 *
 * @package    filters
 * @subpackage BibExposition *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibExpositionFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'nomexposition'   => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'nomexposition'   => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_exposition_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibExposition';
  }

  public function getFields()
  {
    return array(
      'indexexposition' => 'Number',
      'nomexposition'   => 'Text',
    );
  }
}