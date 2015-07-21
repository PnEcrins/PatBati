<?php

/**
 * RelMasque form base class.
 *
 * @package    form
 * @subpackage rel_masque
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelMasqueForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codemasque'    => new sfWidgetFormInputHidden(),
      'indexbatiment' => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'codemasque'    => new sfValidatorDoctrineChoice(array('model' => 'RelMasque', 'column' => 'codemasque', 'required' => false)),
      'indexbatiment' => new sfValidatorDoctrineChoice(array('model' => 'RelMasque', 'column' => 'indexbatiment', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_masque[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelMasque';
  }

}
