<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * SecondOeuvre filter form base class.
 *
 * @package    filters
 * @subpackage SecondOeuvre *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseSecondOeuvreFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexbatiment'        => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'codeso'               => new sfWidgetFormDoctrineChoice(array('model' => 'BibSo', 'add_empty' => true)),
      'codeconservation'     => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => true)),
      'info_so'              => new sfWidgetFormFilterInput(),
      'so_rem'               => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
      'rel_so_matfinss_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMateriauxFins')),
    ));

    $this->setValidators(array(
      'indexbatiment'        => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'codeso'               => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibSo', 'column' => 'codeso')),
      'codeconservation'     => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibConservation', 'column' => 'codeconservation')),
      'info_so'              => new sfValidatorPass(array('required' => false)),
      'so_rem'               => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
      'rel_so_matfinss_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMateriauxFins', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('second_oeuvre_filters[%s]');

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
          ->andWhereIn('RelSoMatfins.codematfins', $values);
  }

  public function getModelName()
  {
    return 'SecondOeuvre';
  }

  public function getFields()
  {
    return array(
      'indexso'              => 'Number',
      'indexbatiment'        => 'ForeignKey',
      'codeso'               => 'ForeignKey',
      'codeconservation'     => 'ForeignKey',
      'info_so'              => 'Text',
      'so_rem'               => 'Boolean',
      'rel_so_matfinss_list' => 'ManyKey',
    );
  }
}