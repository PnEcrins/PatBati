<?php

require_once(sfConfig::get('sf_lib_dir').'/filter/doctrine/BaseFormFilterDoctrine.class.php');

/**
 * BibSecteur filter form base class.
 *
 * @package    filters
 * @subpackage BibSecteur *
 * @version    SVN: $Id: sfDoctrineFormFilterGeneratedTemplate.php 11675 2008-09-19 15:21:38Z fabien $
 */
class BaseBibSecteurFormFilter extends BaseFormFilterDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'secteur'     => new sfWidgetFormFilterInput(),
    ));

    $this->setValidators(array(
      'secteur'     => new sfValidatorPass(array('required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_secteur_filters[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibSecteur';
  }

  public function getFields()
  {
    return array(
      'codesecteur' => 'Number',
      'secteur'     => 'Text',
    );
  }
}