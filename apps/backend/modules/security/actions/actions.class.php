<?php

/**
 * security actions.
 *
 * @package    patrimoine_bati
 * @subpackage security
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 12479 2008-10-31 10:54:40Z fabien $
 */
class securityActions extends sfActions {
  public function executeLogin($request) {
    $this->form = new LoginForm();
    $this->setLayout('identification_layout');
    if ($request->isMethod('post')) {

      try {

        $this->form->bind($request->getParameter('login'));
        if ($this->form->isValid()) {
          $user = $this->getUser();
          $params = $request->getParameter('login');
          $id_role = TRolesTable::retrieve($params['login'])->getId_role();
          $id_droit = TRolesTable::getDroitsUser($id_role);

          if (array_key_exists($id_droit, TRolesTable::$credentials)) {
            $credentials = TRolesTable::$credentials[$id_droit];
            $user->addCredentials($credentials);
            $user->setAuthenticated(true);

            $this->redirect('@homepage');
          }
        }
      }
      catch(Exception $e) {
        echo $e->getMessage();
      }
    }
  }

  public function executeLogout() {
    $user = $this->getUser();
    $user->setAuthenticated(false);
    $user->clearCredentials();
    $user->getAttributeHolder()->remove('sfGuardSecurityUser');
    $this->redirect('@login');
  }

}
