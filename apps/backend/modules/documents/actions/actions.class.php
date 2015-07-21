<?php

require_once dirname(__FILE__).'/../lib/documentsGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/documentsGeneratorHelper.class.php';

/**
 * document actions.
 *
 * @package    ecrins
 * @subpackage document
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class documentsActions extends autoDocumentsActions
{
	public function executeBandeauThumb(sfWebRequest $request)
	{
		$identification = Doctrine::getTable('Identification')->find($request->getParameter('indexbatiment'));

		if ($identification instanceof Identification)
		{
			$principalIllustration = $identification->getPrincipalIllustration();
		}

		$saveInDb = true;
		if (isset($principalIllustration) && $principalIllustration !== false)
		{
			$thumb = convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), $principalIllustration->getFichierSource(), 'bandeau');
		}
		else
		{
			$thumb = convertImageToThumb::resize('images/', 'no-picture.jpg', 'bandeau');
			$saveInDb = false;
		}

		if ($saveInDb)
		{
			$vignette = $principalIllustration->getVignette();

			if ($saveInDb && (empty($vignette) || ($vignette != $thumb->url)))
			{
				$principalDocument->setVignette($thumb->url);
				$principalDocument->save();
			}
		}

		return $this->displayImage($thumb);
	}

	public function executeListLink(sfWebRequest $request)
	{
		$this->forward404Unless($document = Doctrine::getTable('Documents')->find($request->getParameter('indexdocument')));

		echo $link = sfConfig::get('app_images_upload_dir').$document->getFichierSource();

		return sfView::NONE;
	}

	public function executeShow(sfWebRequest $request)
	{
		$response = $this->getResponse();
		$response->setContent(sfConfig::get('app_images_upload_dir').$request->getParameter('indexdocument'));

		$this->setLayout(false);
		return sfView::NONE;
	}

	public function executePrint(sfWebRequest $request)
	{
		$document = $this->getDocuments($request);

		if (empty($document))
		{
			$image = new Image('images/'.'no-picture.jpg');
		}
		else
		{
			$image = convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), $document->getFichierSource(), 'print');
		}

		return $this->displayImage($image);
	}

	public function executeDelete(sfWebRequest $request)
	{
		$request->checkCSRFProtection();

		$this->dispatcher->notify(new sfEvent($this, 'admin.delete_object', array('object' => $this->getRoute()->getObject())));

		unlink(sfConfig::get('app_document_upload_dir').$this->getRoute()->getObject()->getFichierSource());
		$this->getRoute()->getObject()->delete();

		//$this->getUser()->setFlash('notice', 'The item was deleted successfully.');

		$this->json['success'] = true;
		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');

		//$this->redirect('@Document');
	}


	public function getDocuments($request)
	{
		$document = Doctrine::getTable('Documents')->find($request->getParameter('indexdocument'));
		if (empty($document))
		{
			$identification = Doctrine::getTable('Documents')->find($request->getParameter('indexbatiment'));
			if ($identification instanceof Identification)
			{
				$document = $identification->getPrincipalDocument();
			}
		}

		return $document;
	}

	protected function displayImage($image)
	{
		$response = $this->getResponse();
		$response->setContentType($image->imagetype);
		$response->setHttpHeader('Content-Length', $image->filesize);
		$response->setContent($image->image);

		$this->setLayout(false);
		return sfView::NONE;
	}
}
