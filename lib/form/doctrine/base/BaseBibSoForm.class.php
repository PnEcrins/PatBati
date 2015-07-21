<?php

/**
 * BibSo form base class.
 *
 * @package    form
 * @subpackage bib_so
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibSoForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeso'        => new sfWidgetFormInputHidden(),
      'second_oeuvre' => new sfWidgetFormInput(),
      'codetypeso'    => new sfWidgetFormDoctrineChoice(array('model' => 'BibTypeSo', 'add_empty' => false)),
    ));

    $this->setValidators(array(
      'codeso'        => new sfValidatorDoctrineChoice(array('model' => 'BibSo', 'column' => 'codeso', 'required' => false)),
      'second_oeuvre' => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'codetypeso'    => new sfValidatorDoctrineChoice(array('model' => 'BibTypeSo')),
    ));

    $this->widgetSchema->setNameFormat('bib_so[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibSo';
  }

}
