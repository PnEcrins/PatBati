<?php

require_once dirname(__FILE__).'/../lib/bib_equipementGeneratorConfiguration.class.php';
require_once dirname(__FILE__).'/../lib/bib_equipementGeneratorHelper.class.php';

/**
 * bib_equipement actions.
 *
 * @package    ecrins
 * @subpackage bib_equipement
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12474 2008-10-31 10:41:27Z fabien $
 */
class bib_equipementActions extends autoBib_equipementActions
{
	public function executeIndex(sfWebRequest $request)
	{		
		$bibEquipementsList = Doctrine::getTable('BibEquipement')
		  ->createQuery('e')
          ->innerJoin('e.BibTypeEquipement bte')
		  ->orderBy('e.equipement')
		  ->execute();

		$bibEquipementsValuesList = array();
		$i = 0;
		foreach ($bibEquipementsList as $bibEquipement)
		{
			$bibEquipementsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_equipement', 'codeequipement')] = $bibEquipement->getCodeequipement();
			$bibEquipementsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_equipement', 'equipement')] = $bibEquipement->getEquipement();
			$bibEquipementsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_equipement', 'codetypeequip')] = $bibEquipement->getCodetypeequip();
			$bibEquipementsValuesList[$i][sfMmwExtjsUtil::getSfExtjsNameFromField('bib_equipement', 'typeequip')] = $bibEquipement->getBibTypeEquipement()->getTypeEquip();
			$i++;
		}

		$this->json['success'] = true;
		$this->json['count'] = count($bibEquipementsValuesList);
		$this->json['data'] = $bibEquipementsValuesList;
		
		$this->setRequestParameter('json', $this->json);
		$this->forward($this->getModuleName(), 'jsonResponse');
	}
}
