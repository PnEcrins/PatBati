<?php

/**
 * matFinsFinitions actions.
 *
 * @package    ecrins
 * @subpackage matFinsFinitions
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
class matFinsFinitionsActions extends sfBaseMmwExtjsActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
	$json = array();
	$json['success'] = true;
	$json['list']['matfins'] = $this->getBibMatFinsList();
	$json['list']['finitions'] = $this->getBibFinitionsList();
	
	$this->setRequestParameter('json', $json);
	$this->forward($this->getModuleName(), 'jsonResponse');
  }
  
  protected function getBibFinitionsList()
  {
	$bibFinitionsList = Doctrine::getTable('BibFinition')->findAll();

	$bibFinitionsValuesList = array();
	$i = 0;
	foreach ($bibFinitionsList as $bibFinition)
	{
		$bibFinitionsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_finition', 'codefinition')] = $bibFinition->getCodefinition();
		$bibFinitionsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_finition', 'finition')] = $bibFinition->getFinition();
		$bibFinitionsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_finition', 'codematfinslist')] = $bibFinition->getLinkedCodematfins();
		$i++;
	}

	$json = array();
	$json = $bibFinitionsValuesList;

	return $json;
  }
  
  protected function getBibMatFinsList()
  {
	$bibMateriauxFinsList = Doctrine::getTable('BibMateriauxFins')->findAll();

	$bibMateriauxFinsValuesList = array();
	$i = 0;
	foreach ($bibMateriauxFinsList as $bibMateriauFin)
	{
		$bibMateriauxFinsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_materiaux_fins', 'codematfins')] = $bibMateriauFin->getCodematfins();
		$bibMateriauxFinsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_materiaux_fins', 'matfins')] = $bibMateriauFin->getMatfins();
		$i++;
	}

	$json = array();
	$json = $bibMateriauxFinsValuesList;

	return $json;
  }
}
