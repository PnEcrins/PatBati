<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibProtection filter form base class.
 *
 * @package    filters
 * @subpackage BibProtection *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibProtectionFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'protection'           => new sfWidgetFormFilterInput(),
      'rel_protections_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Identification')),
    ));

    $this->setValidators(array(
      'protection'           => new sfValidatorPass(array('required' => false)),
      'rel_protections_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Identification', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_protection_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function addRelProtectionsListColumnQuery(Doctrine_Query $query, $field, $values)
  {
    if (!is_array($values))
    {
      $values = array($values);
    }

    if (!count($values))
    {
      return;
    }

    $query->leftJoin('r.RelProtection RelProtection')
          ->andWhereIn('RelProtection.indexbatiment', $values);
  }

  public function getModelName()
  {
    return 'BibProtection';
  }

  public function getFields()
  {
    return array(
      'codeprotection'       => 'Number',
      'protection'           => 'Text',
      'rel_protections_list' => 'ManyKey',
    );
  }
}