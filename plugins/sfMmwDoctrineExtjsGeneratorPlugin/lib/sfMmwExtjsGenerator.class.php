<?php
class sfMmwExtjsGenerator 
{
	protected $singularName;
	protected $extjsParams = array();
	protected $indentation = true; // true to force indentation of the generated code
	
	public function __construct($singularName)
	{
		$this->singularName = $singularName;
	}
	
	public function getSingularName()
	{
		return $this->singularName;
	}
	
	public function setIndentation($indentation)
	{
		$this->indentation = $indentation;
	}
	
	/*
	 * return the extjs code for a for a list of fields 
	 * note that if the fields list contain a embed form, it will be return as key in the reult array at the same level of the main 
	 * key ($fieldsetName) 
	 */
	public function getSingleFieldsetConfigArray($form, $fieldsetName, $fields, $withBracket=true) 
	{
		$fieldset = array();
		foreach($fields as $field) 
		{	
			$extParams = array();
			$widget = $form->getWidget($field->getName());
			$validator = $form->getValidator($field->getName());
			$extjsParams = $field->getConfig('extjs_params', array());
			
//echo 'NAME-'.$name.'WIDGET-'.get_class($widget);				
			// check that the field is not a "embed form". In this case, we do not include it in the fieldset
			if(get_class($widget) != 'sfWidgetFormSchemaDecorator')
			{
				$fieldset[$fieldsetName][] = $this->getConfigArray($this->getExtjsField($widget, $validator, $field->getName(), $field->getName(), $extjsParams));
			}
			
			// here the widget contains other widget, typically for multilanguage embeded forms
			else 
			{
				$name = $field->getName();			
				foreach ($widget->getPositions() as $fieldName)
				{
					$fieldset[$name][] = $this->getConfigArray($this->getExtjsField($widget[$fieldName], $validator[$fieldName], $name.'__'.$fieldName, $fieldName, $extjsParams));	
				}
			}
		}
//print_r('FIELDSET');
//print_r($fieldset);		
		return $fieldset;
	}
	
	public function getFieldsetsConfigArray($form, $fieldsets, $withBracket=true) 
	{
		$fieldsetConfig = array();
		foreach($fieldsets as $fieldset => $fields) 
		{
			$tempFieldConfig = $this->getSingleFieldsetConfigArray($form, $fieldset, $fields, $withBracket);
			foreach($tempFieldConfig as $key => $singleConfig)
			{
				$fieldsetConfig[$key] = $singleConfig;
			}
		}
		return $fieldsetConfig;
	}
	
	public function getRadioOrCheckBoxGroupItemsConfig($widget, $name)
	{
		$widgetOptions = $widget->getOptions();

		$result = array();

		// we get all parameters from the field, but for specific parameter, we may add it to extjs_params
		//$params = $field->getConfig('extjs_params', array());
		switch(get_class($widget))
		{
			case 'sfWidgetFormDoctrineChoice':
			case 'sfWidgetFormDoctrineSelect':
			case 'sfWidgetFormDoctrineChoiceMany':
			case 'sfWidgetFormDoctrineSelectMany':
				$model = sfMmwExtjsUtil::addQuote($widgetOptions['model']);
				
				switch($widgetOptions['expanded'])
				{
					case true:				
						$result = array();
						
						foreach ($widget->getChoices() as $key => $choice)
						{
							$item = array();
							$item['name'] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true);
							$item['inputValue'] = sfMmwExtjsUtil::addQuote($key);
							$item['boxLabel'] = sfMmwExtjsUtil::addQuote($choice);
							$result[] = $this->getConfigArray($item);
						}
						$result = $this->toArray($result);
				}
				break;
		}

