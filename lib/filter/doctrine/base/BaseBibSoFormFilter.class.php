<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibSo filter form base class.
 *
 * @package    filters
 * @subpackage BibSo *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibSoFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'second_oeuvre' => new sfWidgetFormFilterInput(),
      'codetypeso'    => new sfWidgetFormDoctrineChoice(array('model' => 'BibTypeSo', 'add_empty' => true)),
    ));

    $this->setValidators(array(
      'second_oeuvre' => new sfValidatorPass(array('required' => false)),
      'codetypeso'    => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibTypeSo', 'column' => 'codetypeso')),
    ));

    $this->widgetSchema->setNameFormat('bib_so_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibSo';
  }

  public function getFields()
  {
    return array(
      'codeso'        => 'Number',
      'second_oeuvre' => 'Text',
      'codetypeso'    => 'ForeignKey',
    );
  }
}