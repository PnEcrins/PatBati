<?php

/**
 * sfCombineFilterPlugin configuration.
 *
 * @package     sfCombineFilterPlugin
 * @subpackage  config
 * @author      Benjamin Runnels <benjamin.r.runnels@citi.com>
 * @version     SVN: $Id: PluginConfiguration.class.php 12628 2008-11-04 14:43:36Z Kris.Wallsmith $
 */
class sfCombineFilterPluginConfiguration extends sfPluginConfiguration
{
  /**
   * @see sfPluginConfiguration
   */
  public function initialize()
  {
    if(sfConfig::get('app_sf_combine_filter_plugin_enabled'))
    {
      $this->dispatcher->connect('routing.load_configuration', array('sfCombineFilterRouting', 'listenToRoutingLoadConfigurationEvent'));
    }
  }
}
