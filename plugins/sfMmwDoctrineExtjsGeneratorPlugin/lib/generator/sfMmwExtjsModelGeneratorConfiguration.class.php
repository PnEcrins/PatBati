<?php
class sfMmwExtjsModelGeneratorConfiguration extends sfModelGeneratorConfiguration
{
	/**
 	* Gets the fields that represents the form.
 	*
 	* If no form.display parameter is passed in the configuration,
 	* all the fields from the form are returned (dynamically).
 	*
 	* @param sfForm $form    The form with the fields
 	* @param string $context The display context
 	*/
	public function getFormFields(sfForm$form, $context)
	{
		$config = $this -> getConfig();

		$method = sprintf('get%sDisplay',   ucfirst($context));
		if(!$itemsLists = $this -> $method())
		{
			$itemsLists = $this -> getFormDisplay();
		}

		if($itemsLists)
		{
			$fields = array();

			// with itemsLists?
			if(!is_array(current($itemsLists)))
			{
				$itemsLists = array($itemsLists);
			}
			foreach($itemsLists as $itemsList => $fieldsets)
			{
				$fields[$itemsList] = array();

				// with fieldsets?
				if(!is_array(current($fieldsets)))
				{
					$fieldsets = array('NONE' => $fieldsets);
				}

				foreach($fieldsets as $fieldset => $names)
				{
					$fields[$itemsList][$fieldset] = array();

					foreach($names as $name)
					{
						list($name, $flag) = sfModelGeneratorConfigurationField::splitFieldWithFlag($name);
						if(!isset($this -> configuration[$context]['fields'][$name]))
						{
							$this -> configuration[$context]['fields'][$name] = new sfModelGeneratorConfigurationField($name,   array_merge(isset($config['default'][$name]) ? $config['default'][$name] : array(), isset($config['form'][$name]) ? $config['form'][$name] : array(), isset($config[$context][$name]) ? $config[$context][$name] : array(), array('is_real' => false, 'type' => 'Text', 'flag' => $flag)));
						}

						$field = $this -> configuration[$context]['fields'][$name];
						$field -> setFlag($flag);
						$fields[$itemsList][$fieldset][$name] = $field;
					}
				}
			}
			return $fields;
		}

		$fields = array();
		foreach($form->getWidgetSchema()->getPositions() as $name)
		{
			$fields[$name] = new sfModelGeneratorConfigurationField($name,   array_merge(isset($config['default'][$name]) ? $config['default'][$name] : array(), isset($config['form'][$name]) ? $config['form'][$name] : array(), isset($config[$context][$name]) ? $config[$context][$name] : array(), array('is_real' => false, 'type' => 'Text')));
		}

		return array( array('NONE' => $fields));
	}

	public function getFormFieldsList(sfForm $form)
	{
		$fieldNames = array();

		foreach($this->getFormFields($form, $form->isNew() ? 'new' : 'edit') as $itemsList => $fieldsets)
		{
			foreach($fieldsets as $fieldset => $fields)
			{
				foreach($fields as $field)
				{
					$fieldNames[] = $field -> getName();
				}
			}
		}
		
		return $fieldNames;
	}
}
