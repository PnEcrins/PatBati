<?php

/**
 * BibNotepatri form base class.
 *
 * @package    form
 * @subpackage bib_notepatri
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibNotepatriForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexnotepatri' => new sfWidgetFormInputHidden(),
      'valnotepatri'   => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'indexnotepatri' => new sfValidatorDoctrineChoice(array('model' => 'BibNotepatri', 'column' => 'indexnotepatri', 'required' => false)),
      'valnotepatri'   => new sfValidatorInteger(),
    ));

    $this->widgetSchema->setNameFormat('bib_notepatri[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibNotepatri';
  }

}
