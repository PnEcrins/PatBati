<?php

/**
 * BibIllustration form base class.
 *
 * @package    form
 * @subpackage bib_illustration
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibIllustrationForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeillustration'   => new sfWidgetFormInputHidden(),
      'illustration'       => new sfWidgetFormInput(),
      'ordre_illustration' => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codeillustration'   => new sfValidatorDoctrineChoice(array('model' => 'BibIllustration', 'column' => 'codeillustration', 'required' => false)),
      'illustration'       => new sfValidatorString(array('max_length' => 50)),
      'ordre_illustration' => new sfValidatorInteger(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_illustration[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibIllustration';
  }

}
