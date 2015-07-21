<?php
/**
 * Equipements form.
 *
 * @package    form
 * @subpackage Equipements
 * @version    SVN: $Id: sfDoctrineFormTemplate.php 6174 2007-11-27 06:22:40Z fabien $
 */
class EquipementsForm extends BaseEquipementsForm
{
	public function configure()
	{
		$this->setWidget('codetypeequip', new sfWidgetFormDoctrineChoice(array('model' => 'BibTypeEquipement')));
		$this->setWidget('info_equip', new sfWidgetFormTextarea());
		$this->setValidator('codetypeequip', new sfValidatorDoctrineChoice(array('model' => 'BibTypeEquipement', 'required' => true)));
	}
}
