  protected function getPager(sfWebRequest $request)
  {
    $pager = $this->configuration->getPager('<?php echo $this->getModelClass() ?>');
    $pager->setQuery($this->buildQuery($request));
    $pager->setPage($this->getPage());
    $pager->init();

    return $pager;
  }

/*
  protected function setPage($page)
  {
    $this->getUser()->setAttribute('<?php echo $this->getModuleName() ?>.page', $page, 'admin_module');
  }

  protected function getPage()
  {
    return $this->getUser()->getAttribute('<?php echo $this->getModuleName() ?>.page', 1, 'admin_module');
  }
*/
  
  protected function buildQuery(sfWebRequest $request)
  {
    $tableMethod = $this->configuration->getTableMethod();
<?php if ($this->configuration->hasFilterForm()): ?>
	/*
    if (is_null($this->filters))
    {
      $this->filters = $this->configuration->getFilterForm($this->getFilters());
    }
    */

	$this->filterForm = $this->configuration->getFilterForm(array());    
    $this->filterForm->setTableMethod($tableMethod);

    $query = $this->filterForm->buildQuery($this->getFilters());
<?php else: ?>
    $query = Doctrine::getTable('<?php echo $this->getModelClass() ?>')
      ->createQuery('a');

    if ($tableMethod)
    {
      $query = Doctrine::getTable('<?php echo $this->getModelClass() ?>')->$tableMethod($query);
    }
<?php endif; ?>

	$this->processMmwExtJSFilters($request->getParameterHolder()->getAll(), $query);

    $this->addSortQuery($query);

	$displayField = $this->configuration->getDisplayField();
	
	if (!empty($displayField) && $request->hasParameter('query'))
	{
		$query->addWhere($query->getRootAlias() . '.' . $displayField . ' LIKE ?', $request->getParameter('query') . '%');
	}

	/*
    $event = $this->dispatcher->filter(new sfEvent($this, 'admin.build_query'), $query);
    $query = $event->getReturnValue();
	*/

    return $query;
  }
