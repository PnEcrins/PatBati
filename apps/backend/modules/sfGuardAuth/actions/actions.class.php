<?php

/**
 * taste actions.
 *
 * @package    cotedor
 * @subpackage taste
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
require_once(sfConfig::get('sf_plugins_dir').'/sfDoctrineGuardPlugin/modules/sfGuardAuth/lib/BasesfGuardAuthActions.class.php');

class sfGuardAuthActions extends BasesfGuardAuthActions
{
	/*
	 * we suppose here that there is a route like this where we force the id of the partner in the parameter "partner"
	 * login_greenenergy4seasons:
  	 *		url:   /greenenergy4seasons
  	 *		param: { module: sfGuardAuth, action: signin, partner: 4 }
	 */
	public function executeSignin($request)
  	{
	    $user = $this->getUser();
	    
	    if ($user->isAuthenticated())
	    {
	      return $this->redirect('@homepage');
	    }

	    $class = sfConfig::get('app_sf_guard_plugin_signin_form', 'sfGuardFormSignin');
	    $this->form = new $class();

	    if ($request->isMethod('post'))
	    {
	      $this->form->bind($request->getParameter('signin'));
	      if ($this->form->isValid())
	      {
	        $values   = $this->form->getValues();
	       	$remember = isset($values['remember']) ? $values['remember'] : false;

	       	$this->getUser()->signin($values['user'], $remember);

	        $signinUrl = sfConfig::get('app_sf_guard_plugin_success_signin_url', $user->getReferer($request->getReferer()));

			$role = TRolesTable::retrieve($values['username']);

			$credentials = UserCredentialTable::getCredentials(TRolesTable::getDroitsUser($role->getIdRole()));

			$this->getUser()->addCredentials($credentials);

	        return $this->redirect('' != $signinUrl ? $signinUrl : '@homepage');
	      }
	    }
	    else
	    {
	      if ($request->isXmlHttpRequest())
	      {
	        $this->getResponse()->setHeaderOnly(true);
	        $this->getResponse()->setStatusCode(401);

	        return sfView::NONE;
	      }

	      $user->setReferer($request->getReferer());

	      $module = sfConfig::get('sf_login_module');
	      if ($this->getModuleName() != $module)
	      {
	        return $this->redirect($module.'/'.sfConfig::get('sf_login_action'));
	      }

	      $this->getResponse()->setStatusCode(401);
	    }
	}

}
