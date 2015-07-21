<?php

/**
 * Equipements form base class.
 *
 * @package    form
 * @subpackage equipements
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseEquipementsForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexequipement'  => new sfWidgetFormInputHidden(),
      'codeequipement'   => new sfWidgetFormDoctrineChoice(array('model' => 'BibEquipement', 'add_empty' => false)),
      'codeconservation' => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => false)),
      'indexbatiment'    => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'info_equip'       => new sfWidgetFormInput(),
      'equipement_rem'   => new sfWidgetFormInputCheckbox(),
    ));

    $this->setValidators(array(
      'indexequipement'  => new sfValidatorDoctrineChoice(array('model' => 'Equipements', 'column' => 'indexequipement', 'required' => false)),
      'codeequipement'   => new sfValidatorDoctrineChoice(array('model' => 'BibEquipement')),
      'codeconservation' => new sfValidatorDoctrineChoice(array('model' => 'BibConservation')),
      'indexbatiment'    => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'info_equip'       => new sfValidatorString(array('max_length' => 200, 'required' => false)),
      'equipement_rem'   => new sfValidatorBoolean(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('equipements[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Equipements';
  }

}
