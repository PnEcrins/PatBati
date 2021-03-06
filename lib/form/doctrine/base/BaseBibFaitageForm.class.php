<?php

/**
 * BibFaitage form base class.
 *
 * @package    form
 * @subpackage bib_faitage
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibFaitageForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codefaitage' => new sfWidgetFormInputHidden(),
      'faitage'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codefaitage' => new sfValidatorDoctrineChoice(array('model' => 'BibFaitage', 'column' => 'codefaitage', 'required' => false)),
      'faitage'     => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_faitage[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibFaitage';
  }

}
