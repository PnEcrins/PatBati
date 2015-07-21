<?php

require_once(dirname(__FILE__).'/../lib/BaseIdentificationGeneratorConfiguration.class.php');
require_once(dirname(__FILE__).'/../lib/BaseIdentificationGeneratorHelper.class.php');

/**
 * identification actions.
 *
 * @package    ##PROJECT_NAME##
 * @subpackage identification
 * @author     ##AUTHOR_NAME##
 * @version    SVN: $Id: actions.class.php 12493 2008-10-31 14:43:26Z fabien $
 */
class autoIdentificationActions extends sfBaseMmwExtjsActions
{
  public function preExecute()
  {
  	$this->json['data'] = array();
  	
    $this->configuration = new identificationGeneratorConfiguration();

    if (!$this->getUser()->hasCredential($this->configuration->getCredentials($this->getActionName())))
    {
      $this->forward(sfConfig::get('sf_secure_module'), sfConfig::get('sf_secure_action'));
    }

	// set credential info for extjs
	// this is used for extjs for example to hide the "save" button in form
	$this->json['credentials']['save'] = $this->getUser()->hasCredential($this->configuration->getCredentials('save'));
 	$this->json['credentials']['delete'] = $this->getUser()->hasCredential($this->configuration->getCredentials('delete'));
 	
 	// check if the user has admin rights, may be used for different purposes
 	$this->json['credentials']['admin'] = $this->getUser()->hasCredential($this->configuration->getCredentials('admin'));

    $this->dispatcher->notify(new sfEvent($this, 'admin.pre_execute', array('configuration' => $this->configuration)));

    $this->helper = new identificationGeneratorHelper();
  }



