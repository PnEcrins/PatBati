<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseIdentification extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('patbati.identification');
        $this->hasColumn('indexbatiment', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'primary' => true,
             'autoincrement' => true,
             ));
        $this->hasColumn('ancienindexbatiment', 'integer', 11, array(
             'type' => 'integer',
             'length' => 11,
             ));
        $this->hasColumn('codepem', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('codeclasse', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'notnull' => true,
             ));
        $this->hasColumn('codefaitage', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('codeconservation', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('codeinsee', 'string', 5, array(
             'type' => 'string',
             'length' => 5,
             'notnull' => true,
             ));
        $this->hasColumn('appelation', 'string', 50, array(
             'type' => 'string',
             'length' => 50,
             'notnull' => true,
             ));
        $this->hasColumn('indivision', 'boolean', null, array(
             'type' => 'boolean',
             ));
        $this->hasColumn('proprietaire', 'string', 150, array(
             'type' => 'string',
             'length' => 150,
             ));
        $this->hasColumn('cadastre', 'string', 20, array(
             'type' => 'string',
             'length' => 20,
             ));
        $this->hasColumn('lieu_dit', 'string', 100, array(
             'type' => 'string',
             'length' => 100,
             ));
        $this->hasColumn('altitude', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('l2x', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('l2y', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('situationgeo', 'string', 200, array(
             'type' => 'string',
             'length' => 200,
             ));
        $this->hasColumn('denivelle', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('exposition', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('pente', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('capacite', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('date_insert', 'timestamp', null, array(
             'type' => 'timestamp',
             ));
        $this->hasColumn('date_update', 'timestamp', null, array(
             'type' => 'timestamp',
             ));
        $this->hasColumn('bat_suppr', 'boolean', null, array(
             'type' => 'boolean',
             'default' => false,
             ));
        $this->hasColumn('notepatri', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('patrimonialite', 'string', 200, array(
             'type' => 'string',
             'length' => 200,
             ));
        $this->hasColumn('info_risquenat', 'string', 200, array(
             'type' => 'string',
             'length' => 200,
             ));
        $this->hasColumn('info_masque', 'string', 200, array(
             'type' => 'string',
             'length' => 200,
             ));
        $this->hasColumn('remarques', 'string', 1000, array(
             'type' => 'string',
             'length' => 1000,
             ));
        $this->hasColumn('valide', 'boolean', null, array(
             'type' => 'boolean',
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasOne('BibImplantation', array(
             'local' => 'codepem',
             'foreign' => 'codepem'));

        $this->hasOne('BibClasseArchi', array(
             'local' => 'codeclasse',
             'foreign' => 'codeclasse'));

        $this->hasOne('BibFaitage', array(
             'local' => 'codefaitage',
             'foreign' => 'codefaitage'));

        $this->hasOne('BibConservation', array(
             'local' => 'codeconservation',
             'foreign' => 'codeconservation'));

        $this->hasOne('BibCommune', array(
             'local' => 'codeinsee',
             'foreign' => 'codeinsee'));

        $this->hasOne('BibExposition', array(
             'local' => 'exposition',
             'foreign' => 'indexexposition'));

        $this->hasOne('BibNotepatri', array(
             'local' => 'notepatri',
             'foreign' => 'indexnotepatri'));

        $this->hasMany('BibMasque as RelMasques', array(
             'refClass' => 'RelMasque',
             'local' => 'indexbatiment',
             'foreign' => 'codemasque'));

        $this->hasMany('BibRisquenat as RelRisquenats', array(
             'refClass' => 'RelRisquenat',
             'local' => 'indexbatiment',
             'foreign' => 'coderisque'));

        $this->hasMany('BibProtection as RelProtections', array(
             'refClass' => 'RelProtection',
             'local' => 'indexbatiment',
             'foreign' => 'codeprotection'));

        $this->hasMany('BibPerspective as RelIdentPerspectives', array(
             'refClass' => 'RelIdentPerspective',
             'local' => 'indexbatiment',
             'foreign' => 'codeperspective'));

        $this->hasMany('Demande as Demandes', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));

        $this->hasMany('ElementsPaysagers as ElementsPaysagerss', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));

        $this->hasMany('Enquetes as Enquetess', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));

        $this->hasMany('Equipements as Equipementss', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));

        $this->hasMany('Documents', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));

        $this->hasMany('Illustration as Illustrations', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));

        $this->hasMany('SecondOeuvre as SecondOeuvres', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));

        $this->hasMany('Structures as Structuress', array(
             'local' => 'indexbatiment',
             'foreign' => 'indexbatiment'));

        $timestampable0 = new Doctrine_Template_Timestampable(array(
             'created' => 
             array(
              'name' => 'date_insert',
              'type' => 'timestamp',
              'format' => 'Y-m-d H:i:s',
             ),
             'updated' => 
             array(
              'name' => 'date_update',
              'type' => 'timestamp',
              'format' => 'Y-m-d H:i:s',
             ),
             ));
        $this->actAs($timestampable0);
    }
}