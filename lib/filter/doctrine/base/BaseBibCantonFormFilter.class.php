<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibCanton filter form base class.
 *
 * @package    filters
 * @subpackage BibCanton *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibCantonFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'canton'     => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'canton'     => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_canton_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibCanton';
  }

  public function getFields()
  {
    return array(
      'codecanton' => 'Number',
      'canton'     => 'Text',
    );
  }
}