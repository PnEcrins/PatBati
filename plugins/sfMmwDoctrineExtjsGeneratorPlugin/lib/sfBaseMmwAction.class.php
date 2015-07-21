<?php

class sfBaseMmwExtjsActions extends sfActions
{
	var $filters = array(); // array of filters 
	var $json = array(); // result json values return to extjs
//coucou	
	/*
	 * call this action to get the javascript associated to the module
	 */
	public function executeMmwExtjs() {
		$this->setLayout(false);
	}
	
 	
	public function executeGetCredentials(sfWebRequest $request)
	{
		// we take the credentials from this->json because it is set in the preexecute function
		$json['credentials'] = $this->json['credentials'];
		$json['success'] = true;
		$this->setRequestParameter('json', $json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}
	
	/*
	 * transform values comming form extjs
	 * mainly explode values to make an array for "multiple" values
	 * not: we do the loop on widget because it allows to do complex treatement on RELATED fields on a widget like for
	 * sfWidgetFormInputFileEditable widget 
	 */
	protected function prepareFormValues($formValues, $form)
	{		
		foreach ($form as $field => $widget) 
		{
			if(isset($form[$field])) {
				$widget = $form[$field]->getWidget();
	
				switch(get_class($widget))
				{
					case 'sfWidgetFormDoctrineChoiceMany':
						if(isset($formValues[$field])) $formValues[$field] = explode(',', $formValues[$field]);
					break;
				}
			}
		}	
		return $formValues;
	}
	
	public function getSfFilesParamsFromExtjs($requestFile, $formName) 
 	{
 		$files = array();
 		if(is_array($requestFile))
 		{
	 		foreach($_FILES as $key => $filesParams)
	 		{
	 			if(strstr($key, $formName)) 
	 			{
	 				$field = sfMmwExtjsUtil::getSfFieldNameFromExtjs($key);
 					$params = array();
	 				foreach($filesParams as $key => $value)
	 				{
	 					$params[$key] = $value;
	 				}
	 			$files[$field] = $params;
	 			}
	 		}
 		}
 		return $files;
 	}
	
	protected function pagerResultsListJsonEncode($pager, $editor)
	{
		$json = array();

    	$json['count'] = $pager->getNbResults();
    	$json['data'] = array();
    	
    	foreach ($pager->getResults() as $object)
    	{
      		$json['data'][] = $this->ObjectJsonEncode($object, $editor);
    	}
//		if ($editor)
//		{
//			$this->form = $this->configuration->getForm();
//			$json['list'] = $this->FormRelationsJsonEncode();
//		}
    	
		$json['success'] = true;
		
    	return $json;
	}
	
	protected function simpleListJsonEncode($results)
	{
		$json = array();

    	$json['data'] = array();
    	
    	foreach ($results as $object)
    	{
      		$json['data'][] = $this->ObjectJsonEncode($object, false);
    	}
    	
		$json['success'] = true;
		
    	return $json;
	}	
	public function executeJsonResponse() {
		$json = $this->getRequestParameter('json', false);
	    if($json)
	    {
	     	sfConfig::set('sf_web_debug', false);
			return $this->renderText(json_encode($json));
		}
		else 
		{
			return $this->renderText('Error, no json param set');
		}
	}
    
	public function executeLoadStores()
    {
		$this->form = $this->configuration->getForm();
		$this->json['success'] = true;
		$this->json['list'] = $this->FormRelationsJsonEncode('editorgrid');
		
		$this->setRequestParameter('json', $this->json);
		
		$this->forward($this->getModuleName(), 'jsonResponse');
    }

	protected function getRelationChoices($form, $module_name, $mode='form')
	{
	    $row = array();	
	    
		switch($mode)
		{
			// TODO: modify this to work with loadFilters
			/*
			default:
			case 'form':
				$fieldsList = $this->configuration->getFormFieldsList($form);
				break;
			*/
			
			case 'editorgrid':
				$fieldsList = array_keys($this->configuration->getValue('list.display'));
				break;
		}
		
	    foreach($form->getWidgetSchema()->getFields() as $fieldname => $widget)
	    {			
	    	// In editor grid mode, we don't
	    	if (isset($fieldsList) && !in_array($fieldname, $fieldsList))
			{				
				continue;
			}
			
	    	if (method_exists($this, $method = 'add' . ucfirst(sfInflector::camelize($fieldname)) . 'ColumnQuery'))
			{
				$query = !is_null($widget->getOption('query')) ? $widget->getOption('query') : Doctrine::getTable($widget->getOption('model'))->createQuery();
				
				$widget->setOption('query', $this->$method($widget, $query));
			}
	
	    	$row = $this->processWidgetToGetChoices($module_name, $widget, $fieldname, $row, $mode);
		}
		
	    return $row;
	}
	
	protected function processEmbeddedFormToGetChoices($module_name, $widget, $embeddedFormName, $array_to_complete)
	{
		foreach ($widget->getPositions() as $fieldName)
		{
			$extjsFieldName = sfMmwExtjsUtil::getSfExtjsNameFromField($embeddedFormName, $fieldName);
			
			$array_to_complete = $this->processWidgetToGetChoices($module_name, $widget[$fieldName], $extjsFieldName, $array_to_complete);
		}
		
		return $array_to_complete;
	}
	
	protected function processWidgetToGetChoices($module_name, $widget, $fieldname, $array_to_complete, $mode='form')
	{		
    	if (in_array(get_class($widget), array(
			'sfWidgetFormChoice', 'sfWidgetFormChoiceMany',
			'sfWidgetFormSelect', 'sfWidgetFormSelectMany',
			'sfWidgetFormSelectRadio', 'sfWidgetFormSelectCheckbox',
			'sfWidgetFormDoctrineChoice', 'sfWidgetFormDoctrineChoiceMany',
			'sfWidgetFormDoctrineSelect', 'sfWidgetFormDoctrineSelectMany'
		)))
    	{			
    		if (!($mode == 'filter' && !in_array($fieldname, $this->getGridColumnsList()))
				&& !($mode == 'form' && !in_array($fieldname, $this->getFormFieldsList())))
			{
	    		$colname = sfMmwExtjsUtil::getSfExtjsNameFromField($module_name, $fieldname);
		    	$array_to_complete[$colname] = array();
				
				switch(get_class($widget))
		    	{
		    		case 'sfWidgetFormChoice':
		    		case 'sfWidgetFormChoiceMany':
		    		case 'sfWidgetFormSelect':
					case 'sfWidgetFormSelectMany':
					case 'sfWidgetFormSelectRadio':
					case 'sfWidgetFormSelectCheckbox':
						$choices = $widget->getOption('choices');
					break;
		    		case 'sfWidgetFormDoctrineChoice':
		    		case 'sfWidgetFormDoctrineChoiceMany':
		    		case 'sfWidgetFormDoctrineSelect':
		    		case 'sfWidgetFormDoctrineSelectMany':
		    			$choices = $widget->getChoices();
		    		break;
		    	}
		    	
		    	foreach ($choices as $key => $value)
		    	{
		    		if ($key === "")
		    		{
		    			$choices[$key] = 'non renseigné';
		    			break;
		    		}
		    	}
				
				switch ($mode)
				{				
					case 'filter':
						$array_to_complete[$colname] = $this->convertFilterChoices($choices);
						break;
					
					default:
						$array_to_complete[$colname] = $choices;
						break;
				}
			}
		}
		elseif (get_class($widget) == 'sfWidgetFormSchemaDecorator')
		{
			$array_to_complete = $this->processEmbeddedFormToGetChoices($module_name, $widget, $fieldname, $array_to_complete, $mode);
		}
		
		return $array_to_complete;
	}

	protected function convertFilterChoices($choices)
	{
		$size = count($choices);
				
		$convertedChoices = "[";
		$i = 0;
		foreach ($choices as $key => $choice)
		{
			$i++;
			$convertedChoices.= '[\''.addslashes($key).'\', \''.addslashes($choice).'\']';
			
			if ($i < $size)
			{
				$convertedChoices.= ',';
			}
		}
		$convertedChoices.= "]";
		
		return $convertedChoices;
	}

	protected function setRequestParameter($name, $value, $ns=null)
  	{
    	return $this->getRequest()->setParameter($name, $value, $ns);
  	}	
  	
  	/*
  	 * extjs send start and limit parameter
  	 * so we must translate the start and limit into page parameter
  	 */

	protected function getPage()
	{
		$page = 1;
		
		$limit = $this->getRequestParameter('limit');
		$start = $this->getRequestParameter('start');
		if($limit && $start) 
		{
			$page = (int)($start/$limit) + 1;
		}
		return $page;
	}
	
	/*
	 * in extjs, the filters name must have the following names:
	 * filters__[fieldname]_[option:text]
	 * this function transform filters__[fieldname]_[option:text] to this->filters[fieldname][option:text]=value
	 * in fact, you must copy here the structure of the generated filetered by the normal generator admin
	 */
	protected function setFilters($modelName, array $requestParams) 
	{	
		$params = sfMmwExtjsUtil::getSfParamsFromExtjs('filters', $requestParams);
		if(isset($params[$modelName]) && count($params[$modelName])) $this->filters = $params[$modelName];
	}

    protected function processMmwExtJSFilters(array $requestParams, $q)
    {
    	if (isset($requestParams['mmwExtJSFilters']) && ($filters = json_decode($requestParams['mmwExtJSFilters'])))
		{
			foreach ($filters as $filter)
			{
				// The obtained filter is a stdClass object. get_object_vars transforms it into an array.
				$filter = get_object_vars($filter);
				
				$fieldName = sfMmwExtjsUtil::getSfFieldNameFromExtjs($filter['field']);
				
				// Value validation
	    		switch ($filter['type'])
				{
					case 'numeric':
						$validator = new sfValidatorNumber();
						break;
					case 'boolean':
						$validator = new sfValidatorBoolean();
						break;
					case 'date':
						$validator = new sfValidatorDate();
						break;
					case 'string':
						$validator = new sfValidatorString();
						break;
					case 'list':
						$validator = new sfValidatorPass();
						
						if (!is_array($filter['value']) || (count($filter['value']) == 0))
						{
							break 2;
						}
						break;
					default:
						$validator = new sfValidatorPass();
						break;
				}
				
                try
                {
					$value = $validator->clean($filter['value']);
                }
                catch(sfValidatorError $e)
                {
					break;
                }
				


				$rootAlias = $q->getRootAlias();
				$query = $rootAlias.'.'.$fieldName;
				
				// Filter applying
	    		switch ($filter['type'])
				{
					case 'numeric':
					case 'date':
						switch($filter['comparison'])
						{
							case 'lt':
								$query.= ' < "'.$value.'"';
								break;
							case 'gt':
								$query.= ' > "'.$value.'"';
								break;
							case 'eq':
								$query.= ' = "'.$value.'"';
								break;
							default:
								break 2;
						}
						break;
					case 'boolean':
						$query.= ' = '.$value;
						break;
					case 'string':
						$query.= ' LIKE "'.$value.'%"';
						break;
					case 'list':
						$query.= ' IN (';
						
						foreach($value as $v)
						{
							$query.= '"'.$v.'"';
						}
						
						$query.= ')';
						break;
					default:
						$query.= ' = '.$value;
						break;
				}
				
			$q->addWhere($query);
			}
		}
    }


	protected function getFilters() 
	{
		if(is_null($this->filters)) $this->filters = array();
		
		return $this->filters;
	}

	protected function processValidForm(sfWebRequest $request, $form)
	{
		$this->json['success'] = true;
		$this->json['data'] = false;

		$object = $form->save();
		$this->prepareJsonValues($form);

		return $object;
	}
}
