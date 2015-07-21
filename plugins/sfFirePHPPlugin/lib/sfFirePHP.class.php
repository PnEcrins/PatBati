<?php
require_once('FirePHP/FirePHP.class.php');

class sfFirePHP extends FirePHP
{
	protected function setHeader($Name, $Value) 
	{
		$response = sfContext::getInstance()->getResponse();
		return $response->setHttpHeader($Name, $Value);
	}
	
	protected function getUserAgent() 
	{
    return $_SERVER['HTTP_USER_AGENT'];
  }

	protected function newException($Message) 
	{
    return new Exception($Message);
  }
}

?>