<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Structures filter form base class.
 *
 * @package    filters
 * @subpackage Structures *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseStructuresFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeconservation'             => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => true)),
      'codematge'                    => new sfWidgetFormDoctrineChoice(array('model' => 'BibMateriauxGe', 'add_empty' => true)),
      'codestructure'                => new sfWidgetFormDoctrineChoice(array('model' => 'BibStructure', 'add_empty' => true)),
      'codemeo'                      => new sfWidgetFormDoctrineChoice(array('model' => 'BibMeoeuvre', 'add_empty' => true)),
      'indexbatiment'                => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'info_structure'               => new sfWidgetFormFilterInput(),
      'structure_rem'                => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
      'rel_structures_matfinss_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMateriauxFins')),
    ));

    $this->setValidators(array(
      'codeconservation'             => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibConservation', 'column' => 'codeconservation')),
      'codematge'                    => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibMateriauxGe', 'column' => 'codematge')),
      'codestructure'                => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibStructure', 'column' => 'codestructure')),
      'codemeo'                      => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibMeoeuvre', 'column' => 'codemeo')),
      'indexbatiment'                => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'info_structure'               => new sfValidatorPass(array('required' => false)),
      'structure_rem'                => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
      'rel_structures_matfinss_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMateriauxFins', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('structures_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
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
          ->andWhereIn('RelStructuresMatfins.codematfins', $values);
  }

  public function getModelName()
  {
    return 'Structures';
  }

  public function getFields()
  {
    return array(
      'indexstructure'               => 'Number',
      'codeconservation'             => 'ForeignKey',
      'codematge'                    => 'ForeignKey',
      'codestructure'                => 'ForeignKey',
      'codemeo'                      => 'ForeignKey',
      'indexbatiment'                => 'ForeignKey',
      'info_structure'               => 'Text',
      'structure_rem'                => 'Boolean',
      'rel_structures_matfinss_list' => 'ManyKey',
    );
  }
}