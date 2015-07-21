<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibPersonnes filter form base class.
 *
 * @package    filters
 * @subpackage BibPersonnes *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibPersonnesFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'personne'     => new sfWidgetFormFilterInput(),
      'descriptif'   => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'personne'     => new sfValidatorPass(array('required' => false)),
      'descriptif'   => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_personnes_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibPersonnes';
  }

  public function getFields()
  {
    return array(
      'codepersonne' => 'Number',
      'personne'     => 'Text',
      'descriptif'   => 'Text',
    );
  }
}