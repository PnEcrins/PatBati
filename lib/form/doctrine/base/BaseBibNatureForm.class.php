<?php

/**
 * BibNature form base class.
 *
 * @package    form
 * @subpackage bib_nature
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibNatureForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codenature' => new sfWidgetFormInputHidden(),
      'nature'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codenature' => new sfValidatorDoctrineChoice(array('model' => 'BibNature', 'column' => 'codenature', 'required' => false)),
      'nature'     => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_nature[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibNature';
  }

}
