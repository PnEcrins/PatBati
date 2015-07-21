<?php

/**
 * Structures form base class.
 *
 * @package    form
 * @subpackage structures
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseStructuresForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexstructure'               => new sfWidgetFormInputHidden(),
      'codeconservation'             => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => false)),
      'codematge'                    => new sfWidgetFormDoctrineChoice(array('model' => 'BibMateriauxGe', 'add_empty' => false)),
      'codestructure'                => new sfWidgetFormDoctrineChoice(array('model' => 'BibStructure', 'add_empty' => false)),
      'codemeo'                      => new sfWidgetFormDoctrineChoice(array('model' => 'BibMeoeuvre', 'add_empty' => false)),
      'indexbatiment'                => new sfWidgetFormDoctrineChoice(array('model' => 'Identification', 'add_empty' => false)),
      'info_structure'               => new sfWidgetFormTextarea(),
      'structure_rem'                => new sfWidgetFormInputCheckbox(),
      'rel_structures_matfinss_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMateriauxFins')),
    ));

    $this->setValidators(array(
      'indexstructure'               => new sfValidatorDoctrineChoice(array('model' => 'Structures', 'column' => 'indexstructure', 'required' => false)),
      'codeconservation'             => new sfValidatorDoctrineChoice(array('model' => 'BibConservation')),
      'codematge'                    => new sfValidatorDoctrineChoice(array('model' => 'BibMateriauxGe')),
      'codestructure'                => new sfValidatorDoctrineChoice(array('model' => 'BibStructure')),
      'codemeo'                      => new sfValidatorDoctrineChoice(array('model' => 'BibMeoeuvre')),
      'indexbatiment'                => new sfValidatorDoctrineChoice(array('model' => 'Identification')),
      'info_structure'               => new sfValidatorString(array('max_length' => 1000, 'required' => false)),
      'structure_rem'                => new sfValidatorBoolean(array('required' => false)),
      'rel_structures_matfinss_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMateriauxFins', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('structures[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Structures';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_structures_matfinss_list']))
    {
      $this->setDefault('rel_structures_matfinss_list', $this->object->RelStructuresMatfinss->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelStructuresMatfinssList($con);
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

}
