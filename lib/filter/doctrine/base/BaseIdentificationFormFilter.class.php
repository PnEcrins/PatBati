<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Identification filter form base class.
 *
 * @package    filters
 * @subpackage Identification *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseIdentificationFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'ancienindexbatiment'         => new sfWidgetFormFilterInput(),
      'codepem'                     => new sfWidgetFormDoctrineChoice(array('model' => 'BibImplantation', 'add_empty' => true)),
      'codeclasse'                  => new sfWidgetFormDoctrineChoice(array('model' => 'BibClasseArchi', 'add_empty' => true)),
      'codefaitage'                 => new sfWidgetFormDoctrineChoice(array('model' => 'BibFaitage', 'add_empty' => true)),
      'codeconservation'            => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => true)),
      'codeinsee'                   => new sfWidgetFormDoctrineChoice(array('model' => 'BibCommune', 'add_empty' => true)),
      'appelation'                  => new sfWidgetFormFilterInput(),
      'indivision'                  => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
      'proprietaire'                => new sfWidgetFormFilterInput(),
      'cadastre'                    => new sfWidgetFormFilterInput(),
      'lieu_dit'                    => new sfWidgetFormFilterInput(),
      'altitude'                    => new sfWidgetFormFilterInput(),
      'x'                         => new sfWidgetFormFilterInput(),
      'y'                         => new sfWidgetFormFilterInput(),
      'situationgeo'                => new sfWidgetFormFilterInput(),
      'denivelle'                   => new sfWidgetFormFilterInput(),
      'exposition'                  => new sfWidgetFormDoctrineChoice(array('model' => 'BibExposition', 'add_empty' => true)),
      'pente'                       => new sfWidgetFormFilterInput(),
      'capacite'                    => new sfWidgetFormFilterInput(),
      'date_insert'                 => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'date_update'                 => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'bat_suppr'                   => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
      'notepatri'                   => new sfWidgetFormDoctrineChoice(array('model' => 'BibNotepatri', 'add_empty' => true)),
      'patrimonialite'              => new sfWidgetFormFilterInput(),
      'info_risquenat'              => new sfWidgetFormFilterInput(),
      'info_masque'                 => new sfWidgetFormFilterInput(),
      'remarques'                   => new sfWidgetFormFilterInput(),
      'valide'                      => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
      'rel_masques_list'            => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMasque')),
      'rel_risquenats_list'         => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibRisquenat')),
      'rel_protections_list'        => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibProtection')),
      'rel_ident_perspectives_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibPerspective')),
    ));

    $this->setValidators(array(
      'ancienindexbatiment'         => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'codepem'                     => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibImplantation', 'column' => 'codepem')),
      'codeclasse'                  => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibClasseArchi', 'column' => 'codeclasse')),
      'codefaitage'                 => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibFaitage', 'column' => 'codefaitage')),
      'codeconservation'            => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibConservation', 'column' => 'codeconservation')),
      'codeinsee'                   => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibCommune', 'column' => 'codeinsee')),
      'appelation'                  => new sfValidatorPass(array('required' => false)),
      'indivision'                  => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
      'proprietaire'                => new sfValidatorPass(array('required' => false)),
      'cadastre'                    => new sfValidatorPass(array('required' => false)),
      'lieu_dit'                    => new sfValidatorPass(array('required' => false)),
      'altitude'                    => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'x'                         => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'y'                         => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'situationgeo'                => new sfValidatorPass(array('required' => false)),
      'denivelle'                   => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'exposition'                  => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibExposition', 'column' => 'indexexposition')),
      'pente'                       => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'capacite'                    => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'date_insert'                 => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'date_update'                 => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'bat_suppr'                   => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
      'notepatri'                   => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibNotepatri', 'column' => 'indexnotepatri')),
      'patrimonialite'              => new sfValidatorPass(array('required' => false)),
      'info_risquenat'              => new sfValidatorPass(array('required' => false)),
      'info_masque'                 => new sfValidatorPass(array('required' => false)),
      'remarques'                   => new sfValidatorPass(array('required' => false)),
      'valide'                      => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
      'rel_masques_list'            => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMasque', 'required' => false)),
      'rel_risquenats_list'         => new sfValidatorDoctrineChoiceMany(array('model' => 'BibRisquenat', 'required' => false)),
      'rel_protections_list'        => new sfValidatorDoctrineChoiceMany(array('model' => 'BibProtection', 'required' => false)),
      'rel_ident_perspectives_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibPerspective', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('identification_filters[%s]');

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
          ->andWhereIn('RelMasque.codemasque', $values);
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
          ->andWhereIn('RelRisquenat.coderisque', $values);
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
          ->andWhereIn('RelProtection.codeprotection', $values);
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
          ->andWhereIn('RelIdentPerspective.codeperspective', $values);
  }

  public function getModelName()
  {
    return 'Identification';
  }

  public function getFields()
  {
    return array(
      'indexbatiment'               => 'Number',
      'ancienindexbatiment'         => 'Number',
      'codepem'                     => 'ForeignKey',
      'codeclasse'                  => 'ForeignKey',
      'codefaitage'                 => 'ForeignKey',
      'codeconservation'            => 'ForeignKey',
      'codeinsee'                   => 'ForeignKey',
      'appelation'                  => 'Text',
      'indivision'                  => 'Boolean',
      'proprietaire'                => 'Text',
      'cadastre'                    => 'Text',
      'lieu_dit'                    => 'Text',
      'altitude'                    => 'Number',
      'x'                         => 'Number',
      'y'                         => 'Number',
      'situationgeo'                => 'Text',
      'denivelle'                   => 'Number',
      'exposition'                  => 'ForeignKey',
      'pente'                       => 'Number',
      'capacite'                    => 'Number',
      'date_insert'                 => 'Date',
      'date_update'                 => 'Date',
      'bat_suppr'                   => 'Boolean',
      'notepatri'                   => 'ForeignKey',
      'patrimonialite'              => 'Text',
      'info_risquenat'              => 'Text',
      'info_masque'                 => 'Text',
      'remarques'                   => 'Text',
      'valide'                      => 'Boolean',
      'rel_masques_list'            => 'ManyKey',
      'rel_risquenats_list'         => 'ManyKey',
      'rel_protections_list'        => 'ManyKey',
      'rel_ident_perspectives_list' => 'ManyKey',
    );
  }
}