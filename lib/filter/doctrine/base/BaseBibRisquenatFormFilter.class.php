<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibRisquenat filter form base class.
 *
 * @package    filters
 * @subpackage BibRisquenat *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibRisquenatFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'risque'              => new sfWidgetFormFilterInput(),
      'rel_risquenats_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Identification')),
    ));

    $this->setValidators(array(
      'risque'              => new sfValidatorPass(array('required' => false)),
      'rel_risquenats_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Identification', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_risquenat_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function addRelRisquenatsListColumnQuery(Doctrine_Query $query, $field, $values)
  {
    if (!is_array($values))
    {
      $values = array($values);
    }

    if (!count($values))
    {
      return;
    }

    $query->leftJoin('r.RelRisquenat RelRisquenat')
          ->andWhereIn('RelRisquenat.indexbatiment', $values);
  }

  public function getModelName()
  {
    return 'BibRisquenat';
  }

  public function getFields()
  {
    return array(
      'coderisque'          => 'Number',
      'risque'              => 'Text',
      'rel_risquenats_list' => 'ManyKey',
    );
  }
}