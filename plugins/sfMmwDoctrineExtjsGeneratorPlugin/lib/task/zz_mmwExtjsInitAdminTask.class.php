<?php

class mmwExtjsInitAdminTask extends sfBaseTask
{
  protected function configure()
  {
    $this->addArguments(array(
      new sfCommandArgument('application', sfCommandArgument::REQUIRED, 'The application name'),
      new sfCommandArgument('module', sfCommandArgument::REQUIRED, 'The module name'),
      new sfCommandArgument('model', sfCommandArgument::REQUIRED, 'The model class name'),
    ));

    $this->addOptions(array(
      new sfCommandOption('theme', null, sfCommandOption::PARAMETER_REQUIRED, 'The theme name', 'extjs'),
    ));

    $this->aliases = array('mmw-extjs-init-admin');
    $this->namespace = 'extjs';
    $this->name = 'mmw-extjs-init-admin';
    $this->briefDescription = 'Initializes an MMW ExtJs admin module';

    $this->detailedDescription = <<<EOF
The [doctrine:init-admin|INFO] task generates an ExtJs admin module:

  [./symfony extjs:init-admin frontend article Article|INFO]

The task creates a [%module%|COMMENT] module in the [%application%|COMMENT] application
for the model class [%model%|COMMENT].

The created module is an empty one that inherit its actions and templates from
a runtime generated module in [%sf_app_cache_dir%/modules/auto%module%|COMMENT].

The generator can use a customized theme by using the [--theme|COMMENT] option:

  [./symfony extjs:init-admin --theme="custom" frontend article Article|INFO]
EOF;
  }

  protected function execute($arguments = array(), $options = array())
  {
    $databaseManager = new sfDatabaseManager($this->configuration);

    $properties = parse_ini_file(sfConfig::get('sf_config_dir').'/properties.ini', true);

    $constants = array(
      'PROJECT_NAME' => isset($properties['symfony']['name']) ? $properties['symfony']['name'] : 'symfony',
      'APP_NAME'     => $arguments['application'],
      'MODULE_NAME'  => $arguments['module'],
      'MODEL_CLASS'  => $arguments['model'],
      'AUTHOR_NAME'  => isset($properties['symfony']['author']) ? $properties['symfony']['author'] : 'Your name here',
      'THEME'        => $options['theme'],
      'OBJECT_NAME'  => sfInflector::humanize(sfInflector::underscore($arguments['model'])),
    );

    $moduleDir = sfConfig::get('sf_app_module_dir').'/'.$arguments['module'];

    // create module structure
    $finder = sfFinder::type('any')->discard('.sf');
    $dirs = $this->configuration->getGeneratorSkeletonDirs('DbFinderAdmin', $options['theme']);
    

    foreach ($dirs as $dir)
    {
      if (is_dir($dir))
      {
        $this->getFilesystem()->mirror($dir, $moduleDir, $finder);
        break;
      }
    }

    // customize php and yml files
    $finder = sfFinder::type('file')->name('*.php', '*.yml');
    $this->getFilesystem()->replaceTokens($finder->in($moduleDir), '##', '##', $constants);

    //set our generated directories writable so we can put generated files in them
    //$finder = sfFinder::type('directory')->ignore_version_control()->discard('.sf');
    //$this->getFilesystem()->chmod($finder,$moduleDir,0777);
  }
}
