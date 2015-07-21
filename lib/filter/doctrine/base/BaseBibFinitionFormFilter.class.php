<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibFinition filter form base class.
 *
 * @package    filters
 * @subpackage BibFinition *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibFinitionFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'finition'                   => new sfWidgetFormFilterInput(),
      'rel_matfins_finitions_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMateriauxFins')),
    ));

    $this->setValidators(array(
      'finition'                   => new sfValidatorPass(array('required' => false)),
      'rel_matfins_finitions_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMateriauxFins', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_finition_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
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
          ->andWhereIn('RelMatfinsFinition.codematfins', $values);
  }

  public function getModelName()
  {
    return 'BibFinition';
  }

  public function getFields()
  {
    return array(
      'codefinition'               => 'Number',
      'finition'                   => 'Text',
      'rel_matfins_finitions_list' => 'ManyKey',
    );
  }
}