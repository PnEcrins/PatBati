<?php

/**
 * SecondOeuvre form base class.
 *
 * @package    form
 * @subpackage second_oeuvre
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseSecondOeuvreForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexso'              => new sfWidgetFormInputHidden(),
      'indexbatiment'        => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'codeso'               => new sfWidgetFormDoctrineChoice(array('model' => 'BibSo', 'add_empty' => false)),
      'codeconservation'     => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => false)),
      'info_so'              => new sfWidgetFormTextarea(),
      'so_rem'               => new sfWidgetFormInputCheckbox(),
      'rel_so_matfinss_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMateriauxFins')),
    ));

    $this->setValidators(array(
      'indexso'              => new sfValidatorDoctrineChoice(array('model' => 'SecondOeuvre', 'column' => 'indexso', 'required' => false)),
      'indexbatiment'        => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'codeso'               => new sfValidatorDoctrineChoice(array('model' => 'BibSo')),
      'codeconservation'     => new sfValidatorDoctrineChoice(array('model' => 'BibConservation')),
      'info_so'              => new sfValidatorString(array('max_length' => 1000, 'required' => false)),
      'so_rem'               => new sfValidatorBoolean(array('required' => false)),
      'rel_so_matfinss_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMateriauxFins', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('second_oeuvre[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'SecondOeuvre';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_so_matfinss_list']))
    {
      $this->setDefault('rel_so_matfinss_list', $this->object->RelSoMatfinss->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelSoMatfinssList($con);
  }

  public function saveRelSoMatfinssList($con = null)
  {
    if (!$this->isValid())
    {
      throw $this->getErrorSchema();
    }

    if (!isset($this->widgetSchema['rel_so_matfinss_list']))
    {
      // somebody has unset this widget
      return;
    }

    if (is_null($con))
    {
      $con = $this->getConnection();
    }

    $existing = $this->object->RelSoMatfinss->getPrimaryKeys();
    
    $values = $this->getValue('rel_so_matfinss_list');
    if (!is_array($values))
    {
      $values = array();
    }

    $unlink = array_diff($existing, $values);
    if (count($unlink))
    {
      $this->object->unlink('RelSoMatfinss', array_values($unlink));
    }

    $link = array_diff($values, $existing);
    if (count($link))
    {
      $this->object->link('RelSoMatfinss', array_values($link));
    }
  }

}
