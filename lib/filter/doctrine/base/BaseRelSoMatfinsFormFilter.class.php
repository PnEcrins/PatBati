<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * RelSoMatfins filter form base class.
 *
 * @package    filters
 * @subpackage RelSoMatfins *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseRelSoMatfinsFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
    ));

    $this->setValidators(array(
    ));

    $this->widgetSchema->setNameFormat('rel_so_matfins_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelSoMatfins';
  }

  public function getFields()
  {
    return array(
      'indexso'      => 'Number',
      'codematfins'  => 'Number',
      'codefinition' => 'Number',
    );
  }
}