<?php

require_once dirname(__FILE__).'/../lib/equipementsGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/equipementsGeneratorHelper.class.php';

/**
 * equipements actions.
 *
 * @package    ecrins
 * @subpackage equipements
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class equipementsActions extends autoEquipementsActions
{
	public function executeLoadStores()
    {
		$this->form = $this->configuration->getForm();
		$this->json['success'] = true;
		$this->json['list'] = $this->FormRelationsJsonEncode();
		
		$this->json['list']['equipements__codeequipement'] = $this->getBibEquipementsList();
		
		$this->setRequestParameter('json', $this->json);
		
		$this->forward($this->getModuleName(), 'jsonResponse');
    }
	
	protected function getBibEquipementsList()
	{
		$bibEquipementsList = Doctrine::getTable('BibEquipement')->findAll();

		$bibEquipementsValuesList = array();
		$i = 0;
		foreach ($bibEquipementsList as $bibEquipement)
		{
			$bibEquipementsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_equipement', 'codeequipement')] = $bibEquipement->getCodeequipement();
			$bibEquipementsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_equipement', 'equipement')] = $bibEquipement->getEquipement();
			$bibEquipementsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_equipement', 'codetypeequip')] = $bibEquipement->getCodetypeequip();
			$i++;
		}
		
		$json = array();
		$json = $bibEquipementsValuesList;
		
		return $json;
	}
}
