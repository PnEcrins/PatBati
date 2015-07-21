<?php

/**
 * BibUsage form base class.
 *
 * @package    form
 * @subpackage bib_usage
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibUsageForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeusage' => new sfWidgetFormInputHidden(),
      'usage'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codeusage' => new sfValidatorDoctrineChoice(array('model' => 'BibUsage', 'column' => 'codeusage', 'required' => false)),
      'usage'     => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_usage[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibUsage';
  }

}