	public function ObjectJsonEncode($Object, $editor) {
    	// this line should be imporved by getting only the necessary fields
    	// for example for a grid, just retunr the necessary colmuns
    	$row = sfMmwExtjsUtil::getExtjsParamsfromArray('identification', $this->getFieldsValues($Object, $editor));
    	
    	return $row;
    	
	}

 
	protected function getFieldsValues($object, $editor, $with_complete_names=false)
	{
		$form = $this->configuration->getForm();
		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'valide'):'valide';
		$fieldsValues[$keyName] = $object->getValide();

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'indexbatiment'):'indexbatiment';
		$fieldsValues[$keyName] = $object->getIndexbatiment();

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'appelation'):'appelation';
		$fieldsValues[$keyName] = $object->getAppelation();

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'codeclasse'):'codeclasse';
		if ($editor)
		{
			$fieldsValues[$keyName] = $object->getCodeclasse();
		}
		else
		{
			$fieldsValues[$keyName] = sfMmwExtjsUtil::getFieldToString($object, 'BibClasseArchi');
		}

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'notepatri'):'notepatri';
		if ($editor)
		{
			$fieldsValues[$keyName] = $object->getNotepatri();
		}
		else
		{
			$fieldsValues[$keyName] = sfMmwExtjsUtil::getFieldToString($object, 'BibNotepatri');
		}

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'codeconservation'):'codeconservation';
		if ($editor)
		{
			$fieldsValues[$keyName] = $object->getCodeconservation();
		}
		else
		{
			$fieldsValues[$keyName] = sfMmwExtjsUtil::getFieldToString($object, 'BibConservation');
		}

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'codeinsee'):'codeinsee';
		if ($editor)
		{
			$fieldsValues[$keyName] = $object->getCodeinsee();
		}
		else
		{
			$fieldsValues[$keyName] = sfMmwExtjsUtil::getFieldToString($object, 'BibCommune');
		}

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'secteur_commune'):'secteur_commune';
		$fieldsValues[$keyName] = $object->getSecteurCommune();

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'link_fiche_summary'):'link_fiche_summary';
		$fieldsValues[$keyName] = $object->getLinkFicheSummary();

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'link_fiche'):'link_fiche';
		$fieldsValues[$keyName] = $object->getLinkFiche();

		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('identification', 'date_update'):'date_update';
		$fieldsValues[$keyName] = $object->getDateUpdate();

		return $fieldsValues;
	}	

	

	protected function FormJsonEncode() 
	{
		foreach($this->form as $name => $field)
		{
			$value = $this->form[$name]->getValue();
			
			switch(get_class($this->form[$name]))
			{
				case 'sfFormFieldSchema':
					$row[$name] = $value;
				break;
				default:
					$row[$name] = is_array($value) ? implode(',', $value) : $value;
				break;
			}
		}
		$row = sfMmwExtjsUtil::getExtjsParamsfromArray('identification', $row);

		return $row;		
	}
	
	protected function FormRelationsJsonEncode($mode='form') 
	{
		if (isset($this->form['codeclasse']))
		{
			$this->form->getWidget('codeclasse')->setOption('order_by', array('classe', 'asc'));
		}
		if (isset($this->form['codeinsee']))
		{
			$this->form->getWidget('codeinsee')->setOption('order_by', array('commune', 'asc'));
		}
		if (isset($this->form['codepem']))
		{
			$this->form->getWidget('codepem')->setOption('order_by', array('pem', 'asc'));
		}
		if (isset($this->form['codefaitage']))
		{
			$this->form->getWidget('codefaitage')->setOption('order_by', array('faitage', 'asc'));
		}
	    
	    return $this->getRelationChoices($this->form, 'identification', $mode);
	}

  public function executeIndex(sfWebRequest $request)
  {
    // sorting
    if ($request->hasParameter('sort'))
    {
      //$this->setSort(array($request->getParameter('sort'), $request->getParameter('sort_type')));
      $sortField = sfMmwExtjsUtil::getSfFieldNameFromExtjs($request->getParameter('sort'));
      
      $this->setSort(array($sortField, strtolower($request->getParameter('dir'))));
    }

	//set filters
	$this->setFilters('identification',$request->getParameterHolder()->getAll());
    
    $this->sort = $this->getSort();
    
    if ($request->hasParameter('dontUsePager'))
    {
	    $json = $this->simpleListJsonEncode($this->getSimpleListResults($request));
    }
    else
    {
    	$this->pager = $this->getPager($request);
	    
	    $editor = ($request->hasParameter('editorGrid') && $request->getParameter('editorGrid') == true) ? true : false;
	    $json = $this->pagerResultsListJsonEncode($this->pager, $editor);
    }
    
    $json = array_merge_recursive($json, $this->json); 
    $this->setRequestParameter('json', $json);
	$this->forward($this->getModuleName(), 'jsonResponse');
  }
  
  protected function getSimpleListResults(sfWebRequest $request)
  {  	
  	$query = $this->buildQuery($request);
  	
  	return $query->execute();
  }

  public function executeLoadFilters(sfWebRequest $request)
  {
  	$filterForm = $this->configuration->getFilterForm(array());
  
    $this->json['success'] = true;	
	$this->json['list'] = $this->getRelationChoices($filterForm, 'identification', 'filter');	
    
    $this->setRequestParameter('json', $this->json);
    $this->forward($this->getModuleName(), 'jsonResponse');
  }
  
  protected function getGridColumnsList()
  {
  	return array('valide','indexbatiment','appelation','codeclasse','notepatri','codeconservation','codeinsee','secteur_commune','link_fiche_summary','link_fiche','date_update');
  }

  protected function getFormFieldsList()
  {
  	return array('indexbatiment','ancienindexbatiment','appelation','notepatri','patrimonialite','codeclasse','proprietaire','indivision','rel_protections_list','codeinsee','lieu_dit','cadastre','l2x','l2y','altitude','denivelle','indexbatiment','codepem','codefaitage','situationgeo','exposition','pente','rel_risquenats_list','info_risquenat','rel_masques_list','info_masque','codeconservation','remarques','rel_ident_perspectives_list','valide');
  }


  public function executeNew(sfWebRequest $request)
  {
    $this->form = $this->configuration->getForm();
    $this->identification = $this->form->getObject();
    
    $this->json['success'] = true;
    $this->prepareJsonValues($this->form);
    $this->json['data'] = array_merge($this->json['data'], $this->FormJsonEncode());
    if ($request->hasParameter('loadStores') && ($request->getParameter('loadStores') == true))
    {
    	$this->json['list'] = $this->FormRelationsJsonEncode();	
    }
    
    $this->setRequestParameter('json', $this->json);
    $this->forward($this->getModuleName(), 'jsonResponse');
  }

  public function executeCreate(sfWebRequest $request)
  {
    $this->form = $this->configuration->getForm();
    $this->identification = $this->form->getObject();

    $this->processForm($request, $this->form);

    //$this->setTemplate('new');
  }

  public function executeEdit(sfWebRequest $request)
  {
    $this->identification = $this->getRoute()->getObject();
    $this->form = $this->configuration->getForm($this->identification);
    
    $this->json['success'] = true;
    $this->prepareJsonValues($this->form);
    $this->json['data'] = array_merge($this->json['data'], $this->FormJsonEncode());
    if ($request->hasParameter('loadStores') && ($request->getParameter('loadStores') == true))
    {
    	$this->json['list'] = $this->FormRelationsJsonEncode();	
    }
    
    $this->setRequestParameter('json', $this->json);
    $this->forward($this->getModuleName(), 'jsonResponse');
  }
  public function executeUpdate(sfWebRequest $request)
  {
    $this->identification = $this->getRoute()->getObject();
    $this->form = $this->configuration->getForm($this->identification);

    $this->processForm($request, $this->form);

    //$this->setTemplate('edit');
  }

  public function executeDelete(sfWebRequest $request)
  {
    $request->checkCSRFProtection();

    $this->dispatcher->notify(new sfEvent($this, 'admin.delete_object', array('object' => $this->getRoute()->getObject())));

    $this->getRoute()->getObject()->delete();

    //$this->getUser()->setFlash('notice', 'The item was deleted successfully.');
    
    $this->json['success'] = true;
	$this->setRequestParameter('json', $this->json);
	$this->forward($this->getModuleName(), 'jsonResponse');

    //$this->redirect('@identification');
  }


	protected function prepareJsonValues($form)
	{
		$extjGenerator = new sfMmwExtjsGenerator('identification');
		$extjGenerator->setIndentation(false);

		$this->getRadioAndCheckBoxFields($form, $extjGenerator);

		foreach ($form as $field => $widget)
		{
			if(isset($form[$field])) {
				$widget = $form[$field]->getWidget();

				switch(get_class($widget))
				{
					case 'sfWidgetFormInputFileEditable':
						$value = call_user_func(array($this->identification, 'get'.sfInflector::classify($field)));
						$this->json['data'] = array(sfMmwExtjsUtil::getSfExtjsNameFromField('identification', $field).'_hidden' => $value);
					break;
				}
			}
		}
	}

	protected function getRadioAndCheckBoxFields($form, $extjGenerator)
	{
		
	}

  protected function processForm(sfWebRequest $request, sfForm $form)
  {
    $formValues = array();
	$requestParameters = $request->getParameterHolder()->getAll();
	$formValues =  sfMmwExtjsUtil::getSfParamsFromExtjs('identification', $requestParameters);
    $formValues = $this->prepareFormValues($formValues, $form);

    $files = $this->getSfFilesParamsFromExtjs($_FILES, 'identification');
    //$form->bind($request->getParameter($form->getName()), $request->getFiles($form->getName()));


	$fieldsToPost = isset($requestParameters['fields'])?json_decode($requestParameters['fields']):null;
	foreach($this->form->getWidgetSchema()->getFields() as $fieldname => $widget)
    {
    	if ($fieldsToPost != null)
    	{			
			$fieldCompleteName = (get_class($widget) == 'sfWidgetFormSchemaDecorator') ? $fieldname : sfMmwExtjsUtil::getSfExtjsNameFromField('identification', $fieldname);
			
			if (!in_array($fieldCompleteName, $fieldsToPost))
			{
	    		unset($form[$fieldname]);
			}
    	}
    }

    $form->bind($formValues, $files);
    if ($form->isValid())
    {
      //$this->getUser()->setFlash('notice', $form->getObject()->isNew() ? 'The item was created successfully.' : 'The item was updated successfully.');

      $identification = $this->processValidForm($request, $form);
	    
      $this->json['data'] = $this->getObjectValues($this->json['data'], $identification);

/*
      if (!$editable)
      {
		  $displayValues = $this->getFieldsValues($identification, false, true);
	      foreach ($displayValues as $key => $displayValue)
	      {
	      	$this->json['data'][$key] = $displayValue;
	      }
      }
*/

      $this->dispatcher->notify(new sfEvent($this, 'admin.save_object', array('object' => $identification)));
    }
    else
    {
      //$this->getUser()->setFlash('error', 'The item has not been saved due to some errors.');

      $this->json['success'] = false;
      $this->json['data'] = false;

 	  if($form->hasErrors())
 	  {
		$this->json['errormsg'] = 'Data has not been saved';

		// set individual error field
		foreach ($form->getErrorSchema() as $field => $error)
		{
			$this->json['errors'][sfMmwExtjsUtil::getSfExtjsNameFromField('identification', $field)] =  $error->getMessage();
		}
 	  }
    }

    $this->setRequestParameter('json', $this->json);
	$this->forward($this->getModuleName(), 'jsonResponse');

  }
  
  protected function getObjectValues($data, $object)
  {
    $objectArray = $object->toArray();
  
    if(is_array($data))
	{
	   return array_merge(sfMmwExtjsUtil::getExtjsParamsfromArray('identification', $objectArray), $data);
	}
	else
	{
	   return sfMmwExtjsUtil::getExtjsParamsfromArray('identification', $objectArray);
	}
  }

  protected function getPager(sfWebRequest $request)
  {
    $pager = $this->configuration->getPager('Identification');
    $pager->setQuery($this->buildQuery($request));
    $pager->setPage($this->getPage());
    $pager->init();

    return $pager;
  }

