<?php

/**
 * BibElementPaysager form base class.
 *
 * @package    form
 * @subpackage bib_element_paysager
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibElementPaysagerForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeep'              => new sfWidgetFormInputHidden(),
      'naturels_construits' => new sfWidgetFormInput(),
      'elements_paysagers'  => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codeep'              => new sfValidatorDoctrineChoice(array('model' => 'BibElementPaysager', 'column' => 'codeep', 'required' => false)),
      'naturels_construits' => new sfValidatorString(array('max_length' => 1, 'required' => false)),
      'elements_paysagers'  => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_element_paysager[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibElementPaysager';
  }

}
