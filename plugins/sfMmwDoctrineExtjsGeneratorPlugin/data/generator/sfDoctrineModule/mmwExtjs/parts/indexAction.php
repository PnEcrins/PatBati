  public function executeIndex(sfWebRequest $request)
  {
    // sorting
    if ($request->hasParameter('sort'))
    {
      //$this->setSort(array($request->getParameter('sort'), $request->getParameter('sort_type')));
      $sortField = sfMmwExtjsUtil::getSfFieldNameFromExtjs($request->getParameter('sort'));
      
      $this->setSort(array($sortField, strtolower($request->getParameter('dir'))));
    }

	//set filters
	$this->setFilters('<?php echo $this->getSingularName() ?>',$request->getParameterHolder()->getAll());
    
    $this->sort = $this->getSort();
    
    if ($request->hasParameter('dontUsePager'))
    {
	    $json = $this->simpleListJsonEncode($this->getSimpleListResults($request));
    }
    else
    {
    	$this->pager = $this->getPager($request);
	    
	    $editor = ($request->hasParameter('editorGrid') && $request->getParameter('editorGrid') == true) ? true : false;
	    $json = $this->pagerResultsListJsonEncode($this->pager, $editor);
    }
    
    $json = array_merge_recursive($json, $this->json); 
    $this->setRequestParameter('json', $json);
	$this->forward($this->getModuleName(), 'jsonResponse');
  }
  
  protected function getSimpleListResults(sfWebRequest $request)
  {  	
  	$query = $this->buildQuery($request);
  	
  	return $query->execute();
  }

  public function executeLoadFilters(sfWebRequest $request)
  {
  	$filterForm = $this->configuration->getFilterForm(array());
  
    $this->json['success'] = true;	
	$this->json['list'] = $this->getRelationChoices($filterForm, '<?php echo $this->getSingularName() ?>', 'filter');	
    
    $this->setRequestParameter('json', $this->json);
    $this->forward($this->getModuleName(), 'jsonResponse');
  }
  
  protected function getGridColumnsList()
  {
  	return array(<?php echo $this->getGridColumnsList(); ?>);
  }

  protected function getFormFieldsList()
  {
  	return array(<?php echo $this->getFormFieldsList(); ?>);
  }