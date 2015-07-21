<?php

/**
 * BibFinition form base class.
 *
 * @package    form
 * @subpackage bib_finition
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibFinitionForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codefinition'               => new sfWidgetFormInputHidden(),
      'finition'                   => new sfWidgetFormInput(),
      'rel_matfins_finitions_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMateriauxFins')),
    ));

    $this->setValidators(array(
      'codefinition'               => new sfValidatorDoctrineChoice(array('model' => 'BibFinition', 'column' => 'codefinition', 'required' => false)),
      'finition'                   => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'rel_matfins_finitions_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMateriauxFins', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_finition[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibFinition';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_matfins_finitions_list']))
    {
      $this->setDefault('rel_matfins_finitions_list', $this->object->RelMatfinsFinitions->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelMatfinsFinitionsList($con);
  }

  public function saveRelMatfinsFinitionsList($con = null)
  {
    if (!$this->isValid())
    {
      throw $this->getErrorSchema();
    }

    if (!isset($this->widgetSchema['rel_matfins_finitions_list']))
    {
      // somebody has unset this widget
      return;
    }

    if (is_null($con))
    {
      $con = $this->getConnection();
    }

    $existing = $this->object->RelMatfinsFinitions->getPrimaryKeys();
    
    $values = $this->getValue('rel_matfins_finitions_list');
    if (!is_array($values))
    {
      $values = array();
    }

    $unlink = array_diff($existing, $values);
    if (count($unlink))
    {
      $this->object->unlink('RelMatfinsFinitions', array_values($unlink));
    }

    $link = array_diff($values, $existing);
    if (count($link))
    {
      $this->object->link('RelMatfinsFinitions', array_values($link));
    }
  }

}
