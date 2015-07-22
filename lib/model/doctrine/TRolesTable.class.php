<?php
class TRolesTable extends Doctrine_Table
{
  const CREDENTIAL_READ = 'read';
  const CREDENTIAL_SAVE = 'save';
  const CREDENTIAL_ADMIN = 'admin';
  
    public static $credentials = array(
      0 => array(self::CREDENTIAL_READ),
      1 => array(self::CREDENTIAL_READ),
      2 => array(self::CREDENTIAL_SAVE),
      3 => array(self::CREDENTIAL_READ),
      4 => array(self::CREDENTIAL_READ),
      5 => array(self::CREDENTIAL_READ),
      6 => array(self::CREDENTIAL_SAVE,self::CREDENTIAL_ADMIN),
    );
  
    public static function identify($login, $pass)
    {
        $nb_role=Doctrine_Query::create()
            ->from('TRoles')
            ->where('identifiant=? AND pass=?', array($login, $pass))
            ->count();
        if ($nb_role>0) {return true;}
        return false;
    }

    public static function retrieve($login)
    {
        return Doctrine_Query::create()
            ->from('TRoles')
            ->where('identifiant=?', $login)
            ->fetchOne();
    }

    public static function getDroitsUser($id_role)
    {
        $dbh = Doctrine_Manager::getInstance()->getCurrentConnection()->getDbh();
        $sql = "SELECT COALESCE(max(a.id_droit),0) as id_droit
                FROM (
                    (SELECT c.id_droit
                    FROM utilisateurs.t_roles u
                    JOIN utilisateurs.cor_role_droit_application c ON c.id_role = u.id_role
                    WHERE u.id_role = $id_role AND c.id_application = 10)
                    union
                    (SELECT c.id_droit
                    FROM utilisateurs.t_roles u
                    JOIN utilisateurs.cor_roles g ON g.id_role_utilisateur = u.id_role
                    JOIN utilisateurs.cor_role_droit_application c ON c.id_role = g.id_role_groupe
                    WHERE u.id_role = $id_role AND c.id_application = 10)
                ) as a";
        $array_droit = $dbh->query($sql);

        foreach($array_droit as $val){
            $id_droit = $val['id_droit'];
        }

        return $id_droit;
    }
    

    public static function listObservateurs()
    {
        $query_utilisateur= Doctrine_Query::create()
        ->select('r.id_role, concat(r.nom_role, \' \',r.prenom_role) auteur' )
        ->from('TRoles r')
        ->innerJoin('r.CorRoleMenu crm ON crm.id_menu = 2 AND r.id_role=crm.id_role')
        ->where('r.groupe = false')
        ->orderBy('auteur')
        ->fetchArray();
         $query_groupe= Doctrine_Query::create()
        ->select('r.id_role, concat(r.nom_role, \' \',r.prenom_role) auteur' )
        ->from('TRoles r')
        ->innerJoin('r.CorRoles cr ON cr.id_role_utilisateur = r.id_role')
        ->innerJoin('cr.CorRoleMenu crmg ON crmg.id_menu = 2 AND cr.id_role_groupe=crmg.id_role')
        ->orderBy('auteur')
        ->fetchArray();
        $query=array_merge($query_utilisateur, $query_groupe);
        return $query;
    }
}