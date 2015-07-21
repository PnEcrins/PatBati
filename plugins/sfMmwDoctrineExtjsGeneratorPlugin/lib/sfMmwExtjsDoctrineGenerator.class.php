<?php
class sfMmwExtjsDoctrineGenerator extends sfDoctrineGenerator {

	/*
	 $configuration = null,
	 $primaryKey    = array(),
	 $modelClass    = '',
	 $params        = array(),
	 $config        = array(),
	 $formObject    = null;
	 */

	protected $formFields = array(); // array containing the fieldset as keys and fields configuration as value

	public function isFileUpload()
	{
		$isFileUpload = false;
		$form = $this->configuration->getForm();
		foreach($this->configuration->getFormFields($form, $form->isNew() ? 'new' : 'edit') as $itemsList => $fieldsets)
		{
			foreach($fieldsets as $fieldset => $fields)
			{
				foreach($fields as $field)
				{
					$widget = get_class($form[$field->getName()]->getWidget());
					if($widget == 'sfWidgetFormInputFileEditable') $isFileUpload = true;
				}
			}
		}

		return $isFileUpload;
	}

	public function getFormSortFields()
	{
		$form = $this->configuration->getForm();
		
		$formFields = $this->getFormFieldsConfiguration($form, false, true);
		
		$formSortFields = array();
		foreach ($formFields as $fieldName => $formField)
		{
			if (isset($formField['sort']))
			{
				$formSortFields[$fieldName] = $formField['sort'];
			}
		}
		
		return $formSortFields;
	}

	public function getRadioOrCheckBoxGroupNames()
	{
		$formFieldsNames = array();
		
		$form = $this->configuration->getForm();
		
		foreach($this->configuration->getFormFields($form, $form->isNew() ? 'new' : 'edit') as $itemsList => $fieldsets)
		{
			foreach($fieldsets as $fieldset => $fields)
			{
				foreach($fields as $field)
				{
					$widget = $form->getWidget($field->getName());
					
					switch(get_class($widget))
					{
						case 'sfWidgetFormDoctrineChoice':
						case 'sfWidgetFormDoctrineSelect':
						case 'sfWidgetFormDoctrineChoiceMany':
						case 'sfWidgetFormDoctrineSelectMany':
							$is_expanded = $widget->getOption('expanded');

							if (!empty($is_expanded) && ($is_expanded == true))
							{
								$formFieldsNames[] = $field->getName();
							}
							break;
					}
				}
			}
		}
		
		return $formFieldsNames;
	}
	
