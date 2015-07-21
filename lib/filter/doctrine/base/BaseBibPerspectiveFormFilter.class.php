<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibPerspective filter form base class.
 *
 * @package    filters
 * @subpackage BibPerspective *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibPerspectiveFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'perspective'                 => new sfWidgetFormFilterInput(),
      'rel_ident_perspectives_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Identification')),
    ));

    $this->setValidators(array(
      'perspective'                 => new sfValidatorPass(array('required' => false)),
      'rel_ident_perspectives_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Identification', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_perspective_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function addRelIdentPerspectivesListColumnQuery(Doctrine_Query $query, $field, $values)
  {
    if (!is_array($values))
    {
      $values = array($values);
    }

    if (!count($values))
    {
      return;
    }

    $query->leftJoin('r.RelIdentPerspective RelIdentPerspective')
          ->andWhereIn('RelIdentPerspective.indexbatiment', $values);
  }

  public function getModelName()
  {
    return 'BibPerspective';
  }

  public function getFields()
  {
    return array(
      'codeperspective'             => 'Number',
      'perspective'                 => 'Text',
      'rel_ident_perspectives_list' => 'ManyKey',
    );
  }
}