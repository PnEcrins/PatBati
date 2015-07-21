<?php

/*
 * This file is part of the sfCombineFilter package.
 *
 * sfCombineFilterRouting.class.php upgrade to symfony 1.2 (c) 2009 by Oguen Bilge
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * This class sets up the routing to the packed files
 *
 * @package      sfCombineFilter
 * @author       Oguen Bilge <oguen.bilge@elui.ch>
 *
 */
class sfCombineFilterRouting
{
  /**
   * Listens to the routing.load_configuration event.
   *
   * @param sfEvent An sfEvent instance
   */
  static public function listenToRoutingLoadConfigurationEvent(sfEvent $event)
  {
    $r = $event->getSubject();

    // preprend our routes
//    $r->prependRoute('download_packed_files','/packed/:type/:cachefilename/packed.*', array( 'module' => 'sfCombineFilter', 'action' => 'download', 'target_action' => 'index'));
	$r->prependRoute('download_packed_files', new sfRoute('/packed/:type/:cachefilename/packed.*', array( 'module' => 'sfCombineFilter', 'action' => 'download', 'target_action' => 'index'))); 
  }
}
