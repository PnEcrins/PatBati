<?php

/**
 * BibMeoeuvre form base class.
 *
 * @package    form
 * @subpackage bib_meoeuvre
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibMeoeuvreForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codemeo'             => new sfWidgetFormInputHidden(),
      'meoeuvre'            => new sfWidgetFormInput(),
      'rel_matge_meos_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMateriauxGe')),
    ));

    $this->setValidators(array(
      'codemeo'             => new sfValidatorDoctrineChoice(array('model' => 'BibMeoeuvre', 'column' => 'codemeo', 'required' => false)),
      'meoeuvre'            => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'rel_matge_meos_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMateriauxGe', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_meoeuvre[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibMeoeuvre';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_matge_meos_list']))
    {
      $this->setDefault('rel_matge_meos_list', $this->object->RelMatgeMeos->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelMatgeMeosList($con);
  }

  public function saveRelMatgeMeosList($con = null)
  {
    if (!$this->isValid())
    {
      throw $this->getErrorSchema();
    }

    if (!isset($this->widgetSchema['rel_matge_meos_list']))
    {
      // somebody has unset this widget
      return;
    }

    if (is_null($con))
    {
      $con = $this->getConnection();
    }

    $existing = $this->object->RelMatgeMeos->getPrimaryKeys();
    
    $values = $this->getValue('rel_matge_meos_list');
    if (!is_array($values))
    {
      $values = array();
    }

    $unlink = array_diff($existing, $values);
    if (count($unlink))
    {
      $this->object->unlink('RelMatgeMeos', array_values($unlink));
    }

    $link = array_diff($values, $existing);
    if (count($link))
    {
      $this->object->link('RelMatgeMeos', array_values($link));
    }
  }

}
