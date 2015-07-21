<?php

/**
 * BibMasque form base class.
 *
 * @package    form
 * @subpackage bib_masque
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibMasqueForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codemasque'       => new sfWidgetFormInputHidden(),
      'masque'           => new sfWidgetFormInput(),
      'rel_masques_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Identification')),
    ));

    $this->setValidators(array(
      'codemasque'       => new sfValidatorDoctrineChoice(array('model' => 'BibMasque', 'column' => 'codemasque', 'required' => false)),
      'masque'           => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'rel_masques_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Identification', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_masque[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibMasque';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_masques_list']))
    {
      $this->setDefault('rel_masques_list', $this->object->RelMasques->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelMasquesList($con);
  }

  public function saveRelMasquesList($con = null)
  {
    if (!$this->isValid())
    {
      throw $this->getErrorSchema();
    }

    if (!isset($this->widgetSchema['rel_masques_list']))
    {
      // somebody has unset this widget
      return;
    }

    if (is_null($con))
    {
      $con = $this->getConnection();
    }

    $existing = $this->object->RelMasques->getPrimaryKeys();
    
    $values = $this->getValue('rel_masques_list');
    if (!is_array($values))
    {
      $values = array();
    }

    $unlink = array_diff($existing, $values);
    if (count($unlink))
    {
      $this->object->unlink('RelMasques', array_values($unlink));
    }

    $link = array_diff($values, $existing);
    if (count($link))
    {
      $this->object->link('RelMasques', array_values($link));
    }
  }

}
