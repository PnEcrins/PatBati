  protected function addSortQuery($query)
  {
  	$query = $this->addRemoteSort($query);
  	
    if (array(null, null) == ($sort = $this->getSort()))
    {
      return;
    }

    $query->addOrderBy($sort[0] . ' ' . $sort[1]);
  }

  protected function addRemoteSort($query)
  {
<?php if ((list($sortMethod, $sortOrder) = $this->getGridRemoteSorting()) != null): ?>
    $query = <?php echo $this->getTableClass(), '::', $sortMethod, '($query, \'', $sortOrder, '\')'; ?>;
    
<?php endif; ?>
    return $query;
  }
  
  protected function getSort()
  {
  	/*
    if (!is_null($sort = $this->getUser()->getAttribute('<?php echo $this->getModuleName() ?>.sort', null, 'admin_module')))
    {
      return $sort;
    }
    */

    if(!$this->sort)
    {
    	$this->setSort($this->configuration->getDefaultSort());
    }

//    return $this->getUser()->getAttribute('<?php echo $this->getModuleName() ?>.sort', null, 'admin_module');

	return $this->sort;
  }

  protected function setSort(array $sort)
  {
    if (!is_null($sort[0]) && is_null($sort[1]))
    {
      $sort[1] = 'asc';
    }

    $this->sort = $sort;

//    $this->getUser()->setAttribute('<?php echo $this->getModuleName() ?>.sort', $sort, 'admin_module');
  }
