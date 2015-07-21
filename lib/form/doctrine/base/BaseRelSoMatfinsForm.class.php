<?php

/**
 * RelSoMatfins form base class.
 *
 * @package    form
 * @subpackage rel_so_matfins
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelSoMatfinsForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexso'      => new sfWidgetFormInputHidden(),
      'codematfins'  => new sfWidgetFormInputHidden(),
      'codefinition' => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'indexso'      => new sfValidatorDoctrineChoice(array('model' => 'RelSoMatfins', 'column' => 'indexso', 'required' => false)),
      'codematfins'  => new sfValidatorDoctrineChoice(array('model' => 'RelSoMatfins', 'column' => 'codematfins', 'required' => false)),
      'codefinition' => new sfValidatorDoctrineChoice(array('model' => 'RelSoMatfins', 'column' => 'codefinition', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_so_matfins[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelSoMatfins';
  }

}
