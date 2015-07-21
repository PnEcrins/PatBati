<?php

require_once dirname(__FILE__).'/../lib/structuresGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/structuresGeneratorHelper.class.php';

/**
 * structures actions.
 *
 * @package    ecrins
 * @subpackage structures
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class structuresActions extends autoStructuresActions
{
	protected function processForm(sfWebRequest $request, sfForm $form, $editable=true)
	{
		$formValues = array();
		$requestParameters = $request->getParameterHolder()->getAll();
		$formValues =  sfMmwExtjsUtil::getSfParamsFromExtjs('structures', $requestParameters);

		$formValues = $this->prepareFormValues($formValues, $form);

		$files = $this->getSfFilesParamsFromExtjs($_FILES, $form->getName());
		//$form->bind($request->getParameter($form->getName()), $request->getFiles($form->getName()));
		
	    $fieldsToPost = json_decode($requestParameters['fields']);
		foreach($this->form->getWidgetSchema()->getFields() as $fieldname => $widget)
	    {
	    if (!in_array(sfMmwExtjsUtil::getSfExtjsNameFromField('structures', $fieldname), $fieldsToPost)) 
	    	{
	    	unset($form[$fieldname]);
	    	}
	    }

		$form->bind($formValues, $files);
		if ($form->isValid())
		{
			//$this->getUser()->setFlash('notice', $form->getObject()->isNew() ? 'The item was created successfully.' : 'The item was updated successfully.');

			$this->json['success'] = true;
			$this->json['data'] = false;
			
			$structures = $form->save();
			$this->prepareJsonValues($form);
			
			$data_array = $structures->toArray();
			
			$data_array = array_merge($data_array, $structures->getMatFinsAndFinitions());
			
			if(is_array($this->json['data']))
			{
				$this->json['data'] = array_merge($this->json['data'], sfMmwExtjsUtil::getExtjsParamsfromArray('structures', $data_array));
			}
			else
			{
				$this->json['data'] = sfMmwExtjsUtil::getExtjsParamsfromArray('structures', $data_array);
			}
			
		      if (!$editable)
		      {
				  $displayValues = $this->getFieldsValues($structures, false, true);
			      foreach ($displayValues as $key => $displayValue)
			      {
			      	$this->json['data'][$key] = $displayValue;
			      }
		      }
			
			$this->dispatcher->notify(new sfEvent($this, 'admin.save_object', array('object' => $structures)));

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
					$this->json['errors'][sfMmwExtjsUtil::getSfExtjsNameFromField('structures', $field)] =  $error->getMessage();
				}
			}
		}
		
		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}

	public function executeEdit(sfWebRequest $request)
	{
		$this->structures = $this->getRoute()->getObject();
		$this->form = $this->configuration->getForm($this->structures);

		$this->json['success'] = true;
		$this->prepareJsonValues($this->form);
		$this->json['data'] = array_merge($this->json['data'], $this->FormJsonEncode());
		$this->json['data'] = array_merge($this->json['data'], sfMmwExtjsUtil::getExtjsParamsfromArray('structures', $this->structures->getMatFinsAndFinitions()));
		
		if ($request->hasParameter('loadStores') && ($request->getParameter('loadStores') == true))
		{
			$this->json['list'] = $this->FormRelationsJsonEncode();
		}

		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}
}
