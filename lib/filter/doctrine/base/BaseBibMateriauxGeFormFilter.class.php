<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibMateriauxGe filter form base class.
 *
 * @package    filters
 * @subpackage BibMateriauxGe *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibMateriauxGeFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'matge'               => new sfWidgetFormFilterInput(),
      'rel_matge_meos_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMeoeuvre')),
    ));

    $this->setValidators(array(
      'matge'               => new sfValidatorPass(array('required' => false)),
      'rel_matge_meos_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMeoeuvre', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_materiaux_ge_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function addRelMatgeMeosListColumnQuery(Doctrine_Query $query, $field, $values)
  {
    if (!is_array($values))
    {
      $values = array($values);
    }

    if (!count($values))
    {
      return;
    }

    $query->leftJoin('r.RelMatgeMeo RelMatgeMeo')
          ->andWhereIn('RelMatgeMeo.codemeo', $values);
  }

  public function getModelName()
  {
    return 'BibMateriauxGe';
  }

  public function getFields()
  {
    return array(
      'codematge'           => 'Number',
      'matge'               => 'Text',
      'rel_matge_meos_list' => 'ManyKey',
    );
  }
}