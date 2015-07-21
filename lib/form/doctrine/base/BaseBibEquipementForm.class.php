<?php

/**
 * BibEquipement form base class.
 *
 * @package    form
 * @subpackage bib_equipement
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibEquipementForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeequipement' => new sfWidgetFormInputHidden(),
      'equipement'     => new sfWidgetFormInput(),
      'codetypeequip'  => new sfWidgetFormDoctrineChoice(array('model' => 'BibTypeEquipement', 'add_empty' => false)),
    ));

    $this->setValidators(array(
      'codeequipement' => new sfValidatorDoctrineChoice(array('model' => 'BibEquipement', 'column' => 'codeequipement', 'required' => false)),
      'equipement'     => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'codetypeequip'  => new sfValidatorDoctrineChoice(array('model' => 'BibTypeEquipement')),
    ));

    $this->widgetSchema->setNameFormat('bib_equipement[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibEquipement';
  }

}
