<?php

/**
 * exportBatiments actions.
 *
 * @package    ecrins
 * @subpackage exportBatiments
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
class exportBatimentsActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
	public function executeIndex(sfWebRequest $request)
	{
		$filters = array();
		$params = $request->getParameter('filters', array());
		
		// remove the filters__identification__bat_suppr
		foreach ($params as $key => $value)
		{
			$parts = explode('filters__identification__', $key);
			if($parts[1]) $filters[$parts[1]] = $value;  
//print_r($parts);
		} 
		
		
//print_r($filters);
//die('ici');
//    	$filters['codesecteur'] = 5;
//    	$filters['codeclasse'] = 13;
//		$filters['codematge_spv'] = 2;
//		$filters['codematge_ch'] = 3;
//		$filters['codematge_co'] = 3;
//		$filters['codeequipement'] = 10;
//		$filters['codeperspective'] = 2;
//		$filters['filters__identification__name'] = "maison";

    	$query = Doctrine_Query::create()
			->from('Identification i');

			$new_query = IdentificationTable::addFilterQuery($filters, $query, 'i');

			$this->devices = $new_query->orderBy('i.appelation ASC')
			->execute();

		$this->setDownloadableFile();
	}

	public function executeTravaux(sfWebRequest $request)
	{
		$filters = array();
		$params = $request->getParameter('filters', array());
		
		// remove the filters__identification__bat_suppr
		foreach ($params as $key => $value)
		{
			$parts = explode('filters__identification__', $key);
			if($parts[1]) $filters[$parts[1]] = $value;  
//print_r($parts);
		} 
//    	$filters['codesecteur'] = 5;
//    	$filters['codeclasse'] = 13;
//		$filters['codematge_spv'] = 2;
//		$filters['codematge_ch'] = 3;
//		$filters['codematge_co'] = 3;
//		$filters['codeequipement'] = 10;
//		$filters['codeperspective'] = 2;
//		$filters['filters__identification__name'] = "maison";

    	$query = Doctrine_Query::create()
			->from('Identification i')
			->leftJoin('i.Demandes d')
			->leftJoin('d.Travauxs t')
    		->addWhere('d.indexdemande IS NOT NULL');

			$new_query = IdentificationTable::addFilterQuery($filters, $query, 'i');

			$this->devices = $new_query->orderBy('i.appelation ASC')
			->execute();

		$this->setDownloadableFile();
	}

	protected function setDownloadableFile()
	{
	    $response = $this->getResponse();
	    $response->clearHttpHeaders();
	    $response->setContentType('text/comma-separated-values, text/csv, application/csv, application/excel, application/vnd.ms-excel, application/vnd.msexcel, text/anytext, charset=UTF-8');
	    $this->setLayout(false);
	}
}
