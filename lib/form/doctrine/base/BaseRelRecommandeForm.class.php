<?php

/**
 * RelRecommande form base class.
 *
 * @package    form
 * @subpackage rel_recommande
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseRelRecommandeForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeclasse' => new sfWidgetFormInputHidden(),
      'codenature' => new sfWidgetFormInputHidden(),
    ));

    $this->setValidators(array(
      'codeclasse' => new sfValidatorDoctrineChoice(array('model' => 'RelRecommande', 'column' => 'codeclasse', 'required' => false)),
      'codenature' => new sfValidatorDoctrineChoice(array('model' => 'RelRecommande', 'column' => 'codenature', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('rel_recommande[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'RelRecommande';
  }

}
