<?php

function addMmwExtJsJavaScriptAndCss()
{
	$context = sfContext::getInstance();
	$response = $context->getResponse();
	$moduleName = $context->getModuleName();
	
	$baseExtjsDir = sfConfig::get('sf_mmw_extjs_javascript_dir');
	$mainExtjsJavascript = sfConfig::get('sf_extjs_javascript_main');
	$mainMmwExtjsJavascript = sfConfig::get('sf_mmw_extjs_javascript_main');
	$mainExtjsCss = sfConfig::get('sf_extjs_css_main');
	$mainMmwExtjsCss = sfConfig::get('sf_mmw_extjs_css_main');
	
	// add extjs javascripts
	foreach($mainExtjsJavascript as $javascript)
	{
		$response->addJavascript($baseExtjsDir.$javascript, 'first');
	}
	
	// add i18n javascripts
	$defaultLangJavascript = $baseExtjsDir.'lang/base/mmwExtjs-base-default.js';
	if (file_exists(sfconfig::get("sf_web_dir").$defaultLangJavascript))
	{
		$response->addJavascript($defaultLangJavascript, 'first');
	}

	$localLangJavascript = $baseExtjsDir.'lang/base/mmwExtjs-base-'.sfContext::getInstance()->getUser()->getCulture().'.js';
	if (file_exists(sfconfig::get("sf_web_dir").$localLangJavascript))
	{
		$response->addJavascript($localLangJavascript, 'first');
	}
	
	$customLocalLangJavascript = $baseExtjsDir.'lang/custom/mmwExtjs-custom-'.sfContext::getInstance()->getUser()->getCulture().'.js';
	if (file_exists(sfconfig::get("sf_web_dir").$customLocalLangJavascript))
	{
		$response->addJavascript($customLocalLangJavascript, 'first');
	}
	
	// add mmwExtjs javascripts
	foreach($mainMmwExtjsJavascript as $javascript)
	{
		$response->addJavascript($baseExtjsDir.$javascript, 'first');
	}
	
	// add javascript added to the module.yml in the module/config
	$configuration = sfContext::getInstance()->getConfiguration();
	
	// On récupère les fichiers module.yml surchargés ou non du module
	$configFiles = $configuration->getConfigPaths('modules/'.$moduleName.'/config/module.yml');
	
	$moduleConfig['mmw_extjs_javascript_helper'] = array();
	$moduleConfig['mmw_extjs_css_helper'] = array();
	
	// Puis on les traite
	foreach ($configFiles as $configFile) {
		if (is_readable($configFile))
		{
			$temp = sfYaml::load($configFile);
			
			if (isset($temp['all']))
			{
				if (isset($temp['all']['mmw_extjs_javascript_helper']))
				{
					$moduleConfig['mmw_extjs_javascript_helper'] = array_values($temp['all']['mmw_extjs_javascript_helper']);
				}
				if (isset($temp['all']['mmw_extjs_css_helper']))
				{
					$moduleConfig['mmw_extjs_css_helper'] = array_values($temp['all']['mmw_extjs_css_helper']);
				}
			}
		}
	}
	
	// On ajoute les fichiers javascripts du module à la page
	if (isset($moduleConfig['mmw_extjs_javascript_helper']))
	{
		foreach ($moduleConfig['mmw_extjs_javascript_helper'] as $javascriptFile)
		{
			$response->addJavascript($baseExtjsDir.$javascriptFile, 'first');
		}
	}
	
	// add extjs css
	foreach($mainExtjsCss as $css)
	{
		$response->addStylesheet($baseExtjsDir.$css, 'first');
	}

	// add mmwExtjs css
	foreach($mainMmwExtjsCss as $css)
	{
		$response->addStylesheet($baseExtjsDir.$css, 'first');
	}

	// On ajoute les fichiers css du module à la page
	if (isset($moduleConfig['mmw_extjs_css_helper']))
	{
		foreach ($moduleConfig['mmw_extjs_css_helper'] as $cssFile)
		{
			$response->addStylesheet($baseExtjsDir.$cssFile, 'first');
		}
	}
}

?>
