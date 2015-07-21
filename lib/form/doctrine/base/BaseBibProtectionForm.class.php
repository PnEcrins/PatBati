<?php

/**
 * BibProtection form base class.
 *
 * @package    form
 * @subpackage bib_protection
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibProtectionForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeprotection'       => new sfWidgetFormInputHidden(),
      'protection'           => new sfWidgetFormInput(),
      'rel_protections_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Identification')),
    ));

    $this->setValidators(array(
      'codeprotection'       => new sfValidatorDoctrineChoice(array('model' => 'BibProtection', 'column' => 'codeprotection', 'required' => false)),
      'protection'           => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'rel_protections_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Identification', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_protection[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibProtection';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_protections_list']))
    {
      $this->setDefault('rel_protections_list', $this->object->RelProtections->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelProtectionsList($con);
  }

  public function saveRelProtectionsList($con = null)
  {
    if (!$this->isValid())
    {
      throw $this->getErrorSchema();
    }

    if (!isset($this->widgetSchema['rel_protections_list']))
    {
      // somebody has unset this widget
      return;
    }

    if (is_null($con))
    {
      $con = $this->getConnection();
    }

    $existing = $this->object->RelProtections->getPrimaryKeys();
    
    $values = $this->getValue('rel_protections_list');
    if (!is_array($values))
    {
      $values = array();
    }

    $unlink = array_diff($existing, $values);
    if (count($unlink))
    {
      $this->object->unlink('RelProtections', array_values($unlink));
    }

    $link = array_diff($values, $existing);
    if (count($link))
    {
      $this->object->link('RelProtections', array_values($link));
    }
  }

}
