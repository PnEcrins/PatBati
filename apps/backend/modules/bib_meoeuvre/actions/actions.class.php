<?php

require_once dirname(__FILE__).'/../lib/bib_meoeuvreGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/bib_meoeuvreGeneratorHelper.class.php';

/**
 * bib_meoeuvre actions.
 *
 * @package    ecrins
 * @subpackage bib_meoeuvre
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class bib_meoeuvreActions extends autoBib_meoeuvreActions
{
	public function executeIndex(sfWebRequest $request)
	{
		$bibMeoeuvresList = Doctrine::getTable('BibMeoeuvre')->findAll();
	
		$bibMeoeuvresValuesList = array();
		$i = 0;
		foreach ($bibMeoeuvresList as $bibMeoeuvre)
		{
			$bibMeoeuvresValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_meoeuvre', 'codemeo')] = $bibMeoeuvre->getCodemeo();
			$bibMeoeuvresValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_meoeuvre', 'meoeuvre')] = $bibMeoeuvre->getMeoeuvre();
			$bibMeoeuvresValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_meoeuvre', 'codematgelist')] = $bibMeoeuvre->getLinkedCodematges();
			$i++;
		}
	
		$this->json['success'] = true;
		$this->json['count'] = count($bibMeoeuvresValuesList);
		$this->json['data'] = $bibMeoeuvresValuesList;
		
		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}	
}
