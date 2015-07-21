<?php
/**
 * Identification form.
 *
 * @package    form
 * @subpackage Identification
 * @version    SVN: $Id: sfDoctrineFormTemplate.php 6174 2007-11-27 06:22:40Z fabien $
 */
class IdentificationForm extends BaseIdentificationForm
{
	public function configure()
	{
		parent::configure();
		//  		$this->widgetSchema['notepatri']->setOption('expanded', true);
		$this->widgetSchema['rel_masques_list']->setOption('renderer_class', 'sfWidgetFormSelectDoubleList');
		
		$this->setWidget('patrimonialite', new sfWidgetFormTextarea(array(),array('width' => 400, 'height' => 80)));
		$this->setWidget('situationgeo', new sfWidgetFormTextarea());
		$this->setWidget('info_risquenat', new sfWidgetFormTextarea());
		$this->setWidget('info_masque', new sfWidgetFormTextarea());
	}
	
	public function updateObject($values = null)
	{
		if (is_null($values))
		{
			$values = $this->values;
		}
		
		$values = $this->processValues($values);
		
		// HACK: le champ remarque ne se sauve pas si on ne force pas la valeur à null
		if (isset($values['remarques']) && empty($values['remarques']))
		{
			$values['remarques'] = null;
		}		
		
		$this->object->fromArray($values);
		
		// embedded forms
		$this->updateObjectEmbeddedForms($values);
		
		return $this->object;
	}
}
