<?php

/**
 * BibClasseArchi form base class.
 *
 * @package    form
 * @subpackage bib_classe_archi
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibClasseArchiForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeclasse' => new sfWidgetFormInputHidden(),
      'classe'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codeclasse' => new sfValidatorDoctrineChoice(array('model' => 'BibClasseArchi', 'column' => 'codeclasse', 'required' => false)),
      'classe'     => new sfValidatorString(array('max_length' => 50, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_classe_archi[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibClasseArchi';
  }

}
