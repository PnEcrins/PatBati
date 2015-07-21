<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibClasseArchi filter form base class.
 *
 * @package    filters
 * @subpackage BibClasseArchi *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibClasseArchiFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'classe'     => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'classe'     => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_classe_archi_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibClasseArchi';
  }

  public function getFields()
  {
    return array(
      'codeclasse' => 'Number',
      'classe'     => 'Text',
    );
  }
}