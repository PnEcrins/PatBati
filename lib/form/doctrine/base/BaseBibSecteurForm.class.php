<?php

/**
 * BibSecteur form base class.
 *
 * @package    form
 * @subpackage bib_secteur
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibSecteurForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codesecteur' => new sfWidgetFormInputHidden(),
      'secteur'     => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'codesecteur' => new sfValidatorDoctrineChoice(array('model' => 'BibSecteur', 'column' => 'codesecteur', 'required' => false)),
      'secteur'     => new sfValidatorString(array('max_length' => 12, 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_secteur[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibSecteur';
  }

}
