<?php 
/**
 * ElementsPaysagers form.
 *
 * @package    form
 * @subpackage ElementsPaysagers
 * @version    SVN: $Id: sfDoctrineFormTemplate.php 6174 2007-11-27 06:22:40Z fabien $
 */
class ElementsPaysagersForm extends BaseElementsPaysagersForm
{
	public function configure()
	{
		$this->setWidget('info_ep', new sfWidgetFormTextarea());
	}
}
