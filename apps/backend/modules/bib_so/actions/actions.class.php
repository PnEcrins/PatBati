<?php

require_once dirname(__FILE__).'/../lib/bib_soGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/bib_soGeneratorHelper.class.php';

/**
 * bib_so actions.
 *
 * @package    ecrins
 * @subpackage bib_so
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class bib_soActions extends autoBib_soActions
{
	public function executeIndex(sfWebRequest $request)
	{
		$bibSosList = Doctrine::getTable('BibSo')->findAll();
	
		$bibSosValuesList = array();
		$i = 0;
		foreach ($bibSosList as $bibSo)
		{
			$bibSosValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_so', 'codeso')] = $bibSo->getCodeso();
			$bibSosValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_so', 'second_oeuvre')] = $bibSo->getSecondOeuvre();
			$bibSosValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_so', 'codetypeso')] = $bibSo->getCodetypeso();
			$i++;
		}
	
		$this->json['success'] = true;
		$this->json['count'] = count($bibSosValuesList);
		$this->json['data'] = $bibSosValuesList;
		
		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}
}
