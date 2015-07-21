<?php

require_once dirname(__FILE__).'/../lib/identificationGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/identificationGeneratorHelper.class.php';

/**
 * identification actions.
 *
 * @package    ecrins
 * @subpackage identification
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class identificationActions extends autoIdentificationActions
{

	public function executeSummary(sfWebRequest $request)
	{
		$this->identification = Doctrine::getTable('Identification')->find($request->getParameter('id'));
		$this->identification->getCountTravaux();
		$this->setLayout('identification_layout');
	}

	public function executeEdit(sfWebRequest $request)
	{
		$this->identification = $this->getRoute()->getObject();
		$this->form = $this->configuration->getForm($this->identification);

		$this->json['success'] = true;
		$this->prepareJsonValues($this->form);
		$this->json['data'] = array_merge($this->json['data'], $this->FormJsonEncode());

		// SURCHARGE
		$secteurCommune = $this->identification->getSecteurCommune();
		if (!empty($secteurCommune))
		{
			$this->json['data']['identification__secteur'] = $secteurCommune;
		}
		// FIN SURCHARGE

		if ($request->hasParameter('loadStores') && ($request->getParameter('loadStores') == true))
		{
			$this->json['list'] = $this->FormRelationsJsonEncode();
		}

		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
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
			if ((get_class($widget) != 'sfWidgetFormSchemaDecorator') && ($fieldsToPost != null) && (!in_array(sfMmwExtjsUtil::getSfExtjsNameFromField('identification', $fieldname), $fieldsToPost)))
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

			$identification = $form->save();
			$this->prepareJsonValues($form);
			if(is_array($this->json['data']))
			{
				$this->json['data'] = array_merge($this->json['data'], sfMmwExtjsUtil::getExtjsParamsfromArray('identification', $identification->toArray()));
			}
			else
			{
				$this->json['data'] = sfMmwExtjsUtil::getExtjsParamsfromArray('identification', $identification->toArray());
			}

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

		// SURCHARGE
		$secteurCommune = $identification->getSecteurCommune();
		if (!empty($secteurCommune))
		{
			$this->json['data']['identification__secteur'] = $secteurCommune;
		}
		
		
		$this->json['list'] = $this->FormRelationsJsonEncode();
		// FIN SURCHARGE

		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}

	public function executeDelete(sfWebRequest $request)
	{
		$request->checkCSRFProtection();

		$identification = $this->getRoute()->getObject();

		$identification->setBatSuppr(true);
		$identification->save();

		$this->json['success'] = true;
		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}

	protected function buildQuery(sfWebRequest $request)
	{
		$tableMethod = $this->configuration->getTableMethod();

		$this->filterForm = $this->configuration->getFilterForm(array());
		$this->filterForm->setTableMethod($tableMethod);

		$filters = $this->getFilters();

		$query = $this->filterForm->buildQuery($filters);
		$rootAlias = $query->getRootAlias();

		if ($request->hasParameter('filters__identification__name'))
		{
			$filters['name'] = $request->getParameter('filters__identification__name');
		}


		$new_query = IdentificationTable::addFilterQuery($filters, $query, $rootAlias);


		$this->addSortQuery($new_query);

		myUtils::logIt('la requête des bâtiments');
		myUtils::logIt($new_query->getSql());

		return $new_query;
	}

	protected function addRelProtectionsListColumnQuery($widget, $query)
	{
		$query->orderBy($query->getRootAlias() . '.protection DESC');

		return $query;
	}

	protected function addRelRisquenatsListColumnQuery($widget, $query)
	{
		$query->orderBy($query->getRootAlias() . '.risque DESC');

		return $query;
	}

	protected function addRelMasquesListColumnQuery($widget, $query)
	{
		$query->orderBy($query->getRootAlias() . '.masque DESC');

		return $query;
	}
}
