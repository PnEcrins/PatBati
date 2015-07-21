<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibMeoeuvre filter form base class.
 *
 * @package    filters
 * @subpackage BibMeoeuvre *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibMeoeuvreFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'meoeuvre'            => new sfWidgetFormFilterInput(),
      'rel_matge_meos_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMateriauxGe')),
    ));

    $this->setValidators(array(
      'meoeuvre'            => new sfValidatorPass(array('required' => false)),
      'rel_matge_meos_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMateriauxGe', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_meoeuvre_filters[%s]');

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
          ->andWhereIn('RelMatgeMeo.codematge', $values);
  }

  public function getModelName()
  {
    return 'BibMeoeuvre';
  }

  public function getFields()
  {
    return array(
      'codemeo'             => 'Number',
      'meoeuvre'            => 'Text',
      'rel_matge_meos_list' => 'ManyKey',
    );
  }
}