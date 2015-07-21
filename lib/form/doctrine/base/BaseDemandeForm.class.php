<?php

/**
 * Demande form base class.
 *
 * @package    form
 * @subpackage demande
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseDemandeForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexdemande'  => new sfWidgetFormInputHidden(),
      'indexbatiment' => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'demandep'      => new sfWidgetFormInputCheckbox(),
      'autorisationp' => new sfWidgetFormInputCheckbox(),
      'date_permis'   => new sfWidgetFormDate(),
      'num_permis'    => new sfWidgetFormInput(),
      'date_demandep' => new sfWidgetFormDate(),
    ));

    $this->setValidators(array(
      'indexdemande'  => new sfValidatorDoctrineChoice(array('model' => 'Demande', 'column' => 'indexdemande', 'required' => false)),
      'indexbatiment' => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'demandep'      => new sfValidatorBoolean(array('required' => false)),
      'autorisationp' => new sfValidatorBoolean(array('required' => false)),
      'date_permis'   => new sfValidatorDate(array('required' => false)),
      'num_permis'    => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'date_demandep' => new sfValidatorDate(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('demande[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Demande';
  }

}
