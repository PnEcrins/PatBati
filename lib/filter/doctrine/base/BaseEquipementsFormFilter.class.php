<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Equipements filter form base class.
 *
 * @package    filters
 * @subpackage Equipements *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseEquipementsFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeequipement'   => new sfWidgetFormDoctrineChoice(array('model' => 'BibEquipement', 'add_empty' => true)),
      'codeconservation' => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => true)),
      'indexbatiment'    => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'info_equip'       => new sfWidgetFormFilterInput(),
      'equipement_rem'   => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
    ));

    $this->setValidators(array(
      'codeequipement'   => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibEquipement', 'column' => 'codeequipement')),
      'codeconservation' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibConservation', 'column' => 'codeconservation')),
      'indexbatiment'    => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'info_equip'       => new sfValidatorPass(array('required' => false)),
      'equipement_rem'   => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
    ));

    $this->widgetSchema->setNameFormat('equipements_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Equipements';
  }

  public function getFields()
  {
    return array(
      'indexequipement'  => 'Number',
      'codeequipement'   => 'ForeignKey',
      'codeconservation' => 'ForeignKey',
      'indexbatiment'    => 'ForeignKey',
      'info_equip'       => 'Text',
      'equipement_rem'   => 'Boolean',
    );
  }
}