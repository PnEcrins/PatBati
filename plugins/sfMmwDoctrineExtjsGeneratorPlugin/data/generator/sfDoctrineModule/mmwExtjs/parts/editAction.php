  public function executeEdit(sfWebRequest $request)
  {
    $this-><?php echo $this->getSingularName() ?> = $this->getRoute()->getObject();
    $this->form = $this->configuration->getForm($this-><?php echo $this->getSingularName() ?>);
    
    $this->json['success'] = true;
    $this->prepareJsonValues($this->form);
    $this->json['data'] = array_merge($this->json['data'], $this->FormJsonEncode());
    if ($request->hasParameter('loadStores') && ($request->getParameter('loadStores') == true))
    {
    	$this->json['list'] = $this->FormRelationsJsonEncode();	
    }
    
    $this->setRequestParameter('json', $this->json);
    $this->forward($this->getModuleName(), 'jsonResponse');
  }