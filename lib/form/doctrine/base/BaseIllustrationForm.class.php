<?php

/**
 * Illustration form base class.
 *
 * @package    form
 * @subpackage illustration
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseIllustrationForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexilustration'  => new sfWidgetFormInputHidden(),
      'codeillustration'  => new sfWidgetFormDoctrineChoice(array('model' => 'BibIllustration', 'add_empty' => false)),
      'codepersonne'      => new sfWidgetFormDoctrineChoice(array('model' => 'BibPersonnes', 'add_empty' => true)),
      'indexbatiment'     => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'indexajaris'       => new sfWidgetFormInput(),
      'date_illustration' => new sfWidgetFormDate(),
      'vignette'          => new sfWidgetFormInput(),
      'fichier_source'    => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'indexilustration'  => new sfValidatorDoctrineChoice(array('model' => 'Illustration', 'column' => 'indexilustration', 'required' => false)),
      'codeillustration'  => new sfValidatorDoctrineChoice(array('model' => 'BibIllustration')),
      'codepersonne'      => new sfValidatorDoctrineChoice(array('model' => 'BibPersonnes', 'required' => false)),
      'indexbatiment'     => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'indexajaris'       => new sfValidatorInteger(array('required' => false)),
      'date_illustration' => new sfValidatorDate(array('required' => false)),
      'vignette'          => new sfValidatorString(array('max_length' => 100, 'required' => false)),
      'fichier_source'    => new sfValidatorString(array('max_length' => 100, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('illustration[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Illustration';
  }

}
