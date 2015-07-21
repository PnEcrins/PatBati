<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibElementPaysager filter form base class.
 *
 * @package    filters
 * @subpackage BibElementPaysager *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibElementPaysagerFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'naturels_construits' => new sfWidgetFormFilterInput(),
      'elements_paysagers'  => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'naturels_construits' => new sfValidatorPass(array('required' => false)),
      'elements_paysagers'  => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_element_paysager_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibElementPaysager';
  }

  public function getFields()
  {
    return array(
      'codeep'              => 'Number',
      'naturels_construits' => 'Text',
      'elements_paysagers'  => 'Text',
    );
  }
}