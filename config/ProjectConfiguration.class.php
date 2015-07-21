<?php

//require_once '/var/www/sources/symfony-1.2.10/lib/autoload/sfCoreAutoload.class.php';
require_once '/var/www/localhost/private/trunk/patrimoine_bati/lib/vendor/symfony/lib/autoload/sfCoreAutoload.class.php';
sfCoreAutoload::register();

class ProjectConfiguration extends sfProjectConfiguration
{
  public function setup()
  {
    // for compatibility / remove and enable only the plugins you want
    $this->enableAllPluginsExcept(array('sfPropelPlugin', 'sfCompat10Plugin'));
  }
}
