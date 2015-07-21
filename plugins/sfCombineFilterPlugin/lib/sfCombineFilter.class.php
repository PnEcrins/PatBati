<?php
/*
 * This file is part of the sfCombineFilter package.
 *
 * sfCombineFilter.class.php (c) 2007 Scott Meves.
 * sfCombineFilter.class.php modifications (c) 2008 by Benjamin Runnels *
 * sfCombineFilter.class.php upgrade to symfony 1.2 (c) 2008 by Oguen Bilge
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * This filter combines requested js and css files into a single request each.
 *
 * @package      sfCombineFilter
 * @subpackage   filter
 * @author       Scott Meves <scott@stereointeractive.com>
 * @author       Oguen Bilge <oguen.bilge@elui.ch>
 *
 */
class sfCombineFilter extends sfFilter
{

  const PACK_CACHE_FOLDER = "packed";

  private $request, $response,$sf_relative_url_root,$type,$files,$lastmodified;


  public function execute ($filterChain)
  {

    $filterChain->execute();
    if(sfConfig::get('app_sf_combine_filter_plugin_enabled')) {
      sfContext::getInstance()->getConfiguration()->loadHelpers('Asset');
      $this->response = $this->getContext()->getResponse();
      $this->request = $this->getContext()->getRequest();
      $this->sf_relative_url_root = $this->request->getRelativeUrlRoot(). $this->request->getScriptName();

      if($this->request->isXmlHttpRequest() != true && strpos($this->response->getContentType(),'text/html') === 0)
      {

        if (sfConfig::get('app_sf_combine_filter_plugin_javascripts',true))
        {
          $this->type = 'javascript';
          $this->files = array();
          $this->lastmodified = 0;
          $this->getCombinedJavascripts();
        }

        if (sfConfig::get('app_sf_combine_filter_plugin_stylesheets',true))
        {
          $this->type = 'css';
          $this->files = array();
          $this->lastmodified = 0;
          $this->getCombinedStylesheets();
        }
      }
    }
  }

  protected function getCombinedJavascripts()
  {
    $root_js_only = sfConfig::get('app_sf_combine_filter_plugin_root_js_only', false);

    $already_seen = array();
    $combined_sources = array();

// SAMAX
	$totalFilesCount = 0;
	foreach (array('first', '', 'last') as $position)
    {
      foreach ($this->response->getJavascripts($position) as $files => $options)
      {
        if (!is_array($files))
        {
          $files = array($files);
        }
		$totalFilesCount+= count($files);
	  }
	}

	$filesCount = 0;
	$lastJsToCombineOrder = 0;
	$javascripts_to_include_in_end = array();
// FIN SAMAX
    foreach (array('first', '', 'last') as $position)
    {
      foreach ($this->response->getJavascripts($position) as $files => $options)
      {
        if (!is_array($files))
        {
          $files = array($files);
        }

        foreach ($files as $file)
        {
// SAMAX
          $filesCount++;
// FIN SAMAX
          if (isset($already_seen[$file])) continue;

          $already_seen[$file] = 1;

          if (is_array($options) && $this->isAbsolutePath($options))
          {
            continue;
          }

          $path = str_replace($this->request->getRelativeUrlRoot(), '', _compute_public_path($file, 'js', 'js') );

          // do not include, when in exclude array
          foreach (sfConfig::get('app_sf_combine_filter_plugin_js_exclude_files', array()) as $exclude)
          {
// SAMAX
			  if ((strpos($path, $exclude)!==false) && (!$root_js_only && !strpos($path, '://')&& strpos($path, '.js')) || ($root_js_only && strpos($path, $this->sf_relative_url_root.'/js/') === 0))
			  {
	            $element = ($root_js_only ? preg_replace("/^".str_replace('/', '\/', $this->sf_relative_url_root.'/js/')."/i", '', $path) : $path);
                $javascripts_to_include_in_end[] = array(
													'order' => $filesCount,
													'file' => $file,
													'position' => $position,
													'element' => $element
													);
				continue 2;
	          }
// FIN SAMAX
          }

          if ((!$root_js_only && !strpos($path, '://')&& strpos($path, '.js')) || ($root_js_only && strpos($path, $this->sf_relative_url_root.'/js/') === 0)) {
            $element = ($root_js_only ? preg_replace("/^".str_replace('/', '\/', $this->sf_relative_url_root.'/js/')."/i", '', $path) : $path);
            if($this->checkFile($element))
            {
// SAMAX
              $lastJsToCombineOrder = $filesCount;
// FIN SAMAX
              $combined_sources[] = $element;
              $this->response->removeJavascript($file, ($position ? $position : ''));
            }
          }
        }
      }
    }

    if (count($combined_sources)) {
      $cacheFileName = $this->lastmodified . '-' . md5(implode(',', $combined_sources));

      if($this->cacheFile($cacheFileName))
      {
        $combined_sources_str = $this->request->getRelativeUrlRoot()."/packed/js/$cacheFileName/packed.js";
        //TODO: keep track if there is a dynamic file in the middle of static files and create multiple packed files
        // if required to keep the proper order
        $this->response->addJavascript($combined_sources_str); //, 'first'
// SAMAX
        foreach($javascripts_to_include_in_end as $js_to_include)
		{
			if ($js_to_include['order'] >= $lastJsToCombineOrder);
			{
				$this->response->removeJavascript($js_to_include['file'], ($js_to_include['position'] ? $js_to_include['position'] : ''));
		        $this->response->addJavascript($js_to_include['element']);
			}
		}
// FIN SAMAX
      }
    }
  }

