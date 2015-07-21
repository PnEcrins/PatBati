<?php

/**
 * BibMateriauxFins form base class.
 *
 * @package    form
 * @subpackage bib_materiaux_fins
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseBibMateriauxFinsForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'codematfins'                  => new sfWidgetFormInputHidden(),
      'matfins'                      => new sfWidgetFormInput(),
      'type_matfins'                 => new sfWidgetFormInput(),
      'rel_so_matfinss_list'         => new sfWidgetFormDoctrineChoiceMany(array('model' => 'SecondOeuvre')),
      'rel_structures_matfinss_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'Structures')),
      'rel_matfins_finitions_list'   => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibFinition')),
    ));

    $this->setValidators(array(
      'codematfins'                  => new sfValidatorDoctrineChoice(array('model' => 'BibMateriauxFins', 'column' => 'codematfins', 'required' => false)),
      'matfins'                      => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'type_matfins'                 => new sfValidatorString(array('max_length' => 50, 'required' => false)),
      'rel_so_matfinss_list'         => new sfValidatorDoctrineChoiceMany(array('model' => 'SecondOeuvre', 'required' => false)),
      'rel_structures_matfinss_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'Structures', 'required' => false)),
      'rel_matfins_finitions_list'   => new sfValidatorDoctrineChoiceMany(array('model' => 'BibFinition', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('bib_materiaux_fins[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'BibMateriauxFins';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_so_matfinss_list']))
    {
      $this->setDefault('rel_so_matfinss_list', $this->object->RelSoMatfinss->getPrimaryKeys());
    }


    if (isset($this->widgetSchema['rel_structures_matfinss_list']))
    {
      $this->setDefault('rel_structures_matfinss_list', $this->object->RelStructuresMatfinss->getPrimaryKeys());
    }


    if (isset($this->widgetSchema['rel_matfins_finitions_list']))
    {
      $this->setDefault('rel_matfins_finitions_list', $this->object->RelMatfinsFinitions->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelSoMatfinssList($con);
    $this->saveRelStructuresMatfinssList($con);
    $this->saveRelMatfinsFinitionsList($con);
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

  public function saveRelStructuresMatfinssList($con = null)
  {
    if (!$this->isValid())
    {
      throw $this->getErrorSchema();
    }

    if (!isset($this->widgetSchema['rel_structures_matfinss_list']))
    {
      // somebody has unset this widget
      return;
    }

    if (is_null($con))
    {
      $con = $this->getConnection();
    }

    $existing = $this->object->RelStructuresMatfinss->getPrimaryKeys();
    
    $values = $this->getValue('rel_structures_matfinss_list');
    if (!is_array($values))
    {
      $values = array();
    }

    $unlink = array_diff($existing, $values);
    if (count($unlink))
    {
      $this->object->unlink('RelStructuresMatfinss', array_values($unlink));
    }

    $link = array_diff($values, $existing);
    if (count($link))
    {
      $this->object->link('RelStructuresMatfinss', array_values($link));
    }
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
