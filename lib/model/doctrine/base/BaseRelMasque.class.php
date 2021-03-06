<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseRelMasque extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('patbati.rel_masque');
        $this->hasColumn('codemasque', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'primary' => true,
             ));
        $this->hasColumn('indexbatiment', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'primary' => true,
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasOne('BibMasque', array(
             'local' => 'codemasque',
             'foreign' => 'codemasque'));

        $this->hasOne('Identification', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment',
             'onDelete' => 'cascade'));
    }
}