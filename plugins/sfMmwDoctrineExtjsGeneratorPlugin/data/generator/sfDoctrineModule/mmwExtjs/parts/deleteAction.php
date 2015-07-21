  public function executeDelete(sfWebRequest $request)
  {
    $request->checkCSRFProtection();

    $this->dispatcher->notify(new sfEvent($this, 'admin.delete_object', array('object' => $this->getRoute()->getObject())));

    $this->getRoute()->getObject()->delete();

    //$this->getUser()->setFlash('notice', 'The item was deleted successfully.');
    
    $this->json['success'] = true;
	$this->setRequestParameter('json', $this->json);
	$this->forward($this->getModuleName(), 'jsonResponse');

    //$this->redirect('@<?php echo $this->getUrlForAction('list') ?>');
  }
