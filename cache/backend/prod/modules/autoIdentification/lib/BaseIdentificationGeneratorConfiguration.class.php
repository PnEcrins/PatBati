<?php

/**
 * identification module configuration.
 *
 * @package    ##PROJECT_NAME##
 * @subpackage identification
 * @author     ##AUTHOR_NAME##
 * @version    SVN: $Id: configuration.php 12831 2008-11-09 14:33:38Z fabien $
 */
class BaseIdentificationGeneratorConfiguration extends sfMmwExtjsModelGeneratorConfiguration
{
  public function getCredentials($action)
  {
    if (0 === strpos($action, '_'))
    {
      $action = substr($action, 1);
    }

    return isset($this->configuration['credentials'][$action]) ? $this->configuration['credentials'][$action] : array();
  }

  public function getActionsDefault()
  {
    return array(  '_save' =>   array(    'credentials' => 'save',  ),);
  }

  public function getFormActions()
  {
    return array(  '_delete' => NULL,  '_list' => NULL,  '_save' => NULL,  '_save_and_add' => NULL,);
  }

  public function getNewActions()
  {
    return array();
  }

  public function getEditActions()
  {
    return array();
  }

  public function getListObjectActions()
  {
    return array(  '_edit' => NULL,  '_delete' => NULL,);
  }

  public function getListActions()
  {
    return array(  '_new' => NULL,);
  }

  public function getListBatchActions()
  {
    return array(  '_delete' => NULL,);
  }

  public function haveToEnableListFilters()
  {
    return false;
  }

  public function getListParams()
  {
    return '%%valide%% - %%indexbatiment%% - %%appelation%% - %%codeclasse%% - %%notepatri%% - %%codeconservation%% - %%codeinsee%% - %%secteur_commune%% - %%link_fiche_summary%% - %%link_fiche%% - %%date_update%%';
  }

  public function getListLayout()
  {
    return 'tabular';
  }

  public function getListTitle()
  {
    return 'Liste des bâtiments';
  }
  
  public function getListPagerCaption()
  {
    return '';
  }

  public function getListPagerEmptyCaption()
  {
    return '';
  }

  public function getEditTitle()
  {
    return 'Edit Identification';
  }

  public function getNewTitle()
  {
    return 'New Identification';
  }

  public function getFilterDisplay()
  {
    return array(  0 => 'appelation',);
  }

  public function getFormDisplay()
  {
    return array(  0 =>   array(    'Renseignements' =>     array(      0 => 'indexbatiment',      1 => 'ancienindexbatiment',      2 => 'appelation',      3 => 'notepatri',      4 => 'patrimonialite',      5 => 'codeclasse',      6 => 'proprietaire',      7 => 'indivision',      8 => 'rel_protections_list',    ),    'Géographie' =>     array(      0 => 'codeinsee',      1 => 'lieu_dit',      2 => 'cadastre',      3 => 'l2x',      4 => 'l2y',      5 => 'altitude',      6 => 'denivelle',    ),  ),  1 =>   array(    'Situation' =>     array(      0 => 'indexbatiment',      1 => 'codepem',      2 => 'codefaitage',      3 => 'situationgeo',      4 => 'exposition',      5 => 'pente',    ),    'Contexte naturel' =>     array(      0 => 'rel_risquenats_list',      1 => 'info_risquenat',      2 => 'rel_masques_list',      3 => 'info_masque',    ),  ),  2 =>   array(    'Etat' =>     array(      0 => 'codeconservation',      1 => 'remarques',    ),    'Perspectives' =>     array(      0 => 'rel_ident_perspectives_list',    ),    'Inventaire du bâtiment' =>     array(      0 => 'valide',    ),  ),  3 =>   array(  ),);
  }

  public function getEditDisplay()
  {
    return array();
  }

  public function getNewDisplay()
  {
    return array();
  }

  public function getListDisplay()
  {
    return array(  0 => 'valide',  1 => 'indexbatiment',  2 => 'appelation',  3 => 'codeclasse',  4 => 'notepatri',  5 => 'codeconservation',  6 => 'codeinsee',  7 => 'secteur_commune',  8 => 'link_fiche_summary',  9 => 'link_fiche',  10 => 'date_update',);
  }

  public function getListFormFormTitle()
  {
    return '';
  }

  public function getListFormListTitle()
  {
    return ;
  }

  public function getListFormFormWidth()
  {
    return '0.66';
  }

  public function getListFormListWidth()
  {
    return '0.33';
  }

  public function getListFormListHeight()
  {
    return '299';
  }