  protected function cacheFile($cacheFileName)
  {
    //get an instance of the file cache object. We grab the web root then get the name of the cache folder
    //we don't want to use sf_cache_dir because that is application and environment specific
    //we don't want to a path relative to sf_web_dir because the sf_root_dir can be changed, better to start from there
// SAMAX
//    $cache = new sfFileCache(array('cache_dir' => sfConfig::get('sf_cache_dir'). "/" . self::PACK_CACHE_FOLDER));
	if ($this->type=='css')
	{
		$filePath = sfConfig::get('sf_root_dir') . '/web/packed/css/' . $cacheFileName . '/packed.css';
	}
	else
	{
		$filePath = sfConfig::get('sf_root_dir') . '/web/packed/js/' . $cacheFileName . '/packed.js';
	}
// FIN SAMAX

    //cached files are in the 'packed_files' name space
    //Next we see if we can pull the file from the cache.
	
// SAMAX
//    if($cache->has($cacheFileName))
	if (file_exists($filePath))
// FIN SAMAX
    {
      //Ok! We have a cached copy of the file!
      return true;
    }
    else
    {
      // Get contents of the files
      $contents = '';
      foreach ($this->files as $path)
      {
        if($this->type=='css')
        {
          $con = "\n\n".'/* include css file: '.$path." */\n\n";
          $cssPath = str_replace(sfConfig::get('app_sf_combine_filter_plugin_css_filtered_paths', array()),'',$path);
          $con .= $this->fixCssPaths(file_get_contents($path),$cssPath);
        }
        else
        {
          $con = "\n\n".'/* include js file: '.$path." */\n\n";
          $con .= file_get_contents($path);
        }

        $contents .= "\n" . $con;
      }

      if ($this->type=='javascript'&& sfConfig::get('app_sf_combine_filter_plugin_minimize_js', false))
      {
        $contents = JSMin::minify($contents);
      }
      elseif($this->type=='css'&& sfConfig::get('app_sf_combine_filter_plugin_minimize_css', true))
      {
        $contents = cssmin::minify($contents, array('preserve-urls' => false));
      }

	  // SAMAX
//      //Write the file data to the cache
//      $cache->set($cacheFileName, $contents);
	  
	  $combinedFilePath = sfConfig::get('sf_root_dir') . '/web/packed/';
	  
	  if (!is_dir($combinedFilePath))
	  {
	  	mkdir($combinedFilePath);
	  }
  	  if($this->type=='css')
	  {
		$combinedFilePath.= 'css/';
		if (!is_dir($combinedFilePath))
		{
		  mkdir($combinedFilePath);
		}
		$combinedFilePath.= $cacheFileName . '/';
	  }
	  else
	  {
		$combinedFilePath.= 'js/';
		if (!is_dir($combinedFilePath))
		{
		  mkdir($combinedFilePath);
		}
		$combinedFilePath.= $cacheFileName . '/';
	  }
	  
	  if (!is_dir($combinedFilePath))
	  {
	    mkdir($combinedFilePath);
	  }
	  
	  if($this->type=='css')
	  {
	  	$combinedFilePath.= '/packed.css';
	  }
	  else
	  {
	  	$combinedFilePath.= '/packed.js';
	  }
	  $combinedFile = fopen($combinedFilePath, 'w');
	  fwrite($combinedFile, $contents);
	  fclose($combinedFile);
	  
//	  echo 'passage!';
	  
//	  if($this->type=='css')
//	  {
//	  	$combinedFilePath = $this->request->getRelativeUrlRoot().'/packed/css/'.$cacheFileName;
//	  }
//	  else
//	  {
//	  	$combinedFilePath = $this->request->getRelativeUrlRoot().'/packed/js/'.$cacheFileName;
//	  }
//	  var_dump($combinedFilePath);
//	  mkdir($combinedFilePath);
//	  chmod($combinedFilePath, 0777);
//	  symlink(sfConfig::get('sf_cache_dir'). "/" . self::PACK_CACHE_FOLDER . "/" . $cacheFileName . '.cache', $combinedFilePath.'/packed.js');
	  // FIN SAMAX
	  
      return true;
    }

    return false;
  }

