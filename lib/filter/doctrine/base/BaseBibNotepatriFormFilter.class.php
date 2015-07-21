<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibNotepatri filter form base class.
 *
 * @package    filters
 * @subpackage BibNotepatri *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibNotepatriFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'valnotepatri'   => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'valnotepatri'   => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
    ));

    $this->widgetSchema->setNameFormat('bib_notepatri_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibNotepatri';
  }

  public function getFields()
  {
    return array(
      'indexnotepatri' => 'Number',
      'valnotepatri'   => 'Number',
    );
  }
}