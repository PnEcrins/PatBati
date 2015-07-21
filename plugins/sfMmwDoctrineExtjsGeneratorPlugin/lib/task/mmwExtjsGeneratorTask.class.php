<?php

class mmwExtjsGeneratorTask extends sfBaseTask
{
  protected function configure()
  {
    $this->addArguments(array(
      new sfCommandArgument('application', sfCommandArgument::REQUIRED, 'The application name')
    ));
    
    $this->addOptions(array(
      new sfCommandOption('module', null, sfCommandOption::PARAMETER_REQUIRED, 'generate a given module', false)
    ));

    $this->aliases = array('mmw-extjs-javascript');
    $this->namespace = 'generate';
    $this->name = 'mmw-extjs-javascript';
    $this->briefDescription = 'generates the javascript files for the mmw_extjs plugin';

    $this->detailedDescription = <<<EOF
The [doctrine:init-admin|INFO] task generates the javascript files for the mmw_extjs plugin:

  [./symfony mmw-extjs-jsgenerate-admin frontend |INFO]

EOF;
  }

  	protected function execute($arguments = array(), $options = array())
  	{

    	$properties = parse_ini_file(sfConfig::get('sf_config_dir').'/properties.ini', true);

	    $constants = array(
	      'PROJECT_NAME' => isset($properties['symfony']['name']) ? $properties['symfony']['name'] : 'symfony',
	      'APP_NAME'     => $arguments['application']
	    );

		$applicationConfiguration =
					ProjectConfiguration::getApplicationConfiguration(
						$arguments['application'], 
						'prod',
						true);
		sfContext::createInstance($applicationConfiguration); 
			
		if($options['module'])
		{
			$this->generateFile($options['module']);
		}
		else
		{
			// On charge le fichier 
			$yamlAppSettingFile = sfYaml::load(sfConfig::get('sf_app_config_dir').'/settings.yml');
			
			$modulesToGenerate = array();
			
			// we browse all the modules of the application	
			$modulesToGenerate = array_merge($modulesToGenerate, $this->browseAllModules(sfConfig::get('sf_app_module_dir')));
			
			foreach ($this->configuration->getAllPluginPaths() as $pluginName => $pluginPath)
			{
				$modulesToGenerate = array_merge($modulesToGenerate, $this->browseAllModules($pluginPath.'/modules', $yamlAppSettingFile));
			}
			
			foreach($modulesToGenerate as $module)
			{
				$this->generateFile($module);
			}
		}
  	}
  	
  	protected function generateFile($module)
  	{
  		// get javascript by calling the mmwExtjs action
    	$browser = new sfBrowser();
    	$browser->get('/'.$module.'/mmwExtjs/');
	 	$javascript = $browser->getResponse()->getContent();
    	 
    	$file = sfMmwExtjsUtil::getJavascriptPath($module, 'base', true);
    	file_put_contents($file, $javascript);
    	chmod($file, 0666);
    	
    	$this->showMessage($module);
  	}
  	
	public function browseAllModules($directory, $yamlAppSettingFile = null)
	{
		$modules = array();
		$generatorFiles = sfFinder::type('file')->mindepth(2)->maxdepth(3)->name('generator.yml')->in($directory);

		foreach($generatorFiles as $generatorFile) 
	    {
	    	// generate javascript if generator.yml file exist in the config directory	
			if(preg_match('/(?<module>\w+)\/config\/generator.yml/', $generatorFile, $matches)) 
			{
				$module = $matches['module'];
				$yamlGeneratorFile = sfYaml::load($generatorFile);
				// If the module generation theme is 'mmwExtjs', it's a module to generate 
				if ($yamlGeneratorFile['generator']['param']['theme'] == 'mmwExtjs'
					&& (($yamlAppSettingFile === null)
						// If we browse the modules of a plugin 
						|| (($yamlAppSettingFile !== null)
							// We need to verify if the browsed modules ar activated or not for the application
							&& (in_array($module, $yamlAppSettingFile['all']['.settings']['enabled_modules'])
								|| in_array($module, $yamlAppSettingFile['prod']['.settings']['enabled_modules'])
							)
						)
					)
				)
				{
					$modules[] = $module;
				}
			}
		}
		
		return $modules;
	}
	
  	protected function showMessage($module)
  	{
  		echo $module.": javascript generated\n";
  	}
  	
}
