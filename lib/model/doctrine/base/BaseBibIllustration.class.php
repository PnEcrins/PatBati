<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseBibIllustration extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('patbati.bib_illustration');
        $this->hasColumn('codeillustration', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'primary' => true,
             'autoincrement' => true,
             ));
        $this->hasColumn('illustration', 'string', 50, array(
             'type' => 'string',
             'length' => 50,
             'notnull' => true,
             ));
        $this->hasColumn('ordre_illustration', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasMany('Illustration as Illustrations', array(
             'local' => 'codeillustration',
             'foreign' => 'codeillustration'));
    }
}