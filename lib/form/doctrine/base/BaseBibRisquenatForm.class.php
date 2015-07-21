<?php

/**
 * BibRisquenat form base class.
 *
 * @package    form
 * @subpackage bib_risquenat
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibRisquenatForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'coderisque'          => new sfWidgetFormInputHidden(),
      'risque'              => new sfWidgetFormInput(),
      'rel_risquenats_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Identification')),
    ));

    $this->setValidators(array(
      'coderisque'          => new sfValidatorDoctrineChoice(array('model' => 'BibRisquenat', 'column' => 'coderisque', 'required' => false)),
      'risque'              => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'rel_risquenats_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Identification', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_risquenat[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibRisquenat';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_risquenats_list']))
    {
      $this->setDefault('rel_risquenats_list', $this->object->RelRisquenats->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelRisquenatsList($con);
  }

  public function saveRelRisquenatsList($con = null)
  {
    if (!$this->isValid())
    {
      throw $this->getErrorSchema();
    }

    if (!isset($this->widgetSchema['rel_risquenats_list']))
    {
      // somebody has unset this widget
      return;
    }

    if (is_null($con))
    {
      $con = $this->getConnection();
    }

    $existing = $this->object->RelRisquenats->getPrimaryKeys();
    
    $values = $this->getValue('rel_risquenats_list');
    if (!is_array($values))
    {
      $values = array();
    }

    $unlink = array_diff($existing, $values);
    if (count($unlink))
    {
      $this->object->unlink('RelRisquenats', array_values($unlink));
    }

    $link = array_diff($values, $existing);
    if (count($link))
    {
      $this->object->link('RelRisquenats', array_values($link));
    }
  }

}
