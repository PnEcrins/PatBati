<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseBibMateriauxFins extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('patbati.bib_materiaux_fins');
        $this->hasColumn('codematfins', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'primary' => true,
             'autoincrement' => true,
             ));
        $this->hasColumn('matfins', 'string', 50, array(
             'type' => 'string',
             'length' => 50,
             ));
        $this->hasColumn('type_matfins', 'string', 50, array(
             'type' => 'string',
             'length' => 50,
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasMany('SecondOeuvre as RelSoMatfinss', array(
             'refClass' => 'RelSoMatfins',
             'local' => 'codematfins',
             'foreign' => 'indexso'));

        $this->hasMany('Structures as RelStructuresMatfinss', array(
             'refClass' => 'RelStructuresMatfins',
             'local' => 'codematfins',
             'foreign' => 'indexstructure'));

        $this->hasMany('BibFinition as RelMatfinsFinitions', array(
             'refClass' => 'RelMatfinsFinition',
             'local' => 'codematfins',
             'foreign' => 'codefinition'));
    }
}