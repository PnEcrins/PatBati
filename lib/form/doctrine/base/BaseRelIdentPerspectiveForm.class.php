<?php

/**
 * RelIdentPerspective form base class.
 *
 * @package    form
 * @subpackage rel_ident_perspective
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelIdentPerspectiveForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexbatiment'   => new sfWidgetFormInputHidden(),
      'codeperspective' => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'indexbatiment'   => new sfValidatorDoctrineChoice(array('model' => 'RelIdentPerspective', 'column' => 'indexbatiment', 'required' => false)),
      'codeperspective' => new sfValidatorDoctrineChoice(array('model' => 'RelIdentPerspective', 'column' => 'codeperspective', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_ident_perspective[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelIdentPerspective';
  }

}
