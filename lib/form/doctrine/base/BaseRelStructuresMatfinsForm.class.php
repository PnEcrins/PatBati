<?php

/**
 * RelStructuresMatfins form base class.
 *
 * @package    form
 * @subpackage rel_structures_matfins
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelStructuresMatfinsForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexstructure' => new sfWidgetFormInputHidden(),
      'codematfins'    => new sfWidgetFormInputHidden(),
      'codefinition'   => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'indexstructure' => new sfValidatorDoctrineChoice(array('model' => 'RelStructuresMatfins', 'column' => 'indexstructure', 'required' => false)),
      'codematfins'    => new sfValidatorDoctrineChoice(array('model' => 'RelStructuresMatfins', 'column' => 'codematfins', 'required' => false)),
      'codefinition'   => new sfValidatorDoctrineChoice(array('model' => 'RelStructuresMatfins', 'column' => 'codefinition', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_structures_matfins[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelStructuresMatfins';
  }

}
