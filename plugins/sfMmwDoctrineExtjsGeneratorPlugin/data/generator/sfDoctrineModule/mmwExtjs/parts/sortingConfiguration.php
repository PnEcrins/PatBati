  public function getDefaultSort()
  {
<?php if ($sort = (isset($this->config['list']['sort']) ? $this->config['list']['sort'] : false)): ?>
<?php if (!is_array($sort)) $sort = array($sort, 'asc'); ?>
    return array('<?php echo $sort[0] ?>', '<?php echo isset($sort[1]) ? $sort[1] : 'asc' ?>');
<?php else: ?>
    return array(null, null);
<?php endif; ?>
<?php unset($this->config['list']['sort']) ?>
  }
  
	public function getRemoteSort()
	{
<?php if ($remoteSort = (isset($this->config['list']['remotesort']) ? $this->config['list']['remotesort'] : false)): ?>
<?php if (!is_array($remoteSort)) $remoteSort = array($remoteSort, 'asc'); ?>
    return array('<?php echo $remoteSort[0] ?>', '<?php echo isset($remoteSort[1]) ? $remoteSort[1] : 'asc' ?>');
<?php else: ?>
    return array(null, null);
<?php endif; ?>
<?php unset($this->config['list']['remotesort']) ?>	
	}