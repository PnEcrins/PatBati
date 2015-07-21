<?php

/**
 * test actions.
 *
 * @package    snowflake
 * @subpackage test
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 23810 2009-11-12 11:07:44Z Kris.Wallsmith $
 */
class testActions extends sfActions
{
 /**
  * Executes index action
  *
  * @param sfRequest $request A request object
  */
  public function executeIndex(sfWebRequest $request)
  {
  	$new = new UserCredential();
  	$new->setUserId(4);
  	$new->setCredentials('coucou');
  	$new->save();
  }

  public function executeViewCredential()
  {
  	print_r($this->getUser()->listCredentials());
  	die('ici');
  }

  public function executeTest(sfWebRequest $request)
  {
    print_r($this->getUser()->getGuardUser()->getId() );

    $role =Doctrine_Query::create()
            ->from('TRoles t')
            ->where('t.user_id = ?', array($this->getUser()->getGuardUser()->getId()))
            ->fetchOne();

            $var = TRolesTable::getDroitsUser($role->getIdRole());
            print_r($var);
    die('ici');
  }

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
