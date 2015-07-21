<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibMateriauxFins filter form base class.
 *
 * @package    filters
 * @subpackage BibMateriauxFins *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibMateriauxFinsFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'matfins'                      => new sfWidgetFormFilterInput(),
      'type_matfins'                 => new sfWidgetFormFilterInput(),
      'rel_so_matfinss_list'         => new sfWidgetFormDoctrineChoiceMany(array('model' => 'SecondOeuvre')),
      'rel_structures_matfinss_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Structures')),
      'rel_matfins_finitions_list'   => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibFinition')),
    ));

    $this->setValidators(array(
      'matfins'                      => new sfValidatorPass(array('required' => false)),
      'type_matfins'                 => new sfValidatorPass(array('required' => false)),
      'rel_so_matfinss_list'         => new sfValidatorDoctrineChoiceMany(array('model' => 'SecondOeuvre', 'required' => false)),
      'rel_structures_matfinss_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Structures', 'required' => false)),
      'rel_matfins_finitions_list'   => new sfValidatorDoctrineChoiceMany(array('model' => 'BibFinition', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_materiaux_fins_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function addRelSoMatfinssListColumnQuery(Doctrine_Query $query, $field, $values)
  {
    if (!is_array($values))
    {
      $values = array($values);
    }

    if (!count($values))
    {
      return;
    }

    $query->leftJoin('r.RelSoMatfins RelSoMatfins')
          ->andWhereIn('RelSoMatfins.indexso', $values);
  }

  public function addRelStructuresMatfinssListColumnQuery(Doctrine_Query $query, $field, $values)
  {
    if (!is_array($values))
    {
      $values = array($values);
    }

    if (!count($values))
    {
      return;
    }

    $query->leftJoin('r.RelStructuresMatfins RelStructuresMatfins')
          ->andWhereIn('RelStructuresMatfins.indexstructure', $values);
  }

  public function addRelMatfinsFinitionsListColumnQuery(Doctrine_Query $query, $field, $values)
  {
    if (!is_array($values))
    {
      $values = array($values);
    }

    if (!count($values))
    {
      return;
    }

    $query->leftJoin('r.RelMatfinsFinition RelMatfinsFinition')
          ->andWhereIn('RelMatfinsFinition.codefinition', $values);
  }

  public function getModelName()
  {
    return 'BibMateriauxFins';
  }

  public function getFields()
  {
    return array(
      'codematfins'                  => 'Number',
      'matfins'                      => 'Text',
      'type_matfins'                 => 'Text',
      'rel_so_matfinss_list'         => 'ManyKey',
      'rel_structures_matfinss_list' => 'ManyKey',
      'rel_matfins_finitions_list'   => 'ManyKey',
    );
  }
}