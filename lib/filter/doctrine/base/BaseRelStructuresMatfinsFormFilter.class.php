<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * RelStructuresMatfins filter form base class.
 *
 * @package    filters
 * @subpackage RelStructuresMatfins *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseRelStructuresMatfinsFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
    ));

    $this->setValidators(array(
    ));

    $this->widgetSchema->setNameFormat('rel_structures_matfins_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelStructuresMatfins';
  }

  public function getFields()
  {
    return array(
      'indexstructure' => 'Number',
      'codematfins'    => 'Number',
      'codefinition'   => 'Number',
    );
  }
}