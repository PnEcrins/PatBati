<?php 
class myUtils 
{
	public static function logIt($error='', $with_trace=false) 
	{
		if (!is_string($error))
		{
			ob_start();
			var_dump($error);
			$error = ob_get_contents();
			ob_end_clean();
		}
		
		if ($with_trace)
		{
			error_log(debug_backtrace(), 3, sfConfig::get('sf_log_dir').'/errors.log');
		}
		
		$error = empty($error) ? " --- \n" : date('d/m/Y H:i:s')." :\t".$error."\n";

		error_log($error, 3, sfConfig::get('sf_log_dir').'/errors.log');
	}
}
?>