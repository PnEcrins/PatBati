<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibMasque filter form base class.
 *
 * @package    filters
 * @subpackage BibMasque *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibMasqueFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'masque'           => new sfWidgetFormFilterInput(),
      'rel_masques_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Identification')),
    ));

    $this->setValidators(array(
      'masque'           => new sfValidatorPass(array('required' => false)),
      'rel_masques_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Identification', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_masque_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function addRelMasquesListColumnQuery(Doctrine_Query $query, $field, $values)
  {
    if (!is_array($values))
    {
      $values = array($values);
    }

    if (!count($values))
    {
      return;
    }

    $query->leftJoin('r.RelMasque RelMasque')
          ->andWhereIn('RelMasque.indexbatiment', $values);
  }

  public function getModelName()
  {
    return 'BibMasque';
  }

  public function getFields()
  {
    return array(
      'codemasque'       => 'Number',
      'masque'           => 'Text',
      'rel_masques_list' => 'ManyKey',
    );
  }
}