<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibTypeEquipement filter form base class.
 *
 * @package    filters
 * @subpackage BibTypeEquipement *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibTypeEquipementFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'type_equip'    => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'type_equip'    => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_type_equipement_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibTypeEquipement';
  }

  public function getFields()
  {
    return array(
      'codetypeequip' => 'Number',
      'type_equip'    => 'Text',
    );
  }
}