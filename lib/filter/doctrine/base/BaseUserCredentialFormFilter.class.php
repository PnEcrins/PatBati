<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * UserCredential filter form base class.
 *
 * @package    filters
 * @subpackage UserCredential *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseUserCredentialFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'credentials' => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'credentials' => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('user_credential_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'UserCredential';
  }

  public function getFields()
  {
    return array(
      'user_id'     => 'Number',
      'credentials' => 'Text',
    );
  }
}