	public function getGridSorting()
	{
		list($sortField, $sortOrder) = $this->configuration->getDefaultSort();

//		if (($sortField == null) || ($sortOrder == null))
//		{
//			$columnNames = $this->configuration->getForm()->getObject()->getTable()->getColumnNames();
//			
//			$sortField = isset($columnNames['updated_at']) ? 'updated_at' : null;
//			
//			$sortOrder = 'desc'; 
//		}
		
		if (($sortField == null) || ($sortOrder == null))
		{
			$sortField = $this->configuration->getDisplayField();
			
			$sortOrder = 'asc'; 
		}
		
		return (($sortField != null) && ($sortOrder != null))? array(sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $sortField, false), strtoupper($sortOrder)) : null;
	}
	
	public function getGridRemoteSorting()
	{
		list($sortMethod, $sortOrder) = $this->configuration->getRemoteSort();
		
		return (($sortMethod != null) && ($sortOrder != null))? array($sortMethod, $sortOrder) : null;
	}
	
	public function getTableClass()
	{
		$model = new $this->modelClass;
		$table = $model->getTable();
		
		return get_class($table); 
	}
	
	protected function getFormFieldsConfiguration($form, $hierarchyAndEncode = true, $with_sort=false)
	{
		// reset the variable because, we may pass several time in the function getFormFields
		$formFields = array();
		
		foreach($this->configuration->getFormFields($form, $form->isNew() ? 'new' : 'edit') as $itemsList => $fieldsets)
		{
			foreach($fieldsets as $fieldset => $fields)
			{
				foreach($fields as $field)
				{
					$extParams = array();
					$widget = $form->getWidget($field->getName());
					$validator = $form->getValidator($field->getName());
					
					if ($with_sort)
					{
						$sort = $field->getConfig('sort', null);
					}
					else
					{
						$sort = null;
					}
					 
					$extjsParams = $this->getExtjsParams($field);

					//echo 'NAME-'.$name.'WIDGET-'.get_class($widget);
					// check that the field is not a "embed form". In this case, we do not include it in the fieldset
					if(get_class($widget) != 'sfWidgetFormSchemaDecorator')
					{
						$label = sfInflector::humanize($field->getConfig('label', $field->getName()));
						
						$extJsField = $this->getExtjsField(false, $widget, $validator, $field->getName(), $label, $sort, $extjsParams);
						
						// The fieldsets are setted (form case) 
						if ($hierarchyAndEncode)
						{
							$formFields[$itemsList][$fieldset][] = $this->getConfigArray($extJsField);
						}
						// No hierarchy is created (editor grid case)
						else
						{
							$formFields[$field->getName()] = $extJsField;
						}
					}

					// here the widget contains other widget, the case of the embedded forms
					else
					{
						$name = $field->getName();
							
						foreach ($widget->getPositions() as $fieldName)
						{
							$label = sfInflector::humanize($field->getConfig('label', $fieldName));
							
							$extJsField = $this->getExtjsField(false, $widget[$fieldName], $validator[$fieldName], sfMmwExtjsUtil::getSfExtjsNameFromField($name, $fieldName), $label, $sort, $extjsParams);

							if ($hierarchyAndEncode)
							{
								$formFields[$itemsList][$name][] = $this->getConfigArray($extJsField);
							}
							else
							{
								$formFields[$name] = $extJsField;
							}
						}
					}
				}
			}
		}
		
		return $formFields;
	} 
	
	public function getFormFields()
	{
		$form = $this->configuration->getForm();

		$this->formFields = $this->getFormFieldsConfiguration($form);

		$i = 0;

		foreach ($this->formFields as $itemsList => $fieldsets)
		{
			$result[$i] = array();
			
//			if(count($fieldsets) > 1)
//			{
				foreach($fieldsets as $fieldset => $fields)
				{
					if($fieldset == 'NONE')
					{
						$result[$i][] = implode(',', $fields);
					}
					else
					{
						$fieldsetConfig = array();
						$fieldsetConfig['title'] = 'mmw.getI18nLabel('.sfMmwExtjsUtil::addQuote($fieldset).', '.sfMmwExtjsUtil::addQuote($fieldset).')';
						$fieldsetConfig['xtype'] = sfMmwExtjsUtil::addQuote('fieldset');
						$fieldsetConfig['width'] = 400;
						$fieldsetConfig['items'] = $this->toArray($fields);
						$fieldsetConfig['itemId'] = sfMmwExtjsUtil::addQuote($fieldset);
						$result[$i][] = $this->getConfigArray($fieldsetConfig);
					}
				}
				$result[$i] = $this->toArray($result[$i]);
//			}
//			else
//			{
//				$firstFieldset = each($this->formFields[$itemsList]);
//				reset($this->formFields[$itemsList]);
//				
//				$formFields = $firstFieldset;
//				$result[$i] = $this->toArray($formFields);
//			}
			$i++;
		}

		$result = $this->toArray($result);

		return $result;
	}

	public function getForeignKeyRelatedTableName($field_name)
	{
		$columns = $this->getColumns();

		if (!isset($columns[$field_name]))
		{
			return null;
		}
		
		if (!$columns[$field_name]->isForeignKey())
		{
			return null;
		}
		else
		{
			$relations = $this->table->getRelations();
			
			foreach($relations as $relation)
			{
				if ($relation->getLocal() == $field_name)
				{					
					return $relation->getAlias();
				} 
			}
		}
	}

	protected function getExtjsParams($field)
	{
		$width = $field->getConfig('width', null);
		$height = $field->getConfig('height', null);
		$renderer = $field->getConfig('renderer', null);
		$sortable = $field->getConfig('sortable', null);
		
		$extjsParams = array();
		if ($width !== null)
		{
			$extjsParams['width'] = $width;
		}
		if ($height !== null)
		{
			$extjsParams['height'] = $height;
		}
		if ($renderer !== null)
		{
			$extjsParams['renderer'] = $renderer;
		}
		if ($sortable !== null)
		{
			$extjsParams['sortable'] = $sortable;
		}
		
		return $extjsParams;
	}

	public function getGridFilters()
	{
		$gridColumns = array();
		
		$filterForm = $this->configuration->getFilterForm(array());
		$formFields = $filterForm->getWidgetSchema()->getFields();

		$filtersToDisplay = $this->configuration->getFilterDisplay();

		foreach ($this->configuration->getValue('list.display') as $name => $field)
		{
			if (in_array($name, $filtersToDisplay))
			{
				$params = array();
			
				$params['dataIndex'] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true);
					
				if (isset($formFields[$name]))
				{				
					$widget = $filterForm->getWidget($name);
					
					switch (get_class($widget))
					{
						case 'sfWidgetFormInput':
						case 'sfWidgetFormInputFile':
						case 'sfWidgetFormInputFileEditable':
						case 'sfWidgetFormInputPassword':
						case 'sfWidgetFormInputHidden':
						case 'sfWidgetFormFilterInput':
							$validator = $filterForm->getValidator($name);
							
							switch (get_class($validator))
							{
								case 'sfValidatorNumber':
								case 'sfValidatorInteger':
									$params['type'] = sfMmwExtjsUtil::addQuote('numeric');
									break;
									
								default:
									$params['type'] = sfMmwExtjsUtil::addQuote('string');
									break;
							}
							break;
							
			    		case 'sfWidgetFormChoice':
			    		case 'sfWidgetFormChoiceMany':
			    		case 'sfWidgetFormSelect':
						case 'sfWidgetFormSelectMany':
						case 'sfWidgetFormSelectRadio':
						case 'sfWidgetFormSelectCheckbox':
			    		case 'sfWidgetFormDoctrineChoice':
			    		case 'sfWidgetFormDoctrineChoiceMany':
			    		case 'sfWidgetFormDoctrineSelect':
			    		case 'sfWidgetFormDoctrineSelectMany':
							$params['options'] = 'Ext.decode(this.filtersData['.sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true).'])';
							$params['type'] = sfMmwExtjsUtil::addQuote('list');
							break;							
						case 'sfWidgetFormInputCheckbox':
							$params['type'] = sfMmwExtjsUtil::addQuote('boolean');
							break;
						case 'sfWidgetFormDateTime':
						case 'sfWidgetFormDate':
						case 'sfWidgetFormFilterDate':
							$params['type'] = sfMmwExtjsUtil::addQuote('date');
							break;
						default:
							$params['type'] = sfMmwExtjsUtil::addQuote('string');
							break;
					}
				}
				
				else
				{
					$params['type'] = sfMmwExtjsUtil::addQuote('string');
					$params['disabled'] = 'true';
				}
				
				$gridFilters[] = $this->getConfigArray($params);
			}
		}

		return $this->toArray($gridFilters);
	}

	public function getGridColumnsList()
	{		
		return sfMmwExtjsUtil::arrayValuesToString(array_keys($this->configuration->getValue('list.display')));
	}

	public function getFormFieldsList()
	{
		$form = $this->configuration->getForm();
		
		$fieldNames = $this->configuration->getFormFieldsList($form);
		
		return sfMmwExtjsUtil::arrayValuesToString($fieldNames);
	}

	// protected function getFieldFromForm($widgets, $name, $label, $extParams)
	protected function getExtjsField($editableGrid, $widget, $validator, $name, $label='', $sort=null, $extjsParams=array())
	{
		$widgetOptions = $widget->getOptions();

		$result = array();

		$fieldName = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true);
		if (!$editableGrid)
		{
			$result['name'] = $fieldName;
			$result['fieldLabel'] = 'mmw.getI18nLabel('.$result['name'].', '.sfMmwExtjsUtil::addQuote($label).')';
			$result['width'] = isset($extjsParams['width']) ? $extjsParams['width'] : 250;
		}
		$result['itemId'] = $fieldName;

		if (!$validator->hasOption('required') || ($validator->hasOption('required') && ($validator->getOption('required') == true)))
		{
			$result['allowBlank'] = 'false';
		}
		else
		{
			$result['allowBlank'] = 'true';
		}

		if ($validator->hasOption('max_length'))
		{
			$result['maxLength'] = $validator->getOption('max_length');
		}

		if ($validator->hasOption('min_length'))
		{
			$result['minLength'] = $validator->getOption('max_length');
		}

		// we get all parameters from the field, but for specific parameter, we may add it to extjs_params
		//$params = $field->getConfig('extjs_params', array());
		switch(get_class($widget))
		{
			case 'sfWidgetFormInputHidden':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('hidden');
				break;
			case 'sfWidgetFormInput':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('textfield');
				break;
			case 'sfWidgetFormInputPassword':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('textfield');
				$result['inputType'] = sfMmwExtjsUtil::addQuote('password');
				break;
			case 'sfWidgetFormTextarea':
				if (!$editableGrid)
				{
					$result['height'] = isset($extjsParams['height']) ? $extjsParams['height'] : ($widget->getAttribute('rows') * 10);
				}
				$result['xtype'] = sfMmwExtjsUtil::addQuote('textarea');
				break;

				// single select
			case 'sfWidgetFormDoctrineChoice':
			case 'sfWidgetFormDoctrineSelect':
			case 'sfWidgetFormDoctrineChoiceMany':
			case 'sfWidgetFormDoctrineSelectMany':
				$databaseMode = true;
			case 'sfWidgetFormChoice':
			case 'sfWidgetFormSelect':
			case 'sfWidgetFormSelectCheckbox':
			case 'sfWidgetFormSelectRadio':
			case 'sfWidgetFormChoiceMany':
			case 'sfWidgetFormSelectMany':
				if ($sort)
				{
					$result['sort'] = $sort;
				}
				
				switch(isset($widgetOptions['expanded'])?$widgetOptions['expanded']:false)
				{
					case true:
						// In case of checkboxes or radios group, we unset the name and the width
						unset($result['name']);
						unset($result['width']);
						
//						$result['items'] = array();
//						foreach ($widget->getChoices() as $key => $choice)
//						{
//							$item = array();
//							$item['name'] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true);
//							$item['inputValue'] = $key;
//							$item['boxLabel'] = sfMmwExtjsUtil::addQuote($choice);
//							$result['items'][] = $this->getConfigArray($item);
//						}
//						$result['items'] = $this->toArray($result['items']);
						
						$result['items'] = $this->toArray(array('{items: []}'));
						
						switch (($widgetOptions['multiple'])?$widgetOptions['multiple']:false)
						{
							// Checkbox Group
							case true:
								$result['xtype'] = sfMmwExtjsUtil::addQuote('checkboxgroup');
								break;
							
							// Radio Group
							case false:
								$result['xtype'] = sfMmwExtjsUtil::addQuote('radiogroup');
								break;
						}
						break;
					
					case false:
						switch (isset($widgetOptions['multiple'])?$widgetOptions['multiple']:false)
						{
							// Multi Select
							case true:	
								$result['xtype'] = sfMmwExtjsUtil::addQuote('mmwItemSelector');
								$result['store'] = 'new mmw.'.sfInflector::underscore($widgetOptions['model']).'Store';
								if (!$editableGrid)
								{
									$result['width'] = isset($extjsParams['width']) ? $extjsParams['width'] : 450;
									$result['height'] = isset($extjsParams['height']) ? $extjsParams['height'] : 130;
								}								
								
								break;
								
							// Combo Box
							case false:
								$result['xtype'] = sfMmwExtjsUtil::addQuote('combo');
							
								if (isset($databaseMode))
								{
									$sfObject = 'mmw.baseSf'.ucfirst(sfInflector::underscore($widgetOptions['model'])).'Object';
									$result['store'] = 'new Ext.data.ArrayStore({sfObject: '.$sfObject.', fields: ['.$sfObject.'.keyField, '.$sfObject.'.displayField]})';
									$result['sfDatabaseMode'] = 'true';
								}
								else
								{
									$result['store'] = 'new Ext.data.ArrayStore({fields: ["valueField", "displayField"]})';
									$result['sfDatabaseMode'] = 'false';
								}
								
								if (!$editableGrid)
								{
									$result['mode'] = sfMmwExtjsUtil::addQuote('local');
									$result['hiddenName'] = $result['name'];
									$result['name'] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name.'--name', true);
								}
								
								if (isset($databaseMode))
								{
									$sfObjectName = (isset($widgetOptions['model']) && !empty($widgetOptions['model']))?$widgetOptions['model']:$this->getSingularName();
									$result['displayField'] = 'mmw.baseSf'.ucfirst(sfInflector::underscore($sfObjectName)).'Object.displayField';
									$result['valueField'] = 'mmw.baseSf'.ucfirst(sfInflector::underscore($sfObjectName)).'Object.keyField';
								}
								else
								{
									$result['displayField'] = '"displayField"';
									$result['valueField'] = '"valueField"';
								}
							/*
							 *	The "lastQuery" config parameter define the last query string that was used to filter the store.
							 *	With triggerAction:'query' the query is the text you type, but with triggerAction:'all' the query is always the lastQuery value (= '').
							 *	Setting lastQuery to '' makes Ext think it has already filtered on '' and since the query never changes (with triggerAction:'all') it doesn't perform a filter anymore.
							 */
								$result['triggerAction'] = sfMmwExtjsUtil::addQuote('all');
								$result['lastQuery'] = sfMmwExtjsUtil::addQuote('');
														
								break;
						}
						break;	
				}
				break;
				
			case 'sfWidgetFormInputCheckbox':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('checkbox');
				break;
				/*
				 case 'sfWidgetFormInputCheckbox':
				 $result['xtype'] = '';
				 break;
				 */
			case 'sfWidgetFormDateTime':
			case 'sfWidgetFormDate':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('datefield');
