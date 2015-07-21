<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Illustration filter form base class.
 *
 * @package    filters
 * @subpackage Illustration *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseIllustrationFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeillustration'  => new sfWidgetFormDoctrineChoice(array('model' => 'BibIllustration', 'add_empty' => true)),
      'codepersonne'      => new sfWidgetFormDoctrineChoice(array('model' => 'BibPersonnes', 'add_empty' => true)),
      'indexbatiment'     => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'indexajaris'       => new sfWidgetFormFilterInput(),
      'date_illustration' => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'vignette'          => new sfWidgetFormFilterInput(),
      'fichier_source'    => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'codeillustration'  => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibIllustration', 'column' => 'codeillustration')),
      'codepersonne'      => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibPersonnes', 'column' => 'codepersonne')),
      'indexbatiment'     => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'indexajaris'       => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'date_illustration' => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'vignette'          => new sfValidatorPass(array('required' => false)),
      'fichier_source'    => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('illustration_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Illustration';
  }

  public function getFields()
  {
    return array(
      'indexilustration'  => 'Number',
      'codeillustration'  => 'ForeignKey',
      'codepersonne'      => 'ForeignKey',
      'indexbatiment'     => 'ForeignKey',
      'indexajaris'       => 'Number',
      'date_illustration' => 'Date',
      'vignette'          => 'Text',
      'fichier_source'    => 'Text',
    );
  }
}