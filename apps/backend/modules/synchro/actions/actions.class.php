<?php

/**
 * synchro actions.
 *
 * @package    ecrins
 * @subpackage synchro
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
class synchroActions extends sfActions
{
	/**
	 * Executes index action
	 *
	 * @param sfRequest $request A request object
	 */
	public function executeIndex(sfWebRequest $request)
	{
		$result = 'false';
		
		try {
		    sfGuardUserTable::importRoleTosfGuardUser();
		    $result = 'true';
		} catch (Exception $e) {
		    
		}
		
		$this->setLayout(false);
		
		return $this->renderText($result);
	}
}
