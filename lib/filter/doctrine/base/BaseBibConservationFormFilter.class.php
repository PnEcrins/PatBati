<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibConservation filter form base class.
 *
 * @package    filters
 * @subpackage BibConservation *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibConservationFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'conservation'     => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'conservation'     => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_conservation_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibConservation';
  }

  public function getFields()
  {
    return array(
      'codeconservation' => 'Number',
      'conservation'     => 'Text',
    );
  }
}