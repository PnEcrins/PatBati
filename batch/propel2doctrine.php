<?php

/**
 * propel2doctrine batch script
 *
 * Convert propel schema.xml to doctrine schema
 *
 * 0.3: 
 *  - fix error when convert integer type
 *  - fix missing primary key in doctrine schema
 *  - fix missing id field in doctrine schema
 * 0.2:
 *  - fix default value in doctrine schema
 * 0.1:
 *  - init
 * 
 * @package    fget
 * @subpackage batch
 * @author     An Vu <an@toan2.com>
 * @version    0.3
 */

require_once(dirname(__FILE__).'/../config/ProjectConfiguration.class.php');
$configuration = ProjectConfiguration::getApplicationConfiguration('frontend', 'prod', false);
sfContext::createInstance($configuration);

// initialize database manager
//$databaseManager = new sfDatabaseManager($configuration);
//$databaseManager->loadConfiguration();


// batch process here


$file = sfConfig::get ( 'sf_config_dir' ) . "/schema.xml";

$doctrineSchemasDir = sfConfig::get ( 'sf_config_dir' ) . DIRECTORY_SEPARATOR . 'doctrine' . DIRECTORY_SEPARATOR;
$doctrineSchemaFile = $doctrineSchemasDir . DIRECTORY_SEPARATOR . 'schema.yml';
@mkdir ( $doctrineSchemasDir );

$xml = new DOMDocument ( );
$xml->load ( $file );

$xpath = new DOMXPath ( $xml );

$doctrineSchema = array ( );

$tables = $xpath->query ( "//table" );

for($i = 0; $i < $tables->length; $i ++) {
	$table = $tables->item ( $i );
	$tableName = $table->getAttribute ( 'name' );
	$class = sfInflector::camelize ( $tableName );
	
	$doctrineSchema [$class] ['tableName'] = $tableName;
	
	$tableChildNodes = $table->childNodes;
	for($j = 0; $j < $tableChildNodes->length; $j ++) {
		$tableChild = $tableChildNodes->item ( $j );
		$nodeName = $tableChild->nodeName;
		if ($nodeName == "column") {
			$columnName = $tableChild->getAttribute ( 'name' );
			
			switch ( $tableChild->getAttribute ( 'type' )) {
				case 'INTEGER' :
					$columnType = 'integer';
					$columnSize = '4';
				break;

				case 'BIGINT' :
					$columnType = 'integer';
					$columnSize = '4';
				break;
				
				case 'VARCHAR' :
					$columnType = 'string';
					$columnSize = $tableChild->getAttribute ( 'size' );
				break;
				
				case 'CHAR' :
					$columnType = 'string';
					$columnSize = 1;
				break;
				
				case 'LONGVARCHAR' :
					$columnType = 'string';
					$columnSize = 4000;
				break;
				
				case 'TIMESTAMP' :
					$columnType = 'timestamp';
					$columnSize = '';
				break;
				
				case 'DATE' :
					$columnType = 'date';
					$columnSize = '';
				break;
				
				case 'FLOAT' :
					$columnType = 'float';
					$columnSize = '';
				break;
				
				case 'BOOLEAN' :
					$columnType = 'boolean';
					$columnSize = '';
				break;
				
				default :
					$columnType = '';
					$columnSize = '';
				break;
			}
			
			$doctrineSchema [$class] ['columns'] [$columnName] = array ('type' => $columnType, 'size' => $columnSize );
			
			if ($tableChild->hasAttribute ( 'default' )) {
				$doctrineSchema [$class] ['columns'] [$columnName] ['default'] = $tableChild->getAttribute ( 'default' );
			}
			
			if ($tableChild->getAttribute ( 'required' ) == "true") {
				$doctrineSchema [$class] ['columns'] [$columnName] ['notnull'] = "true";
			}
			
			if ($tableChild->getAttribute ( 'primaryKey' ) == "true") {
				$doctrineSchema [$class] ['columns'] [$columnName] ['primary'] = "true";
			}
			
			if ($tableChild->getAttribute ( 'autoIncrement' ) == "true") {
				$doctrineSchema [$class] ['columns'] [$columnName] ['autoincrement'] = "true";
			}
		} elseif ($nodeName == "foreign-key") {
			$foreignTable = $tableChild->getAttribute ( 'foreignTable' );
			$foreignClass = sfInflector::camelize ( $foreignTable );
			
			$foreignKeyChilds = $tableChild->childNodes;
			$referenceNode = null;
			
			for($k = 0; $k < $foreignKeyChilds->length; $k ++) {
				if ($foreignKeyChilds->item ( $k )->nodeType == XML_ELEMENT_NODE && $foreignKeyChilds->item ( $k )->nodeName == "reference") {
					$referenceNode = $foreignKeyChilds->item ( $k );
					break;
				}
			}
			if (! $referenceNode)
				continue;
			
			$onDelete = ($tableChild->getAttribute ( 'onDelete' ) == 'setnull') ? 'null' : $tableChild->getAttribute ( 'onDelete' );
			$alias = sfInflector::camelize ( substr ( $referenceNode->getAttribute ( 'local' ), 0, - 3 ) );
			// local = "id", so $alias = "". We need set $alias to $foreignClass
			if ($alias == "") {
				$alias = $foreignClass;
			}
			$doctrineSchema [$class] ['relations'] [$alias] = array ('class' => $foreignClass, 'foreign' => $referenceNode->getAttribute ( 'foreign' ), 'foreignAlias' => $class . 's', 'alias' => $alias, 'local' => $referenceNode->getAttribute ( 'local' ), 'onDelete' => $onDelete );
		} elseif ($nodeName == "unique") {
			$indexName = $tableChild->getAttribute ( 'name' );
			
			$foreignKeyChilds = $tableChild->childNodes;
			$fields = array ( );
			for($k = 0; $k < $foreignKeyChilds->length; $k ++) {
				if ($foreignKeyChilds->item ( $k )->nodeType == XML_ELEMENT_NODE && $foreignKeyChilds->item ( $k )->nodeName == "unique-column") {
					$fields [] = $foreignKeyChilds->item ( $k )->getAttribute ( 'name' );
				}
			}
			
			$doctrineSchema [$class] ['indexes'] [$indexName] = array ('fields' => $fields, 'type' => 'unique' );
		}
	}
}

// Dump data. Dont use sfYaml::dump (syck_dump has problem)
$yamlDumper = new Doctrine_Parser_Spyc();
file_put_contents ( $doctrineSchemaFile, $yamlDumper->dump($doctrineSchema, 2, 0 ) );