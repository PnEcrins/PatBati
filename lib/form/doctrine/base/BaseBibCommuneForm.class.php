<?php

/**
 * BibCommune form base class.
 *
 * @package    form
 * @subpackage bib_commune
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibCommuneForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeinsee'   => new sfWidgetFormInputHidden(),
      'codecanton'  => new sfWidgetFormDoctrineChoice(array('model' => 'BibCanton', 'add_empty' => false)),
      'codesecteur' => new sfWidgetFormDoctrineChoice(array('model' => 'BibSecteur', 'add_empty' => false)),
      'commune'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codeinsee'   => new sfValidatorDoctrineChoice(array('model' => 'BibCommune', 'column' => 'codeinsee', 'required' => false)),
      'codecanton'  => new sfValidatorDoctrineChoice(array('model' => 'BibCanton')),
      'codesecteur' => new sfValidatorDoctrineChoice(array('model' => 'BibSecteur')),
      'commune'     => new sfValidatorString(array('max_length' => 30, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_commune[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibCommune';
  }

}
