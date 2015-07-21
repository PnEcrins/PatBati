<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibIllustration filter form base class.
 *
 * @package    filters
 * @subpackage BibIllustration *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibIllustrationFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'illustration'       => new sfWidgetFormFilterInput(),
      'ordre_illustration' => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'illustration'       => new sfValidatorPass(array('required' => false)),
      'ordre_illustration' => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
    ));

    $this->widgetSchema->setNameFormat('bib_illustration_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibIllustration';
  }

  public function getFields()
  {
    return array(
      'codeillustration'   => 'Number',
      'illustration'       => 'Text',
      'ordre_illustration' => 'Number',
    );
  }
}