/*
  protected function setPage($page)
  {
    $this->getUser()->setAttribute('identification.page', $page, 'admin_module');
  }

  protected function getPage()
  {
    return $this->getUser()->getAttribute('identification.page', 1, 'admin_module');
  }
*/
  
  protected function buildQuery(sfWebRequest $request)
  {
    $tableMethod = $this->configuration->getTableMethod();
	/*
    if (is_null($this->filters))
    {
      $this->filters = $this->configuration->getFilterForm($this->getFilters());
    }
    */

	$this->filterForm = $this->configuration->getFilterForm(array());    
    $this->filterForm->setTableMethod($tableMethod);

    $query = $this->filterForm->buildQuery($this->getFilters());

	$this->processMmwExtJSFilters($request->getParameterHolder()->getAll(), $query);

    $this->addSortQuery($query);

	$displayField = $this->configuration->getDisplayField();
	
	if (!empty($displayField) && $request->hasParameter('query'))
	{
		$query->addWhere($query->getRootAlias() . '.' . $displayField . ' LIKE ?', $request->getParameter('query') . '%');
	}

	/*
    $event = $this->dispatcher->filter(new sfEvent($this, 'admin.build_query'), $query);
    $query = $event->getReturnValue();
	*/

    return $query;
  }

  protected function addSortQuery($query)
  {
  	$query = $this->addRemoteSort($query);
  	
    if (array(null, null) == ($sort = $this->getSort()))
    {
      return;
    }

    $query->addOrderBy($sort[0] . ' ' . $sort[1]);
  }

  protected function addRemoteSort($query)
  {
    return $query;
  }
  
  protected function getSort()
  {
  	/*
    if (!is_null($sort = $this->getUser()->getAttribute('identification.sort', null, 'admin_module')))
    {
      return $sort;
    }
    */

    if(!$this->sort)
    {
    	$this->setSort($this->configuration->getDefaultSort());
    }

//    return $this->getUser()->getAttribute('identification.sort', null, 'admin_module');

	return $this->sort;
  }

  protected function setSort(array $sort)
  {
    if (!is_null($sort[0]) && is_null($sort[1]))
    {
      $sort[1] = 'asc';
    }

    $this->sort = $sort;

//    $this->getUser()->setAttribute('identification.sort', $sort, 'admin_module');
  }
}
