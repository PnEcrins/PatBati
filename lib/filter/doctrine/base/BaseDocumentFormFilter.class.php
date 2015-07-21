<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * Document filter form base class.
 *
 * @package    filters
 * @subpackage Document *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseDocumentFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codepersonne'   => new sfWidgetFormDoctrineChoice(array('model' => 'BibPersonnes', 'add_empty' => true)),
      'indexbatiment'  => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'indexajaris'    => new sfWidgetFormFilterInput(),
      'date_document'  => new sfWidgetFormFilterDate(array('from_date' => new sfWidgetFormDate(), 'to_date' => new sfWidgetFormDate(), 'with_empty' => true)),
      'fichier_source' => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'codepersonne'   => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibPersonnes', 'column' => 'codepersonne')),
      'indexbatiment'  => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'indexajaris'    => new sfValidatorSchemaFilter('text', new sfValidatorInteger(array('required' => false))),
      'date_document'  => new sfValidatorDateRange(array('required' => false, 'from_date' => new sfValidatorDate(array('required' => false)), 'to_date' => new sfValidatorDate(array('required' => false)))),
      'fichier_source' => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('document_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Document';
  }

  public function getFields()
  {
    return array(
      'indexdocument'  => 'Number',
      'codepersonne'   => 'ForeignKey',
      'indexbatiment'  => 'ForeignKey',
      'indexajaris'    => 'Number',
      'date_document'  => 'Date',
      'fichier_source' => 'Text',
    );
  }
}