  private function compressCss($content)
  {
    // remove comments
    // TODO:  check and see if this breaks hacks.  Turning it off for now
    //$content = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $content);
    // remove tabs, spaces, newlines, etc.
    //$content = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $content);
    cssmin::minify($content, array('preserve-urls' => false));
    return $content;
  }

  private function fixCssPaths($content,$path)
  {
    if (preg_match_all("/url\(\s?[\'|\"]?(.+)[\'|\"]?\s?\)/ix", $content, $urlMatches) )
    {
      $urlMatches = array_unique( $urlMatches[1] );
      $cssPathArray = explode(DIRECTORY_SEPARATOR, $path);

      // pop the css file name
      array_pop( $cssPathArray );
      $cssPathCount   = count( $cssPathArray );
      foreach( $urlMatches as $match )
      {
        $match = str_replace( array('"', "'"), '', $match );
        $relativeCount = substr_count( $match, '../' );
        // replace path if it is realtive
        if ( $match[0] !== '/' and strpos( $match, 'http:' ) === false )
        {
          $cssPathSlice = $relativeCount === 0 ? $cssPathArray : array_slice( $cssPathArray  , 0, $cssPathCount - $relativeCount  );
          $newMatchPath = $this->request->getRelativeUrlRoot() . implode('/', $cssPathSlice) . '/' . str_replace('../', '', $match);
          $content = str_replace( $match, $newMatchPath, $content );
        }
      }
    }
    return $content;
  }

  private function checkFile($element)
  {
    $sf_symfony_data_dir = sfConfig::get('sf_data_dir');

    $cachedir  = sfConfig::get('sf_cache_dir');
    $webdir    = sfConfig::get('sf_web_dir');
    $cssdir    = $webdir.DIRECTORY_SEPARATOR.'css';
    $jsdir     = $webdir.DIRECTORY_SEPARATOR.'js';

    // Determine the directory and type we should use
    switch ($this->type)
    {
      case 'css':
        $dir = $cssdir;
        break;
      case 'javascript':
        $dir = $jsdir;
        break;
    }

    $path = null;
    if (substr($element, 0, 4) == '/sf/')
    {
      $path = $sf_symfony_data_dir.DIRECTORY_SEPARATOR.'web'.$element;
    }
    else if (substr($element, 0, 3) == 'sf/')
    {
      $path = $sf_symfony_data_dir.DIRECTORY_SEPARATOR.'web'.DIRECTORY_SEPARATOR.$element;
    }
    else if (0 === strpos($element, '/'))
    {
      $path = realpath($webdir.$element);
    }
    else
    {
      $path = realpath($dir.DIRECTORY_SEPARATOR.$element);
    }

    if (!file_exists($path)) return false;
    $this->files[] = $path;
    $this->lastmodified = max($this->lastmodified, filemtime($path));
    return true;
  }

  protected function getCombinedStylesheets()
  {
    $root_css_only = sfConfig::get('app_sf_combine_filter_plugin_root_css_only', false);
    $already_seen = array();
    $combined_sources = array();

    foreach (array('first', '', 'last') as $position)
    {
      foreach ($this->response->getStylesheets($position) as $files => $options)
      {
        if (!is_array($files))
        {
          $files = array($files);
        }

        foreach ($files as $file)
        {
          if (isset($already_seen[$file])) continue;

          $already_seen[$file] = 1;

          if (is_array($options) && ($this->isInvalidMediaType($options) || $this->isAbsolutePath($options)))
          {
            continue;
          }

          $path = str_replace($this->request->getRelativeUrlRoot(), '', _compute_public_path($file, 'css', 'css') );

          if ((!$root_css_only && !strpos($path, '://')&& strpos($path, '.css')) || ($root_css_only && strpos($path, $this->sf_relative_url_root.'/css/') === 0)) {
            $element = (!$root_css_only ? preg_replace("/^".str_replace('/', '\/', $this->sf_relative_url_root.'/css/')."/i", '', $path) : $path);
            if($this->checkFile($element))
            {
              $combined_sources[] = $element;
              $this->response->removeStylesheet($file, ($position ? $position : ''));
            }
          }
        }
      }
    }

    if (count($combined_sources))
    {
      $cacheFileName = $this->lastmodified . '-' . md5(implode(',', $combined_sources));
      if($this->cacheFile($cacheFileName))
      {
        $combined_sources_str = $this->request->getRelativeUrlRoot()."/packed/css/$cacheFileName/packed.css";
        //TODO: keep track if there is a dynamic file in the middle of static files and create multiple packed files
        // if required to keep the proper order
        $this->response->addStylesheet($combined_sources_str, 'first');
      }
    }
  }

  protected function isInvalidMediaType($options)
  {
    return isset($options['media']) && !in_array($options['media'], array('', 'all', 'screen'));
  }

  protected function isAbsolutePath($options)
  {
    return isset($options['absolute']) && $options['absolute'] == true;
  }

}
