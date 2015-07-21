<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseBibMateriauxGe extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('patbati.bib_materiaux_ge');
        $this->hasColumn('codematge', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'primary' => true,
             'autoincrement' => true,
             ));
        $this->hasColumn('matge', 'string', 50, array(
             'type' => 'string',
             'length' => 50,
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasMany('BibMeoeuvre as RelMatgeMeos', array(
             'refClass' => 'RelMatgeMeo',
             'local' => 'codematge',
             'foreign' => 'codemeo'));

        $this->hasMany('Structures as Structuress', array(
             'local' => 'codematge',
             'foreign' => 'codematge'));
    }
}