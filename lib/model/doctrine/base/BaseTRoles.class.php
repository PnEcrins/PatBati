<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseTRoles extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('utilisateurs.t_roles');
        $this->hasColumn('groupe', 'integer', 1, array(
             'type' => 'integer',
             'length' => 1,
             'notnull' => true,
             ));
        $this->hasColumn('id_role', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'notnull' => true,
             ));
        $this->hasColumn('identifiant', 'string', 100, array(
             'type' => 'string',
             'length' => 100,
             'primary' => true,
             ));
        $this->hasColumn('nom_role', 'string', 50, array(
             'type' => 'string',
             'length' => 50,
             ));
        $this->hasColumn('prenom_role', 'string', 100, array(
             'type' => 'string',
             'length' => 100,
             ));
        $this->hasColumn('desc_role', 'string', 500, array(
             'type' => 'string',
             'length' => 500,
             ));
        $this->hasColumn('pass', 'string', 100, array(
             'type' => 'string',
             'length' => 100,
             ));
        $this->hasColumn('email', 'string', 250, array(
             'type' => 'string',
             'length' => 250,
             ));
        $this->hasColumn('organisme', 'string', 32, array(
             'type' => 'string',
             'length' => 32,
             ));
        $this->hasColumn('id_unite', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('pn', 'integer', 1, array(
             'type' => 'integer',
             'length' => 1,
             ));
        $this->hasColumn('session_appli', 'string', 50, array(
             'type' => 'string',
             'length' => 50,
             ));
        $this->hasColumn('date_insert', 'date', null, array(
             'type' => 'date',
             ));
        $this->hasColumn('date_update', 'date', null, array(
             'type' => 'date',
             ));
    }

}