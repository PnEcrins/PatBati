<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * ElementsPaysagers filter form base class.
 *
 * @package    filters
 * @subpackage ElementsPaysagers *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseElementsPaysagersFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeep'           => new sfWidgetFormDoctrineChoice(array('model' => 'BibElementPaysager', 'add_empty' => true)),
      'codeconservation' => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => true)),
      'indexbatiment'    => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => true)),
      'info_ep'          => new sfWidgetFormFilterInput(),
      'ep_rem'           => new sfWidgetFormChoice(array('choices' => array('' => 'yes or no', 1 => 'yes', 0 => 'no'))),
    ));

    $this->setValidators(array(
      'codeep'           => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibElementPaysager', 'column' => 'codeep')),
      'codeconservation' => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'BibConservation', 'column' => 'codeconservation')),
      'indexbatiment'    => new sfValidatorDoctrineChoice(array('required' => false, 'model' => 'Identification', 'column' => 'indexbatiment')),
      'info_ep'          => new sfValidatorPass(array('required' => false)),
      'ep_rem'           => new sfValidatorChoice(array('required' => false, 'choices' => array('', 1, 0))),
    ));

    $this->widgetSchema->setNameFormat('elements_paysagers_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'ElementsPaysagers';
  }

  public function getFields()
  {
    return array(
      'indexep'          => 'Number',
      'codeep'           => 'ForeignKey',
      'codeconservation' => 'ForeignKey',
      'indexbatiment'    => 'ForeignKey',
      'info_ep'          => 'Text',
      'ep_rem'           => 'Boolean',
    );
  }
}