//				$result['format'] = sfMmwExtjsUtil::addQuote('d/m/Y');
				break;
			case 'sfWidgetFormInputFileEditable':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('mmwFileUploadField');
				$result['emptyText'] = 'mmw.getI18nGeneral(\'FileFieldDefaultText\')';
				$result['buttonText'] = sfMmwExtjsUtil::addQuote('');
				$result['buttonCfg'] = '{iconCls: \'upload-icon\'}';
				break;
			default:
				break;
		}

		switch (get_class($validator))
		{
			case 'sfValidatorEmail':
				$result['vtype'] = sfMmwExtjsUtil::addQuote('email');
				break;
				//			case 'sfValidatorString':
				//				$result['vtype'] = sfMmwExtjsUtil::addQuote('alphanum');
				//			break;
			case 'sfValidatorUrl':
				$result['vtype'] = sfMmwExtjsUtil::addQuote('url');
				break;
			case 'sfValidatorInteger':
				$result['vtype'] = sfMmwExtjsUtil::addQuote('num');
				break;
		}

		return $result;
	}

	public function getStoreFields()
	{
		$fields = array();

		foreach ($this->configuration->getValue('list.display') as $name => $field)
		{
			$fields[] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true);
		}

		foreach ($this->configuration->getStoreSupFields() as $name)
		{
			$fields[] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true);
		}

		return $this->toArray($fields);
	}

	public function getPrimaryKey()
	{
		$keys = $this->getPrimaryKeys();
		return $keys[0];
	}

	public function getGridColumns($editable = false)
	{
		$gridColumns = array();

		$primaryKeys = array();
		foreach ($this->getPrimaryKeys() as $primaryKey)
		{
			$primaryKeys[] = sfInflector::underscore($primaryKey);
		}

		$form = $this->configuration->getForm();
		$formFields = $form->getWidgetSchema()->getFields();

		foreach ($this->configuration->getValue('list.display') as $name => $field)
		{
			$params = array();
				
			// type du champ: $field->getType()
			$extjsParams = $this->getExtjsParams($field);

			$params['header'] = 'mmw.getI18nColumnHeader('.sfMmwExtjsUtil::addQuote(sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name)).', '.sfMmwExtjsUtil::addQuote($field->getConfig('label')).')';
				
			// check if the field is a key. If yes, set it to hidden
			if(in_array($name, $primaryKeys))
			{
				$params['hidden'] = true;
			}
				
			$params['width'] = isset($extjsParams['width']) ? $extjsParams['width'] : '75';
				
			if(isset($extjsParams['renderer']))
			{
				$params['renderer'] = $extjsParams['renderer'];
			}
				
			if (isset($extjsParams['sortable']))
			{
				$params['sortable'] = $extjsParams['sortable'] ? 'true' : 'false';
			}
			else
			{
				if (isset($formFields[$name]))
				{
					$params['sortable'] = 'true';
				}
				// Si le champ n'est pas présent dans le formulaire, on ne peut pas effectuer de tri dessus
				else
				{
					$params['sortable'] = 'false';
				}
			}
			
			$params['dataIndex'] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true);
				
			if (isset($formFields[$name]))
			{
				$widget = $form->getWidget($name);
				if ($editable)
				{
					$validator = $form->getValidator($name);
					$params['editor'] = $this->getExtjsField(true, $widget, $validator, $name);
				}
				
				switch (get_class($widget))
				{
					case 'sfWidgetFormDoctrineChoice':
					case 'sfWidgetFormDoctrineSelect':
						if ($editable)
						{
							$params['renderer'] = 'function(value, metaData, record, rowIndex, colIndex) { return mmw.util.getRecordDisplayFieldValue(scope, colIndex, value); }';
						}
						break;
					case 'sfWidgetFormInputCheckbox':
						$params['renderer'] = 'function(value) { return scope.getRecordCheckboxDisplayImage(value); }';
						break;
					case 'sfWidgetFormDateTime':
					case 'sfWidgetFormDate':
						$params['renderer'] = 'function(value) { return scope.getRecordCorrectDateFormat(value); }';
						break;
				}
			}
				
			$gridColumns[] = $this->getConfigArray($params);
		}

		return $this->toArray($gridColumns);
	}

	protected function getConfigArray($params)
	{
		foreach($params as $key => $value)
		{
			if (is_array($value))
			{
				$lineArray[] = $key.':'.$this->getConfigArray($value);
			}
			else
			{
				$lineArray[] = $key.':'.$value;
			}
		}

		return '{'.implode(',', $lineArray).'}';
	}

	protected function toArray($array)
	{
		$result = "[\n\t\t".sfMmwExtjsUtil::recursiveImplode(",\n\t\t", $array)."\n\t]";
		return $result;
	}
}
?>