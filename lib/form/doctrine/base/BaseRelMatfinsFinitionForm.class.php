<?php

/**
 * RelMatfinsFinition form base class.
 *
 * @package    form
 * @subpackage rel_matfins_finition
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelMatfinsFinitionForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codematfins'  => new sfWidgetFormInputHidden(),
      'codefinition' => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'codematfins'  => new sfValidatorDoctrineChoice(array('model' => 'RelMatfinsFinition', 'column' => 'codematfins', 'required' => false)),
      'codefinition' => new sfValidatorDoctrineChoice(array('model' => 'RelMatfinsFinition', 'column' => 'codefinition', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_matfins_finition[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelMatfinsFinition';
  }

}
