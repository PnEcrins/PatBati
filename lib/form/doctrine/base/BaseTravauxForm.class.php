<?php

/**
 * Travaux form base class.
 *
 * @package    form
 * @subpackage travaux
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseTravauxForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indextravaux'   => new sfWidgetFormInputHidden(),
      'codeusage'      => new sfWidgetFormDoctrineChoice(array('model' => 'BibUsage', 'add_empty' => false)),
      'codenature'     => new sfWidgetFormDoctrineChoice(array('model' => 'BibNature', 'add_empty' => false)),
      'indexdemande'   => new sfWidgetFormDoctrineChoice(array('model' => 'Demande', 'add_empty' => false)),
      'date_travaux'   => new sfWidgetFormDate(),
      'autorisation'   => new sfWidgetFormInputCheckbox(),
      'subvention_pne' => new sfWidgetFormInput(),
    ));

    $this->setValidators(array(
      'indextravaux'   => new sfValidatorDoctrineChoice(array('model' => 'Travaux', 'column' => 'indextravaux', 'required' => false)),
      'codeusage'      => new sfValidatorDoctrineChoice(array('model' => 'BibUsage')),
      'codenature'     => new sfValidatorDoctrineChoice(array('model' => 'BibNature')),
      'indexdemande'   => new sfValidatorDoctrineChoice(array('model' => 'Demande')),
      'date_travaux'   => new sfValidatorDate(array('required' => false)),
      'autorisation'   => new sfValidatorBoolean(array('required' => false)),
      'subvention_pne' => new sfValidatorInteger(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('travaux[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Travaux';
  }

}
