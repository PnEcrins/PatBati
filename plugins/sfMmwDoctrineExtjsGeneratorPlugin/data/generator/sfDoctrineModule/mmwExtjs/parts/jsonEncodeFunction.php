
	public function ObjectJsonEncode($Object, $editor) {
    	// this line should be imporved by getting only the necessary fields
    	// for example for a grid, just retunr the necessary colmuns
    	$row = sfMmwExtjsUtil::getExtjsParamsfromArray('<?php echo $this->getSingularName() ?>', $this->getFieldsValues($Object, $editor));
    	
    	return $row;
    	
	}

 
	protected function getFieldsValues($object, $editor, $with_complete_names=false)
	{
		$form = $this->configuration->getForm();
<?php $form = $this->configuration->getForm(); ?>
<?php foreach ($this->configuration->getValue('list.display') as $name => $field): ?>
		$keyName = $with_complete_names?sfMmwExtjsUtil::getSfExtjsNameFromField('<?php echo $this->getSingularName() ?>', '<?php echo $name ?>'):'<?php echo $name ?>';
<?php if ($table_name = $this->getForeignKeyRelatedTableName($field->getName())): ?>
		if ($editor)
		{
			$fieldsValues[$keyName] = $object-><?php echo $this->getColumnGetter($field->getName(), false) ?>();
		}
		else
		{
			$fieldsValues[$keyName] = sfMmwExtjsUtil::getFieldToString($object, '<?php echo $table_name; ?>');
		}
<?php elseif(isset($form[$field->getName()]) && in_array(get_class($form[$field->getName()]->getWidget()), array(
			'sfWidgetFormChoice',
			'sfWidgetFormChoiceMany',
			'sfWidgetFormSelect',
			'sfWidgetFormSelectCheckbox',
			'sfWidgetFormSelectMany',
			'sfWidgetFormSelectRadio'))): ?>
		if ($editor)
		{
			$fieldsValues[$keyName] = $object-><?php echo $this->getColumnGetter($field->getName(), false) ?>();
		}
		else
		{
			$fieldsValues[$keyName] = sfMmwExtjsUtil::getFieldDisplayValueFromChoice($object-><?php echo $this->getColumnGetter($field->getName(), false) ?>(), $form['<?php echo $field->getName() ?>']->getWidget()->getOption('choices'));
		}
<?php else: ?>
		$fieldsValues[$keyName] = $object-><?php echo $this->getColumnGetter($field->getName(), false) ?>();
<?php endif; ?>

<?php endforeach; ?>
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
		$row = sfMmwExtjsUtil::getExtjsParamsfromArray('<?php echo $this->getSingularName() ?>', $row);

		return $row;		
	}
	
	protected function FormRelationsJsonEncode($mode='form') 
	{
<?php foreach($this->getFormSortFields() as $fieldName => $sort): ?>
<?php list($sortField, $sortOrder) = $sort; ?>
		if (isset($this->form['<?php echo $fieldName; ?>']))
		{
			$this->form->getWidget('<?php echo $fieldName; ?>')->setOption('order_by', array('<?php echo $sortField; ?>', '<?php echo $sortOrder; ?>'));
		}
<?php endforeach; ?>
	    
	    return $this->getRelationChoices($this->form, '<?php echo $this->getSingularName() ?>', $mode);
	}
