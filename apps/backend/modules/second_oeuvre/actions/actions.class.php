<?php

require_once dirname(__FILE__).'/../lib/second_oeuvreGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/second_oeuvreGeneratorHelper.class.php';

/**
 * second_oeuvre actions.
 *
 * @package    ecrins
 * @subpackage second_oeuvre
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class second_oeuvreActions extends autoSecond_oeuvreActions
{
	protected function processForm(sfWebRequest $request, sfForm $form, $editable=true)
	{
		$formValues = array();
		$requestParameters = $request->getParameterHolder()->getAll();
		$formValues =  sfMmwExtjsUtil::getSfParamsFromExtjs('second_oeuvre', $requestParameters);
		$formValues = $this->prepareFormValues($formValues, $form);

		$files = $this->getSfFilesParamsFromExtjs($_FILES, $form->getName());
		//$form->bind($request->getParameter($form->getName()), $request->getFiles($form->getName()));

		foreach($this->form->getWidgetSchema()->getFields() as $fieldname => $widget)
		{
			if (!isset($formValues[$fieldname]) && !isset($files[$fieldname]))
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
			
			$second_oeuvre = $form->save();
			$this->prepareJsonValues($form);
			
			$data_array = $second_oeuvre->toArray();
			
			$data_array = array_merge($data_array, $second_oeuvre->getMatFinsAndFinitions());
			
			if(is_array($this->json['data']))
			{
				$this->json['data'] = array_merge($this->json['data'], sfMmwExtjsUtil::getExtjsParamsfromArray('second_oeuvre', $data_array));
			}
			else
			{
				$this->json['data'] = sfMmwExtjsUtil::getExtjsParamsfromArray('second_oeuvre', $data_array);
			}

		      if (!$editable)
		      {
				  $displayValues = $this->getFieldsValues($second_oeuvre, false, true);
			      foreach ($displayValues as $key => $displayValue)
			      {
			      	$this->json['data'][$key] = $displayValue;
			      }
		      }
			
			$this->dispatcher->notify(new sfEvent($this, 'admin.save_object', array('object' => $second_oeuvre)));	   
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
					$this->json['errors'][sfMmwExtjsUtil::getSfExtjsNameFromField('second_oeuvre', $field)] =  $error->getMessage();
				}
			}
		}

		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');

	}
	
	public function executeEdit(sfWebRequest $request)
	{
		$this->second_oeuvre = $this->getRoute()->getObject();
		$this->form = $this->configuration->getForm($this->second_oeuvre);

		$this->json['success'] = true;
		$this->prepareJsonValues($this->form);
		$this->json['data'] = array_merge($this->json['data'], $this->FormJsonEncode());
		$this->json['data']['second_oeuvre__codetypeso'] = $this->second_oeuvre->getCodetypeso();
		$this->json['data'] = array_merge($this->json['data'], sfMmwExtjsUtil::getExtjsParamsfromArray('second_oeuvre', $this->second_oeuvre->getMatFinsAndFinitions()));
		
		if ($request->hasParameter('loadStores') && ($request->getParameter('loadStores') == true))
		{
			$this->json['list'] = $this->FormRelationsJsonEncode();
		}

		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}
}
