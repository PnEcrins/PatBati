<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibNature filter form base class.
 *
 * @package    filters
 * @subpackage BibNature *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibNatureFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'nature'     => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'nature'     => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_nature_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibNature';
  }

  public function getFields()
  {
    return array(
      'codenature' => 'Number',
      'nature'     => 'Text',
    );
  }
}