		return $result;
	}
	
	public function getFieldsetsConfig($fieldsets, $withBracket=true)
	{
		$result = array();
		if(count($fieldsets) > -1)
		{
			foreach($fieldsets as $fieldset => $fields)
			{
				if($fieldset == 'NONE') 
				{
					$result[] = implode(',', $fields);
				}
				else 
				{
					$fieldsetConfig = array();
					$fieldsetConfig['title'] = sfMmwExtjsUtil::addQuote($fieldset);
					$fieldsetConfig['id'] = $fieldsetConfig['title'];
					$fieldsetConfig['xtype'] = sfMmwExtjsUtil::addQuote('fieldset');
					$fieldsetConfig['width'] = 400;
					$fieldsetConfig['items'] = $this->toArray($fields);
					$result[] = $this->getConfigArray($fieldsetConfig);
				}
			}
			$result = $this->toArray($result, $withBracket);
		}
		
		return $result;
	}
	
	public function getFormFields($form, $fieldsList, $withBracket=true) {
		//$form = $this->configuration->getForm();
		
		// reset the variable because, we may pass several time in the function getFormFields
		$formFields = array();
		
		foreach($fieldsList as $itemsList => $fieldsets)
		{
			$formFields[$itemsList] = $this->getFieldsetsConfigArray($form, $fieldsets, $withBracket=true);			
		}

		foreach ($formFields as $itemsList => $fieldsets)
		{
			$result[] = $this->getFieldsetsConfig($fieldsets);
		}
		
		$result = $this->toArray($result, false);
		return '['.$result.']';
	}
		
	public function getExtjsField($widget, $validator, $name, $label, $extjsParams=array()) 
	{
	
		$widgetOptions = $widget->getOptions();
		
		$result = array();
		
		$result['name'] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name, true) ;
		$result['itemId'] = $result['name'];
		$result['fieldLabel'] = sfMmwExtjsUtil::addQuote($label);
		$result['width'] = 250;
		
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
			case 'sfWidgetFormTextarea':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('textarea');
				$result['width'] = isset($extjsParams['width']) ? $extjsParams['width']: 230;
				$result['height'] = isset($extjsParams['height']) ? $extjsParams['height']: 40;
			break;
		
			// single select
			case 'sfWidgetFormDoctrineChoice':
				
				$model = sfMmwExtjsUtil::addQuote($widgetOptions['model']);
				$result['hiddenName'] = $result['name'];
				$result['name'] = sfMmwExtjsUtil::getSfExtjsNameFromField($this->getSingularName(), $name.'--name', true);
				$result['xtype'] = sfMmwExtjsUtil::addQuote('combo');
				$result['emptyText'] = sfMmwExtjsUtil::addQuote('Enter a value');
				$result['triggerAction'] = sfMmwExtjsUtil::addQuote('all');
				$result['mode'] = sfMmwExtjsUtil::addQuote('local');
//				$result['store'] = 'new mmw.'.sfInflector::underscore($widgetOptions['model']).'Store';
				$result['store'] = 'new Ext.data.ArrayStore()';
				$result['displayField'] = 'mmw.baseSf'.ucfirst(sfInflector::underscore($widgetOptions['model'])).'Object.displayField';
				$result['valueField'] = 'mmw.baseSf'.ucfirst(sfInflector::underscore($widgetOptions['model'])).'Object.keyField';

			break;
			case 'sfWidgetFormInputCheckbox':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('checkbox');
			break;
			// double select
			case 'sfWidgetFormDoctrineChoiceMany':
				$model = sfMmwExtjsUtil::addQuote($widgetOptions['model']);
				$result['xtype'] = sfMmwExtjsUtil::addQuote('mmwItemSelector');
				$result['store'] = 'new mmw.'.sfInflector::underscore($widgetOptions['model']).'Store';
				$result['width'] = 450;
			break;
			/*
			case 'sfWidgetFormInputCheckbox':
				$result['xtype'] = '';
			break;
			*/
			case 'sfWidgetFormDateTime':
			case 'sfWidgetFormDate':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('datefield');
			break;
			case 'sfWidgetFormInputFileEditable':
				$result['xtype'] = sfMmwExtjsUtil::addQuote('mmwFileUploadField');
				$result['emptyText'] = sfMmwExtjsUtil::addQuote('Select a file');
				$result['buttonText'] = sfMmwExtjsUtil::addQuote('');;
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
	
	
	protected function getConfigArray($params)
	{
		foreach($params as $key => $value)
		{
			$lineArray[] = $key.':'.$value;
		}
		
		return '{'.implode(',', $lineArray).'}';
	}
	
	protected function toArray($array, $withBracket=true) 
	{
		
		if($this->indentation)
		{
			$result = "\n\t\t".implode(",\n\t\t", $array)."\n\t";
		}
		else
		{
			$result = implode(",", $array);	
		}
		
		if($withBracket) $result = '['.$result.']';
		
		return $result;
	}
}
?>
