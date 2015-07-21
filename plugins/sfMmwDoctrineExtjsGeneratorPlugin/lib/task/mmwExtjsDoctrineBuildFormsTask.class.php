<?php
//require_once(dirname(__FILE__).'/sfDoctrineBaseTask.class.php');

class mmwExtjsDoctrineBuildFormsTask extends sfDoctrineBaseTask
{
  /**
   * @see sfTask
   */
  protected function configure()
  {
    $this->addOptions(array(
      new sfCommandOption('connection', null, sfCommandOption::PARAMETER_REQUIRED, 'The connection name', 'doctrine'),
      new sfCommandOption('model-dir-name', null, sfCommandOption::PARAMETER_REQUIRED, 'The model dir name', 'model'),
      new sfCommandOption('form-dir-name', null, sfCommandOption::PARAMETER_REQUIRED, 'The form dir name', 'form'),
      new sfCommandOption('application', null, sfCommandOption::PARAMETER_OPTIONAL, 'The application name', true),
      new sfCommandOption('env', null, sfCommandOption::PARAMETER_REQUIRED, 'The environment', 'dev'),
      new sfCommandOption('model', null, sfCommandOption::PARAMETER_REQUIRED, 'generate a given model', false)
    ));

    $this->namespace = 'doctrine';
    $this->name = 'build-extjs-forms';
    $this->briefDescription = 'Creates form classes for the current model for extjs backend';

    $this->detailedDescription = <<<EOF
The [doctrine:build-extjs-forms|INFO] task creates form classes from the schema:

  [./symfony doctrine:build-extjs-forms|INFO]

The task read the schema information in [config/*schema.xml|COMMENT] and/or
[config/*schema.yml|COMMENT] from the project and all installed plugins.

The task use the [doctrine|COMMENT] connection as defined in [config/databases.yml|COMMENT].
You can use another connection by using the [--connection|COMMENT] option:

  [./symfony doctrine:build-extjs-forms --connection="name"|INFO]
  
You can also generate only one form if necessary by using the [--model] option:

  [./symfony doctrine:build-extjs-forms --model="Name"]

The model form classes files are created in [lib/form|COMMENT].

This task never overrides custom classes in [lib/form|COMMENT].
It only replaces base classes generated in [lib/form/base|COMMENT].
EOF;
  }

  /**
   * @see sfTask
   */
  protected function execute($arguments = array(), $options = array())
  {
    $this->logSection('doctrine', 'generating form classes');
    $databaseManager = new sfDatabaseManager($this->configuration);
    $generatorManager = new sfGeneratorManager($this->configuration);
    $generatorManager->generate('sfMmwExtjsDoctrineFormGenerator', array(
      'connection'     => $options['connection'],
      'model_dir_name' => $options['model-dir-name'],
      'form_dir_name'  => $options['form-dir-name'],
      'model'		   => $options['model'],
      'theme'		   => 'mmwExtjs'
    ));

    $properties = parse_ini_file(sfConfig::get('sf_config_dir').DIRECTORY_SEPARATOR.'properties.ini', true);

    $constants = array(
      'PROJECT_NAME' => isset($properties['symfony']['name']) ? $properties['symfony']['name'] : 'symfony',
      'AUTHOR_NAME'  => isset($properties['symfony']['author']) ? $properties['symfony']['author'] : 'Your name here'
    );

    // customize php and yml files
    if (!empty($options['model']) && (($options['model']) !== false))
    {
    	$finder = sfFinder::type('file')->name($options['model'].'Form.class.php', 'Plugin'.$options['model'].'Form.class.php');
    }
    else
    {
    	$finder = sfFinder::type('file')->name('*.php');
    }
    $this->getFilesystem()->replaceTokens($finder->in(sfConfig::get('sf_lib_dir').'/form/'), '##', '##', $constants);
  }
}