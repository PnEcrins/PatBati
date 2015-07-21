<?php

/**
 * BibPerspective form base class.
 *
 * @package    form
 * @subpackage bib_perspective
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibPerspectiveForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codeperspective'             => new sfWidgetFormInputHidden(),
      'perspective'                 => new sfWidgetFormInput(),
      'rel_ident_perspectives_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Identification')),
    ));

    $this->setValidators(array(
      'codeperspective'             => new sfValidatorDoctrineChoice(array('model' => 'BibPerspective', 'column' => 'codeperspective', 'required' => false)),
      'perspective'                 => new sfValidatorString(array('max_length' => 50)),
      'rel_ident_perspectives_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Identification', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_perspective[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibPerspective';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_ident_perspectives_list']))
    {
      $this->setDefault('rel_ident_perspectives_list', $this->object->RelIdentPerspectives->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelIdentPerspectivesList($con);
  }

  public function saveRelIdentPerspectivesList($con = null)
  {
    if (!$this->isValid())
    {
      throw $this->getErrorSchema();
    }

    if (!isset($this->widgetSchema['rel_ident_perspectives_list']))
    {
      // somebody has unset this widget
      return;
    }

    if (is_null($con))
    {
      $con = $this->getConnection();
    }

    $existing = $this->object->RelIdentPerspectives->getPrimaryKeys();
    
    $values = $this->getValue('rel_ident_perspectives_list');
    if (!is_array($values))
    {
      $values = array();
    }

    $unlink = array_diff($existing, $values);
    if (count($unlink))
    {
      $this->object->unlink('RelIdentPerspectives', array_values($unlink));
    }

    $link = array_diff($values, $existing);
    if (count($link))
    {
      $this->object->link('RelIdentPerspectives', array_values($link));
    }
  }

}
