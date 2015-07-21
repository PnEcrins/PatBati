<?php

/**
 * RelMatgeMeo form base class.
 *
 * @package    form
 * @subpackage rel_matge_meo
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelMatgeMeoForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codematge' => new sfWidgetFormInputHidden(),
      'codemeo'   => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'codematge' => new sfValidatorDoctrineChoice(array('model' => 'RelMatgeMeo', 'column' => 'codematge', 'required' => false)),
      'codemeo'   => new sfValidatorDoctrineChoice(array('model' => 'RelMatgeMeo', 'column' => 'codemeo', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_matge_meo[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelMatgeMeo';
  }

}
