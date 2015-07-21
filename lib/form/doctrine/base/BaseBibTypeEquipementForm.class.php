<?php

/**
 * BibTypeEquipement form base class.
 *
 * @package    form
 * @subpackage bib_type_equipement
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibTypeEquipementForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codetypeequip' => new sfWidgetFormInputHidden(),
      'type_equip'    => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codetypeequip' => new sfValidatorDoctrineChoice(array('model' => 'BibTypeEquipement', 'column' => 'codetypeequip', 'required' => false)),
      'type_equip'    => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_type_equipement[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibTypeEquipement';
  }

}
