<?php

/**
 * ElementsPaysagers form base class.
 *
 * @package    form
 * @subpackage elements_paysagers
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseElementsPaysagersForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexep'          => new sfWidgetFormInputHidden(),
      'codeep'           => new sfWidgetFormDoctrineChoice(array('model' => 'BibElementPaysager', 'add_empty' => false)),
      'codeconservation' => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => false)),
      'indexbatiment'    => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'info_ep'          => new sfWidgetFormInput(),
      'ep_rem'           => new sfWidgetFormInputCheckbox(),
    ));

    $this->setValidators(array(
      'indexep'          => new sfValidatorDoctrineChoice(array('model' => 'ElementsPaysagers', 'column' => 'indexep', 'required' => false)),
      'codeep'           => new sfValidatorDoctrineChoice(array('model' => 'BibElementPaysager')),
      'codeconservation' => new sfValidatorDoctrineChoice(array('model' => 'BibConservation')),
      'indexbatiment'    => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'info_ep'          => new sfValidatorString(array('max_length' => 200, 'required' => false)),
      'ep_rem'           => new sfValidatorBoolean(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('elements_paysagers[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'ElementsPaysagers';
  }

}
