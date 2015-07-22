<?php

/**
 * Identification form base class.
 *
 * @package    form
 * @subpackage identification
 * @version    SVN: $Id: sfDoctrineFormGeneratedTemplate.php 8508 2008-04-17 17:39:15Z fabien $
 */
class BaseIdentificationForm extends BaseFormDoctrine
{
  public function setup()
  {
    $this->setWidgets(array(
      'indexbatiment'               => new sfWidgetFormInputHidden(),
      'ancienindexbatiment'         => new sfWidgetFormInput(),
      'codepem'                     => new sfWidgetFormDoctrineChoice(array('model' => 'BibImplantation', 'add_empty' => true)),
      'codeclasse'                  => new sfWidgetFormDoctrineChoice(array('model' => 'BibClasseArchi', 'add_empty' => false)),
      'codefaitage'                 => new sfWidgetFormDoctrineChoice(array('model' => 'BibFaitage', 'add_empty' => true)),
      'codeconservation'            => new sfWidgetFormDoctrineChoice(array('model' => 'BibConservation', 'add_empty' => true)),
      'codeinsee'                   => new sfWidgetFormDoctrineChoice(array('model' => 'BibCommune', 'add_empty' => false)),
      'appelation'                  => new sfWidgetFormInput(),
      'indivision'                  => new sfWidgetFormInputCheckbox(),
      'proprietaire'                => new sfWidgetFormInput(),
      'cadastre'                    => new sfWidgetFormInput(),
      'lieu_dit'                    => new sfWidgetFormInput(),
      'altitude'                    => new sfWidgetFormInput(),
      'x'                         => new sfWidgetFormInput(),
      'y'                         => new sfWidgetFormInput(),
      'situationgeo'                => new sfWidgetFormInput(),
      'denivelle'                   => new sfWidgetFormInput(),
      'exposition'                  => new sfWidgetFormDoctrineChoice(array('model' => 'BibExposition', 'add_empty' => true)),
      'pente'                       => new sfWidgetFormInput(),
      'capacite'                    => new sfWidgetFormInput(),
      'date_insert'                 => new sfWidgetFormDateTime(),
      'date_update'                 => new sfWidgetFormDateTime(),
      'bat_suppr'                   => new sfWidgetFormInputCheckbox(),
      'notepatri'                   => new sfWidgetFormDoctrineChoice(array('model' => 'BibNotepatri', 'add_empty' => true)),
      'patrimonialite'              => new sfWidgetFormInput(),
      'info_risquenat'              => new sfWidgetFormInput(),
      'info_masque'                 => new sfWidgetFormInput(),
      'remarques'                   => new sfWidgetFormTextarea(),
      'valide'                      => new sfWidgetFormInputCheckbox(),
      'rel_masques_list'            => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibMasque')),
      'rel_risquenats_list'         => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibRisquenat')),
      'rel_protections_list'        => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibProtection')),
      'rel_ident_perspectives_list' => new sfWidgetFormDoctrineChoiceMany(array('model' => 'BibPerspective')),
    ));

    $this->setValidators(array(
      'indexbatiment'               => new sfValidatorDoctrineChoice(array('model' => 'Identification', 'column' => 'indexbatiment', 'required' => false)),
      'ancienindexbatiment'         => new sfValidatorInteger(array('required' => false)),
      'codepem'                     => new sfValidatorDoctrineChoice(array('model' => 'BibImplantation', 'required' => false)),
      'codeclasse'                  => new sfValidatorDoctrineChoice(array('model' => 'BibClasseArchi')),
      'codefaitage'                 => new sfValidatorDoctrineChoice(array('model' => 'BibFaitage', 'required' => false)),
      'codeconservation'            => new sfValidatorDoctrineChoice(array('model' => 'BibConservation', 'required' => false)),
      'codeinsee'                   => new sfValidatorDoctrineChoice(array('model' => 'BibCommune')),
      'appelation'                  => new sfValidatorString(array('max_length' => 50)),
      'indivision'                  => new sfValidatorBoolean(array('required' => false)),
      'proprietaire'                => new sfValidatorString(array('max_length' => 150, 'required' => false)),
      'cadastre'                    => new sfValidatorString(array('max_length' => 20, 'required' => false)),
      'lieu_dit'                    => new sfValidatorString(array('max_length' => 100, 'required' => false)),
      'altitude'                    => new sfValidatorInteger(array('required' => false)),
      'x'                         => new sfValidatorInteger(array('required' => false)),
      'y'                         => new sfValidatorInteger(array('required' => false)),
      'situationgeo'                => new sfValidatorString(array('max_length' => 200, 'required' => false)),
      'denivelle'                   => new sfValidatorInteger(array('required' => false)),
      'exposition'                  => new sfValidatorDoctrineChoice(array('model' => 'BibExposition', 'required' => false)),
      'pente'                       => new sfValidatorInteger(array('required' => false)),
      'capacite'                    => new sfValidatorInteger(array('required' => false)),
      'date_insert'                 => new sfValidatorDateTime(array('required' => false)),
      'date_update'                 => new sfValidatorDateTime(array('required' => false)),
      'bat_suppr'                   => new sfValidatorBoolean(array('required' => false)),
      'notepatri'                   => new sfValidatorDoctrineChoice(array('model' => 'BibNotepatri', 'required' => false)),
      'patrimonialite'              => new sfValidatorString(array('max_length' => 200, 'required' => false)),
      'info_risquenat'              => new sfValidatorString(array('max_length' => 200, 'required' => false)),
      'info_masque'                 => new sfValidatorString(array('max_length' => 200, 'required' => false)),
      'remarques'                   => new sfValidatorString(array('max_length' => 1000, 'required' => false)),
      'valide'                      => new sfValidatorBoolean(array('required' => false)),
      'rel_masques_list'            => new sfValidatorDoctrineChoiceMany(array('model' => 'BibMasque', 'required' => false)),
      'rel_risquenats_list'         => new sfValidatorDoctrineChoiceMany(array('model' => 'BibRisquenat', 'required' => false)),
      'rel_protections_list'        => new sfValidatorDoctrineChoiceMany(array('model' => 'BibProtection', 'required' => false)),
      'rel_ident_perspectives_list' => new sfValidatorDoctrineChoiceMany(array('model' => 'BibPerspective', 'required' => false)),
    ));

    $this->widgetSchema->setNameFormat('identification[%s]');

    $this->errorSchema = new sfValidatorErrorSchema($this->validatorSchema);

    parent::setup();
  }

  public function getModelName()
  {
    return 'Identification';
  }

  public function updateDefaultsFromObject()
  {
    parent::updateDefaultsFromObject();


    if (isset($this->widgetSchema['rel_masques_list']))
    {
      $this->setDefault('rel_masques_list', $this->object->RelMasques->getPrimaryKeys());
    }


    if (isset($this->widgetSchema['rel_risquenats_list']))
    {
      $this->setDefault('rel_risquenats_list', $this->object->RelRisquenats->getPrimaryKeys());
    }


    if (isset($this->widgetSchema['rel_protections_list']))
    {
      $this->setDefault('rel_protections_list', $this->object->RelProtections->getPrimaryKeys());
    }


    if (isset($this->widgetSchema['rel_ident_perspectives_list']))
    {
      $this->setDefault('rel_ident_perspectives_list', $this->object->RelIdentPerspectives->getPrimaryKeys());
    }

  }

  protected function doSave($con = null)
  {
    parent::doSave($con);

    $this->saveRelMasquesList($con);
    $this->saveRelRisquenatsList($con);
    $this->saveRelProtectionsList($con);
    $this->saveRelIdentPerspectivesList($con);
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
