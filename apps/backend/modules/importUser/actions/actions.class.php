<?php

/**
 * test actions.
 *
 * @package    snowflake
 * @subpackage test
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class importUserActions extends sfActions
{
  public function executeImportUser()
  {
		$t_roles =Doctrine_Query::create()
            ->from('TRoles')
            ->execute();

        foreach($t_roles as $role)
        {
        	if($role->getIdentifiant())
        	{
            	$user = new sfGuardUser();
			    $user->setUsername($role->getIdentifiant());
			    $user->setPassword($role->getPass());
			    $user->setIsActive(true);
			    $user->setAlgorithm('md5');
			    $user->save();
			    $role->setUserId($user->getId());
			    $role->save();
        	}
        }
  }
}
