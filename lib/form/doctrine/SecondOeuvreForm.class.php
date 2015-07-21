<?php

/**
 * SecondOeuvre form.
 *
 * @package    form
 * @subpackage SecondOeuvre
 * @version    SVN: $Id: sfDoctrineFormTemplate.php 6174 2007-11-27 06:22:40Z fabien $
 */
class SecondOeuvreForm extends BaseSecondOeuvreForm
{
	public function configure()
	{
		$this->setWidget('codetypeso', new sfWidgetFormDoctrineChoice(array('model' => 'BibTypeSo')));
		$this->setWidget('codematfins', new sfWidgetFormDoctrineChoice(array('model' => 'BibMateriauxFins', 'multiple' => true)));
		$this->setWidget('codefinition', new sfWidgetFormDoctrineChoice(array('model' => 'BibFinition', 'multiple' => true)));
		
		$this->setValidator('codetypeso', new sfValidatorDoctrineChoice(array('model' => 'BibTypeSo', 'required' => true)));
		$this->setValidator('codematfins', new sfValidatorPass());
		$this->setValidator('codefinition', new sfValidatorPass());
		
		$this->validatorSchema->setPostValidator(new sfUniqueRelationValidator(array(
				'column1'	=> 'codematfins',
				'column2'	=> 'codefinition')));
				
		$this->setWidget('info_so', new sfWidgetFormTextarea());
	}

	public function saveRelSoMatfinssList($con = null)
	{
		if (!$this->isValid())
		{
			throw $this->getErrorSchema();
		}

//		if (!isset($this->widgetSchema['rel_so_matfins_list']))
//		{
//			// somebody has unset this widget
//			return;
//		}

		if (is_null($con))
		{
			$con = $this->getConnection();
		}

		$query = Doctrine_Query::create()
			->delete('RelSoMatfins rsm')
			->where('rsm.indexso = ?', $this->object->getPrimaryKey())
			->execute();

		$matfinsValues = $this->getValue('codematfins');
		$finitionValues = $this->getValue('codefinition');
		if (is_array($matfinsValues) && is_array($finitionValues))
		{
			foreach ($matfinsValues as $key => $matfinsValue)
			{
				$obj = new RelSoMatfins();
				$obj->setIndexso($this->object->getPrimaryKey());
				$obj->setCodematfins($matfinsValue);
				$obj->setCodefinition($finitionValues[$key]);
				$obj->save();
			}
		}
	}
}