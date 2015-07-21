<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibEquipement filter form base class.
 *
 * @package    filters
 * @subpackage BibEquipement *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibEquipementFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'equipement'     => new sfWidgetFormFilterInput(),
      'codetypeequip'  => new sfWidgetFormDoctrineChoice(array('model' => 'BibTypeEquipement', 'add_empty' => true)),
    ));

    $this->setValidators(array(
      'equipement'     => new sfValidatorPass(array('required' => false)),
      'codetypeequip'  => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibTypeEquipement', 'column' => 'codetypeequip')),
    ));

    $this->widgetSchema->setNameFormat('bib_equipement_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibEquipement';
  }

  public function getFields()
  {
    return array(
      'codeequipement' => 'Number',
      'equipement'     => 'Text',
      'codetypeequip'  => 'ForeignKey',
    );
  }
}