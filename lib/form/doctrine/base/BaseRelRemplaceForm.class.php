<?php

/**
 * RelRemplace form base class.
 *
 * @package    form
 * @subpackage rel_remplace
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelRemplaceForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexstructure_ancien'  => new sfWidgetFormInputHidden(),
      'indexstructure_nouveau' => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'indexstructure_ancien'  => new sfValidatorDoctrineChoice(array('model' => 'RelRemplace', 'column' => 'indexstructure_ancien', 'required' => false)),
      'indexstructure_nouveau' => new sfValidatorDoctrineChoice(array('model' => 'RelRemplace', 'column' => 'indexstructure_nouveau', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_remplace[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelRemplace';
  }

}
