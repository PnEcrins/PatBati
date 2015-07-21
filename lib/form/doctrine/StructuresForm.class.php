<?php

/**
 * Structures form.
 *
 * @package    form
 * @subpackage Structures
 * @version    SVN: $Id: sfDoctrineFormTemplate.php 6174 2007-11-27 06:22:40Z fabien $
 */
class StructuresForm extends BaseStructuresForm
{
	public function configure()
	{
		$this->setWidget('codematfins', new sfWidgetFormDoctrineChoice(array('model' => 'BibMateriauxFins', 'multiple' => true)));
		$this->setWidget('codefinition', new sfWidgetFormDoctrineChoice(array('model' => 'BibFinition', 'multiple' => true)));

		$this->setValidator('codematfins', new sfValidatorPass());
		$this->setValidator('codefinition', new sfValidatorPass());
		
		$this->validatorSchema->setPostValidator(new sfUniqueRelationValidator(array(
				'column1'	=> 'codematfins',
				'column2'	=> 'codefinition')));
		
		$this->setWidget('info_structure', new sfWidgetFormTextarea());
	}

	public function saveRelStructuresMatfinssList($con = null)
	{
		if (!$this->isValid())
		{
			throw $this->getErrorSchema();
		}

//	    if (!isset($this->widgetSchema['rel_structures_matfinss_list']))
//	    {
//	      // somebody has unset this widget
//	      return;
//	    }

		if (is_null($con))
		{
			$con = $this->getConnection();
		}

		$query = Doctrine_Query::create()
			->delete('RelStructuresMatfins rsm')
			->where('rsm.indexstructure = ?', $this->object->getPrimaryKey())
			->execute();

		$matfinsValues = $this->getValue('codematfins');
		$finitionValues = $this->getValue('codefinition');
		if (is_array($matfinsValues) && is_array($finitionValues))
		{
			foreach ($matfinsValues as $key => $matfinsValue)
			{
				$obj = new RelStructuresMatfins();
				$obj->setIndexstructure($this->object->getPrimaryKey());
				$obj->setCodematfins($matfinsValue);
				$obj->setCodefinition($finitionValues[$key]);
				$obj->save();
			}
		}
	}
}