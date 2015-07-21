<?php

/**
 * BibPersonnes form base class.
 *
 * @package    form
 * @subpackage bib_personnes
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibPersonnesForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codepersonne' => new sfWidgetFormInputHidden(),
      'personne'     => new sfWidgetFormInput(),
      'descriptif'   => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codepersonne' => new sfValidatorDoctrineChoice(array('model' => 'BibPersonnes', 'column' => 'codepersonne', 'required' => false)),
      'personne'     => new sfValidatorString(array('max_length' => 50)),
      'descriptif'   => new sfValidatorString(array('max_length' => 100, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_personnes[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibPersonnes';
  }

}
