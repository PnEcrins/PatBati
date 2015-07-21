	protected function prepareJsonValues($form)
	{
		$extjGenerator = new sfMmwExtjsGenerator('<?php echo $this->getSingularName() ?>');
		$extjGenerator->setIndentation(false);

		$this->getRadioAndCheckBoxFields($form, $extjGenerator);

		foreach ($form as $field => $widget)
		{
			if(isset($form[$field])) {
				$widget = $form[$field]->getWidget();

				switch(get_class($widget))
				{
					case 'sfWidgetFormInputFileEditable':
						$value = call_user_func(array($this-><?php echo $this->getSingularName() ?>, 'get'.sfInflector::classify($field)));
						$this->json['data'] = array(sfMmwExtjsUtil::getSfExtjsNameFromField('<?php echo $this->getSingularName() ?>', $field).'_hidden' => $value);
					break;
				}
			}
		}
	}

	protected function getRadioAndCheckBoxFields($form, $extjGenerator)
	{
		<?php foreach ($this->getRadioOrCheckBoxGroupNames() as $name): echo "\n"; ?>
		// Group '<?php echo $name; ?>'
		$fieldConfig = array('list' 	   => $extjGenerator->getRadioOrCheckBoxGroupItemsConfig($form['<?php echo $name; ?>']->getWidget(), '<?php echo $name; ?>'),
							 'containerId' => sfMmwExtjsUtil::getSfExtjsNameFromField('<?php echo $this->getSingularName() ?>', '<?php echo $name; ?>'));

		$this->json['action']['addFields'][] = $fieldConfig;
		<?php endforeach; echo "\n"; ?>
	}

  protected function processForm(sfWebRequest $request, sfForm $form)
  {
    $formValues = array();
	$requestParameters = $request->getParameterHolder()->getAll();
	$formValues =  sfMmwExtjsUtil::getSfParamsFromExtjs('<?php echo $this->getSingularName() ?>', $requestParameters);
    $formValues = $this->prepareFormValues($formValues, $form);

    $files = $this->getSfFilesParamsFromExtjs($_FILES, '<?php echo $this->getSingularName() ?>');
    //$form->bind($request->getParameter($form->getName()), $request->getFiles($form->getName()));


	$fieldsToPost = isset($requestParameters['fields'])?json_decode($requestParameters['fields']):null;
	foreach($this->form->getWidgetSchema()->getFields() as $fieldname => $widget)
    {
    	if ($fieldsToPost != null)
    	{			
			$fieldCompleteName = (get_class($widget) == 'sfWidgetFormSchemaDecorator') ? $fieldname : sfMmwExtjsUtil::getSfExtjsNameFromField('<?php echo $this->getSingularName() ?>', $fieldname);
			
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

      $<?php echo $this->getSingularName() ?> = $this->processValidForm($request, $form);
	    
      $this->json['data'] = $this->getObjectValues($this->json['data'], $<?php echo $this->getSingularName() ?>);

/*
      if (!$editable)
      {
		  $displayValues = $this->getFieldsValues($<?php echo $this->getSingularName() ?>, false, true);
	      foreach ($displayValues as $key => $displayValue)
	      {
	      	$this->json['data'][$key] = $displayValue;
	      }
      }
*/

      $this->dispatcher->notify(new sfEvent($this, 'admin.save_object', array('object' => $<?php echo $this->getSingularName() ?>)));
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
			$this->json['errors'][sfMmwExtjsUtil::getSfExtjsNameFromField('<?php echo $this->getSingularName() ?>', $field)] =  $error->getMessage();
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
	   return array_merge(sfMmwExtjsUtil::getExtjsParamsfromArray('<?php echo $this->getSingularName() ?>', $objectArray), $data);
	}
	else
	{
	   return sfMmwExtjsUtil::getExtjsParamsfromArray('<?php echo $this->getSingularName() ?>', $objectArray);
	}
  }