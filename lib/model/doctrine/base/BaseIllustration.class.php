<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseIllustration extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('patbati.illustration');
        $this->hasColumn('indexilustration', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'primary' => true,
             'autoincrement' => true,
             ));
        $this->hasColumn('codeillustration', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'notnull' => true,
             ));
        $this->hasColumn('codepersonne', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('indexbatiment', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'notnull' => true,
             ));
        $this->hasColumn('indexajaris', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('date_illustration', 'date', null, array(
             'type' => 'date',
             ));
        $this->hasColumn('vignette', 'string', 100, array(
             'type' => 'string',
             'length' => 100,
             ));
        $this->hasColumn('fichier_source', 'string', 100, array(
             'type' => 'string',
             'length' => 100,
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasOne('BibIllustration', array(
             'local' => 'codeillustration',
             'foreign' => 'codeillustration'));

        $this->hasOne('BibPersonnes', array(
             'local' => 'codepersonne',
             'foreign' => 'codepersonne'));

        $this->hasOne('Identification', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));
    }
}