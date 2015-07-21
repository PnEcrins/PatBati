  public function haveToEnableListFilters()
  {
    return <?php echo $this->asPhp((isset($this->config['list']['enable_filters']) && $this->config['list']['enable_filters']) ? true : false); ?>;
<?php unset($this->config['list']['enable_filters']) ?>
  }

  public function getListParams()
  {
    return <?php echo $this->asPhp(isset($this->config['list']['params']) ? $this->config['list']['params'] : '%%'.implode('%% - %%', isset($this->config['list']['display']) ? $this->config['list']['display'] : $this->getAllFieldNames(false)).'%%') ?>;
<?php unset($this->config['list']['params']) ?>
  }

  public function getListLayout()
  {
    return '<?php echo isset($this->config['list']['layout']) ? $this->config['list']['layout'] : 'tabular' ?>';
<?php unset($this->config['list']['layout']) ?>
  }

  public function getListTitle()
  {
    return '<?php echo isset($this->config['list']['title']) ? $this->config['list']['title'] : '' ?>';
<?php unset($this->config['list']['title']) ?>
  }
  
  public function getListPagerCaption()
  {
    return '<?php echo (isset($this->config['list']['pager']) && isset($this->config['list']['pager']['caption'])) ? $this->config['list']['pager']['caption'] : '' ?>';
  }
<?php unset($this->config['list']['pager']['caption']) ?>

  public function getListPagerEmptyCaption()
  {
    return '<?php echo (isset($this->config['list']['pager']) && isset($this->config['list']['pager']['empty_caption'])) ? $this->config['list']['pager']['empty_caption'] : ''; ?>';
  }
<?php unset($this->config['list']['pager']['empty_caption']) ?>
<?php unset($this->config['list']['pager']) ?>

  public function getEditTitle()
  {
    return '<?php echo isset($this->config['edit']['title']) ? $this->config['edit']['title'] : 'Edit '.sfInflector::humanize($this->getModuleName()) ?>';
<?php unset($this->config['edit']['title']) ?>
  }

  public function getNewTitle()
  {
    return '<?php echo isset($this->config['new']['title']) ? $this->config['new']['title'] : 'New '.sfInflector::humanize($this->getModuleName()) ?>';
<?php unset($this->config['new']['title']) ?>
  }

  public function getFilterDisplay()
  {
<?php if (isset($this->config['filter']['display'])): ?>
    return <?php echo $this->asPhp($this->config['filter']['display']) ?>;
<?php elseif (isset($this->config['filter']['hide'])): ?>
    return <?php echo $this->asPhp(array_diff($this->getAllFieldNames(false), $this->config['filter']['hide'])) ?>;
<?php else: ?>
    return <?php echo $this->asPhp($this->getAllFieldNames(false)) ?>;
<?php endif; ?>
<?php unset($this->config['filter']['display'], $this->config['filter']['hide']) ?>
  }

  public function getFormDisplay()
  {
    return <?php echo $this->asPhp(isset($this->config['form']['display']) ? $this->config['form']['display'] : array()) ?>;
<?php unset($this->config['form']['display']) ?>
  }

  public function getEditDisplay()
  {
    return <?php echo $this->asPhp(isset($this->config['edit']['display']) ? $this->config['edit']['display'] : array()) ?>;
<?php unset($this->config['edit']['display']) ?>
  }

  public function getNewDisplay()
  {
    return <?php echo $this->asPhp(isset($this->config['new']['display']) ? $this->config['new']['display'] : array()) ?>;
<?php unset($this->config['new']['display']) ?>
  }

  public function getListDisplay()
  {
<?php if (isset($this->config['list']['display'])): ?>
    return <?php echo $this->asPhp($this->config['list']['display']) ?>;
<?php elseif (isset($this->config['list']['hide'])): ?>
    return <?php echo $this->asPhp(array_diff($this->getAllFieldNames(false), $this->config['list']['hide'])) ?>;
<?php else: ?>
    return <?php echo $this->asPhp($this->getAllFieldNames(false)) ?>;
<?php endif; ?>
<?php unset($this->config['list']['display'], $this->config['list']['hide']) ?>
  }

  public function getListFormFormTitle()
  {
    return '<?php echo (isset($this->config['listform']) && isset($this->config['listform']['form']) && isset($this->config['listform']['form']['title'])) ? $this->config['listform']['form']['title'] : '' ?>';
  }
<?php unset($this->config['listform']['form']['title']) ?>

  public function getListFormListTitle()
  {
    return <?php echo (isset($this->config['listform']) && isset($this->config['listform']['list']) && isset($this->config['listform']['list']['title'])) ? $this->config['listform']['list']['title'] : '' ?>;
  }
<?php unset($this->config['listform']['list']['title']) ?>

  public function getListFormFormWidth()
  {
    return '<?php echo (isset($this->config['listform']) && isset($this->config['listform']['form']) && isset($this->config['listform']['form']['width'])) ? $this->config['listform']['form']['width'] : '0.66' ?>';
  }
<?php unset($this->config['listform']['form']['width']) ?>

  public function getListFormListWidth()
  {
    return '<?php echo (isset($this->config['listform']) && isset($this->config['listform']['list']) && isset($this->config['listform']['list']['width'])) ? $this->config['listform']['list']['width'] : '0.33' ?>';
  }
<?php unset($this->config['listform']['list']['width']) ?>

  public function getListFormListHeight()
  {
    return '<?php echo (isset($this->config['listform']) && isset($this->config['listform']['list']) && isset($this->config['listform']['list']['height'])) ? $this->config['listform']['list']['height'] : '299' ?>';
  }
<?php unset($this->config['listform']['list']['height']) ?>
<?php unset($this->config['listform']) ?>

  public function getFieldsDefault()
  {
    return array(
<?php foreach ($this->getDefaultFieldsConfiguration() as $name => $params): ?>
      '<?php echo $name ?>' => <?php echo $this->asPhp($params) ?>,
<?php endforeach; ?>
    );
  }

<?php foreach (array('list', 'filter', 'form', 'edit', 'new') as $context): ?>
  public function getFields<?php echo ucfirst($context) ?>()
  {
    return array(
<?php foreach ($this->getFieldsConfiguration($context) as $name => $params): ?>
      '<?php echo $name ?>' => <?php echo $this->asPhp($params) ?>,
<?php endforeach; ?>
    );
  }

<?php endforeach; ?>

  public function getStoreSupFields()
  {	
<?php if (isset($this->config['store']) && isset($this->config['store']['sup_fields']) && !empty($this->config['store']['sup_fields'])): ?>
	<?php $sup_fields = $this->config['store']['sup_fields']; ?>
	<?php if (!is_array($this->config['store']['sup_fields'])): ?>
	<?php $sup_fields = array($sup_fields); ?>
	<?php endif; ?>
	return array(
	<?php foreach ($sup_fields as $fieldName): ?>
		'<?php echo $fieldName; ?>',
	<?php endforeach; ?>
	);
<?php else: ?>
	return array();
<?php endif; ?>
  }
<?php unset($this->config['store']['sup_fields']) ?>
<?php unset($this->config['store']) ?>