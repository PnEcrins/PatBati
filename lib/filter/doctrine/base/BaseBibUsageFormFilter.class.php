<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibUsage filter form base class.
 *
 * @package    filters
 * @subpackage BibUsage *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibUsageFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'usage'     => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'usage'     => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_usage_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibUsage';
  }

  public function getFields()
  {
    return array(
      'codeusage' => 'Number',
      'usage'     => 'Text',
    );
  }
}