  public function getFieldsDefault()
  {
    return array(
      'indexbatiment' => array(  'is_link' => true,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Nouveau numéro',),
      'ancienindexbatiment' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Ancien numéro',),
      'codepem' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'ForeignKey',  'label' => 'Emplacement dans la pente',  'sort' =>   array(    0 => 'pem',    1 => 'asc',  ),),
      'codeclasse' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'ForeignKey',  'label' => 'Type architectural',  'sort' =>   array(    0 => 'classe',    1 => 'asc',  ),),
      'codefaitage' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'ForeignKey',  'label' => 'Orientation du faitage',  'sort' =>   array(    0 => 'faitage',    1 => 'asc',  ),),
      'codeconservation' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'ForeignKey',  'label' => 'Etat général',),
      'codeinsee' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'ForeignKey',  'label' => 'Commune',  'sort' =>   array(    0 => 'commune',    1 => 'asc',  ),),
      'appelation' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Appellation',),
      'indivision' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Boolean',  'label' => 'Bâtiment en indivision',),
      'proprietaire' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Propriétaire(s)',),
      'cadastre' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'N° de parcelle du cadastre',),
      'lieu_dit' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Lieu dit',  'width' => 325,),
      'altitude' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Altitude',),
      'l2x' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Coordonnée X',),
      'l2y' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Coordonnée Y',),
      'situationgeo' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Situation géographique',  'height' => 150,  'width' => '\'95%\'',),
      'denivelle' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Dénivellé',),
      'exposition' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'ForeignKey',  'label' => 'Exposition',),
      'pente' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Pente (en degrés)',),
      'capacite' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',),
      'date_insert' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Date',),
      'date_update' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Date',  'label' => 'Date de mise à jour',),
      'bat_suppr' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Boolean',),
      'notepatri' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'ForeignKey',  'label' => 'Valeur patrimoniale',),
      'patrimonialite' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Patrimonialité',  'height' => '\'100%\'',  'width' => '\'100%\'',),
      'info_risquenat' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Commentaire',  'width' => 450,),
      'info_masque' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Commentaire',  'width' => 450,),
      'remarques' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Remarques',  'height' => 200,  'width' => '\'100%\'',),
      'valide' => array(  'is_link' => false,  'is_real' => true,  'is_partial' => false,  'is_component' => false,  'type' => 'Boolean',  'label' => 'Validé',  'renderer' => 'function(value) { return scope.getRecordCheckboxDisplayImage(value); }',),
      'rel_masques_list' => array(  'is_link' => false,  'is_real' => false,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Masques',),
      'rel_risquenats_list' => array(  'is_link' => false,  'is_real' => false,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Evènements',),
      'rel_protections_list' => array(  'is_link' => false,  'is_real' => false,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Règlementation',),
      'rel_ident_perspectives_list' => array(  'is_link' => false,  'is_real' => false,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Perspectives',),
      'secteur_commune' => array(  'is_link' => false,  'is_real' => false,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Secteur',),
      'fichier' => array(  'is_link' => false,  'is_real' => false,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Photo du bâtiment',),
      'link_fiche_summary' => array(  'is_link' => false,  'is_real' => false,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Fiche-résumé',),
      'link_fiche' => array(  'is_link' => false,  'is_real' => false,  'is_partial' => false,  'is_component' => false,  'type' => 'Text',  'label' => 'Fiche',),
    );
  }

  public function getFieldsList()
  {
    return array(
      'indexbatiment' => array(),
      'ancienindexbatiment' => array(),
      'codepem' => array(),
      'codeclasse' => array(),
      'codefaitage' => array(),
      'codeconservation' => array(),
      'codeinsee' => array(),
      'appelation' => array(),
      'indivision' => array(),
      'proprietaire' => array(),
      'cadastre' => array(),
      'lieu_dit' => array(),
      'altitude' => array(),
      'l2x' => array(),
      'l2y' => array(),
      'situationgeo' => array(),
      'denivelle' => array(),
      'exposition' => array(),
      'pente' => array(),
      'capacite' => array(),
      'date_insert' => array(),
      'date_update' => array(),
      'bat_suppr' => array(),
      'notepatri' => array(),
      'patrimonialite' => array(),
      'info_risquenat' => array(),
      'info_masque' => array(),
      'remarques' => array(),
      'valide' => array(),
      'rel_masques_list' => array(),
      'rel_risquenats_list' => array(),
      'rel_protections_list' => array(),
      'rel_ident_perspectives_list' => array(),
    );
  }

  public function getFieldsFilter()
  {
    return array(
      'indexbatiment' => array(),
      'ancienindexbatiment' => array(),
      'codepem' => array(),
      'codeclasse' => array(),
      'codefaitage' => array(),
      'codeconservation' => array(),
      'codeinsee' => array(),
      'appelation' => array(),
      'indivision' => array(),
      'proprietaire' => array(),
      'cadastre' => array(),
      'lieu_dit' => array(),
      'altitude' => array(),
      'l2x' => array(),
      'l2y' => array(),
      'situationgeo' => array(),
      'denivelle' => array(),
      'exposition' => array(),
      'pente' => array(),
      'capacite' => array(),
      'date_insert' => array(),
      'date_update' => array(),
      'bat_suppr' => array(),
      'notepatri' => array(),
      'patrimonialite' => array(),
      'info_risquenat' => array(),
      'info_masque' => array(),
      'remarques' => array(),
      'valide' => array(),
      'rel_masques_list' => array(),
      'rel_risquenats_list' => array(),
      'rel_protections_list' => array(),
      'rel_ident_perspectives_list' => array(),
    );
  }

  public function getFieldsForm()
  {
    return array(
      'indexbatiment' => array(),
      'ancienindexbatiment' => array(),
      'codepem' => array(),
      'codeclasse' => array(),
      'codefaitage' => array(),
      'codeconservation' => array(),
      'codeinsee' => array(),
      'appelation' => array(),
      'indivision' => array(),
      'proprietaire' => array(),
      'cadastre' => array(),
      'lieu_dit' => array(),
      'altitude' => array(),
      'l2x' => array(),
      'l2y' => array(),
      'situationgeo' => array(),
      'denivelle' => array(),
      'exposition' => array(),
      'pente' => array(),
      'capacite' => array(),
      'date_insert' => array(),
      'date_update' => array(),
      'bat_suppr' => array(),
      'notepatri' => array(),
      'patrimonialite' => array(),
      'info_risquenat' => array(),
      'info_masque' => array(),
      'remarques' => array(),
      'valide' => array(),
      'rel_masques_list' => array(),
      'rel_risquenats_list' => array(),
      'rel_protections_list' => array(),
      'rel_ident_perspectives_list' => array(),
    );
  }

  public function getFieldsEdit()
  {
    return array(
      'indexbatiment' => array(),
      'ancienindexbatiment' => array(),
      'codepem' => array(),
      'codeclasse' => array(),
      'codefaitage' => array(),
      'codeconservation' => array(),
      'codeinsee' => array(),
      'appelation' => array(),
      'indivision' => array(),
      'proprietaire' => array(),
      'cadastre' => array(),
      'lieu_dit' => array(),
      'altitude' => array(),
      'l2x' => array(),
      'l2y' => array(),
      'situationgeo' => array(),
      'denivelle' => array(),
      'exposition' => array(),
      'pente' => array(),
      'capacite' => array(),
      'date_insert' => array(),
      'date_update' => array(),
      'bat_suppr' => array(),
      'notepatri' => array(),
      'patrimonialite' => array(),
      'info_risquenat' => array(),
      'info_masque' => array(),
      'remarques' => array(),
      'valide' => array(),
      'rel_masques_list' => array(),
      'rel_risquenats_list' => array(),
      'rel_protections_list' => array(),
      'rel_ident_perspectives_list' => array(),
    );
  }

  public function getFieldsNew()
  {
    return array(
      'indexbatiment' => array(),
      'ancienindexbatiment' => array(),
      'codepem' => array(),
      'codeclasse' => array(),
      'codefaitage' => array(),
      'codeconservation' => array(),
      'codeinsee' => array(),
      'appelation' => array(),
      'indivision' => array(),
      'proprietaire' => array(),
      'cadastre' => array(),
      'lieu_dit' => array(),
      'altitude' => array(),
      'l2x' => array(),
      'l2y' => array(),
      'situationgeo' => array(),
      'denivelle' => array(),
      'exposition' => array(),
      'pente' => array(),
      'capacite' => array(),
      'date_insert' => array(),
      'date_update' => array(),
      'bat_suppr' => array(),
      'notepatri' => array(),
      'patrimonialite' => array(),
      'info_risquenat' => array(),
      'info_masque' => array(),
      'remarques' => array(),
      'valide' => array(),
      'rel_masques_list' => array(),
      'rel_risquenats_list' => array(),
      'rel_protections_list' => array(),
      'rel_ident_perspectives_list' => array(),
    );
  }


  public function getStoreSupFields()
  {	
	return array();
  }

  /**
   * Gets a new form object.
   *
   * @param  mixed $object
   *
   * @return sfForm
   */
  public function getForm($object = null)
  {
    $class = $this->getFormClass();

    return new $class($object, $this->getFormOptions());
  }

  /**
   * Gets the form class name.
   *
   * @return string The form class name
   */
  public function getFormClass()
  {
    return 'IdentificationForm';
  }

  public function getFormOptions()
  {
    return array();
  }

  public function hasFilterForm()
  {
    return true;
  }

  /**
   * Gets the filter form class name
   *
   * @return string The filter form class name associated with this generator
   */
  public function getFilterFormClass()
  {
    return 'IdentificationFormFilter';
  }

  public function getFilterForm($filters)
  {
    $class = $this->getFilterFormClass();

    return new $class($filters, $this->getFilterFormOptions());
  }

  public function getFilterFormOptions()
  {
    return array();
  }

  public function getFilterDefaults()
  {
    return array();
  }

  public function getPager($model)
  {
    $class = $this->getPagerClass();

    return new $class($model, $this->getPagerMaxPerPage());
  }

  public function getPagerClass()
  {
    return 'sfDoctrinePager';
  }

  public function getPagerMaxPerPage()
  {
    return 500;
  }

  public function getDefaultSort()
  {
    return array('date_update', 'desc');
  }
  
	public function getRemoteSort()
	{
    return array(null, null);
	
	}
  public function getTableMethod()
  {
    return '';
  }

  public function getTableCountMethod()
  {
    return '';
  }

  public function getConnection()
  {
    return null;
  }
  
  public function getDisplayField() 
	{
		return 'appelation';
	}
  
  
}
