<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseCorRoleDroitApplication extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('utilisateurs.cor_role_droit_application');
        $this->hasColumn('id_role', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'notnull' => true,
             ));
        $this->hasColumn('id_droit', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'notnull' => true,
             ));
        $this->hasColumn('id_application', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'notnull' => true,
             ));
    }

}