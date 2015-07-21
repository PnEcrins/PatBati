<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibCommune filter form base class.
 *
 * @package    filters
 * @subpackage BibCommune *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibCommuneFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codecanton'  => new sfWidgetFormDoctrineChoice(array('model' => 'BibCanton', 'add_empty' => true)),
      'codesecteur' => new sfWidgetFormDoctrineChoice(array('model' => 'BibSecteur', 'add_empty' => true)),
      'commune'     => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'codecanton'  => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibCanton', 'column' => 'codecanton')),
      'codesecteur' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibSecteur', 'column' => 'codesecteur')),
      'commune'     => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_commune_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibCommune';
  }

  public function getFields()
  {
    return array(
      'codeinsee'   => 'Text',
      'codecanton'  => 'ForeignKey',
      'codesecteur' => 'ForeignKey',
      'commune'     => 'Text',
    );
  }
}