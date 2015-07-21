<?php
class sfMmwExtjsUtil {
	
	public static function getJavascriptPath($name, $prefix, $full=false)
	{
		/*
		possible values for prefix are:
		base
		modules
		extjsx.y (for example extjs3.0)
		*/
		
		if($full)
		{
			$path = sfConfig::get('sf_web_dir').'/js/mmwExtjs/'.$prefix.'/'.$name.'.js';
		} else {
			$path = '/js/mmwExtjs/'.$prefix.'/'.$name;
		}
		return $path;
	}
	
	
	/*
	 * in extjs, post paramameters are typically [field]__[name]
	 * or [filters]__[value1]__[value2]
	 */
	public static function getSfParamsFromExtjs($name, array $requestParams) 
	{
		$params = array();
		
		foreach ($requestParams as $param => $value)
		{
			// field name is after "filters__"
			$temp = explode('__',$param);
			
			if(($value != null) && ($value != '') && ($name == $temp[0]))
			{
				$count = count($temp);			
				switch($count) {
					case 2:				
						$params[$temp[1]] = $value;
					break;
					case 3:
						$params[$temp[1]][$temp[2]] = $value;
					break;
					case 4:
						$params[$temp[1]][$temp[2]][$temp[3]] = $value;
					break;
				}
			}
		}
		
		return $params;
	}
	
	public static function getSfFieldNameFromExtjs($extjsName)
	{
		$temp = explode('__', $extjsName);
		$sfName = isset($temp[1]) ? $temp[1] : $extjsName;
		return $sfName;	
	}
	
	public static function getSfExtjsNameFromField($table, $field, $quote=false)
	{
		$name = $table.'__'.$field;
		if($quote) $name = '\''.$name.'\'';
		
		return $name;
	}
	
	public static function getExtjsParamsfromArray($table, $params)
	{
		$extjsParams = array();
		foreach($params as $name => $value)
		{
			if (is_array($value))
			{
				foreach($value as $key => $subvalue)
				{
					$extjsParams[self::getSfExtjsNameFromField($table, $name).'__'.$key] = $subvalue;
				}
			}
			else
			{
				$extjsParams[self::getSfExtjsNameFromField($table, $name)] = $value;	
			}
			
		}
		return $extjsParams;
	}
	
	public static function recursiveImplode($string, $array)
	{
        foreach($array as $key => &$value)
		{
            if(is_array($value))
			{
                $value = self::recursiveImplode($string, $value);
			}
        }
        return implode($string, $array);
	}

	public static function getFieldToString($object, $table_name)
	{
		$result = call_user_func(array($object, 'get'.$table_name));

		if ($result !== null && is_object($result))
		{
			if (method_exists($result, '__toString'))
			{
				return $result->__toString();
			}
			else
			{
				return $result->getPrimaryKey();
			}
		}
		else
		{
			return null;
		}
	}

	public static function getFieldDisplayValueFromChoice($value, $choices)
	{
		if (isset($choices[$value]))
		{
			return $choices[$value];
		}
		else
		{
			return $value;
		}
	}

	public static function arrayValuesToString($array)
	{
		$string = '';
		$i = 0;
		$size = count($array);
		foreach($array as $value)
		{
			$i++;
			$string.= self::addQuote($value);
			
			if ($i < $size)
			{
				$string.= ',';
			}
		}
		
		return $string;
	}
	
	public static function addQuote($value) 
	{
		return '\''.$value.'\'';
	}

	public static function flattenArrayValues($arrayToProcess, $arrayToComplete=array())
	{		
		foreach ($arrayToProcess as $field)
		{
			if (is_array($field))
			{
				$arrayToComplete = self::flattenArrayValues($field, $arrayToComplete);
			}
			else
			{
				$arrayToComplete[] = $field;
			}
		}
		
		return $arrayToComplete;
	}
}
?>
