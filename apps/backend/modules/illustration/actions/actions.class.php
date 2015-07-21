<?php

require_once dirname(__FILE__).'/../lib/illustrationGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/illustrationGeneratorHelper.class.php';

/**
 * illustration actions.
 *
 * @package    ecrins
 * @subpackage illustration
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class illustrationActions extends autoIllustrationActions
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
				$principalIllustration->setVignette($thumb->url);
				$principalIllustration->save();
			}
		}

		return $this->displayImage($thumb);
	}

	public function executeListThumb(sfWebRequest $request)
	{
		$this->forward404Unless($illustration = Doctrine::getTable('Illustration')->find($request->getParameter('indexillustration')));

		$thumb = convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), $illustration->getFichierSource(), 'list');

		return $this->displayImage($thumb);
	}

	public function executeShow(sfWebRequest $request)
	{
		$illustration = $this->getIllustration($request);

		if (empty($illustration))
		{
			$image = new Image('images/'.'no-picture.jpg');
		}
		else
		{
			$image = convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), $illustration->getFichierSource(), 'show');
		}

		return $this->displayImage($image);
	}

	public function executePrint(sfWebRequest $request)
	{
		$illustration = $this->getIllustration($request);

		if (empty($illustration))
		{
			$image = new Image('images/'.'no-picture.jpg');
		}
		else
		{
			$image = convertImageToThumb::resize(sfConfig::get('app_images_upload_dir'), $illustration->getFichierSource(), 'print');
		}

		return $this->displayImage($image);
	}

	public function executeDelete(sfWebRequest $request)
	{
		$request->checkCSRFProtection();

		$this->dispatcher->notify(new sfEvent($this, 'admin.delete_object', array('object' => $this->getRoute()->getObject())));

		unlink(sfConfig::get('app_images_upload_dir').$this->getRoute()->getObject()->getFichierSource());
		$this->getRoute()->getObject()->delete();

		//$this->getUser()->setFlash('notice', 'The item was deleted successfully.');

		$this->json['success'] = true;
		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');

		//$this->redirect('@illustration');
	}


	public function getIllustration($request)
	{
		$illustration = Doctrine::getTable('Illustration')->find($request->getParameter('indexillustration'));
		if (empty($illustration))
		{
			$identification = Doctrine::getTable('Identification')->find($request->getParameter('indexbatiment'));
			if ($identification instanceof Identification)
			{
				$illustration = $identification->getPrincipalIllustration();
			}
		}

		return $illustration;
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
