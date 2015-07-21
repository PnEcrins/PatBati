<?php
// auto-generated by sfRoutingConfigHandler
// date: 2015/07/21 10:46:15
return array(
'documents' => new sfDoctrineRouteCollection(array (
  'model' => 'Documents',
  'module' => 'documents',
  'prefix_path' => 'documents',
  'column' => 'indexdocument',
  'with_wildcard_routes' => true,
  'name' => 'documents',
  'requirements' => 
  array (
  ),
)),
'export_batiments' => new sfRoute('/exportBatiments.xls', array (
  'module' => 'exportBatiments',
  'action' => 'index',
), array (
), array (
)),
'export_batiments_travaux' => new sfRoute('/exportTravaux.xls', array (
  'module' => 'exportBatiments',
  'action' => 'travaux',
), array (
), array (
)),
'bib_perspective' => new sfDoctrineRouteCollection(array (
  'model' => 'BibPerspective',
  'module' => 'bib_perspective',
  'prefix_path' => 'bib_perspective',
  'column' => 'codeperspective',
  'with_wildcard_routes' => true,
  'name' => 'bib_perspective',
  'requirements' => 
  array (
  ),
)),
'bib_type_equipement' => new sfDoctrineRouteCollection(array (
  'model' => 'BibTypeEquipement',
  'module' => 'bib_type_equipement',
  'prefix_path' => 'bib_type_equipement',
  'column' => 'codetypeequip',
  'with_wildcard_routes' => true,
  'name' => 'bib_type_equipement',
  'requirements' => 
  array (
  ),
)),
'bib_type_so' => new sfDoctrineRouteCollection(array (
  'model' => 'BibTypeSo',
  'module' => 'bib_type_so',
  'prefix_path' => 'bib_type_so',
  'column' => 'codetypeso',
  'with_wildcard_routes' => true,
  'name' => 'bib_type_so',
  'requirements' => 
  array (
  ),
)),
'travaux' => new sfDoctrineRouteCollection(array (
  'model' => 'Travaux',
  'module' => 'travaux',
  'prefix_path' => 'travaux',
  'column' => 'indextravaux',
  'with_wildcard_routes' => true,
  'name' => 'travaux',
  'requirements' => 
  array (
  ),
)),
'structures' => new sfDoctrineRouteCollection(array (
  'model' => 'Structures',
  'module' => 'structures',
  'prefix_path' => 'structures',
  'column' => 'indexstructure',
  'with_wildcard_routes' => true,
  'name' => 'structures',
  'requirements' => 
  array (
  ),
)),
'second_oeuvre' => new sfDoctrineRouteCollection(array (
  'model' => 'SecondOeuvre',
  'module' => 'second_oeuvre',
  'prefix_path' => 'second_oeuvre',
  'column' => 'indexso',
  'with_wildcard_routes' => true,
  'name' => 'second_oeuvre',
  'requirements' => 
  array (
  ),
)),
'rel_structures_matfins' => new sfDoctrineRouteCollection(array (
  'model' => 'RelStructuresMatfins',
  'module' => 'rel_structures_matfins',
  'prefix_path' => 'rel_structures_matfins',
  'column' => 'Array',
  'with_wildcard_routes' => true,
  'name' => 'rel_structures_matfins',
  'requirements' => 
  array (
  ),
)),
'rel_masque' => new sfDoctrineRouteCollection(array (
  'model' => 'RelMasque',
  'module' => 'rel_masque',
  'prefix_path' => 'rel_masque',
  'column' => 'Array',
  'with_wildcard_routes' => true,
  'name' => 'rel_masque',
  'requirements' => 
  array (
  ),
)),
'illustration' => new sfDoctrineRouteCollection(array (
  'model' => 'Illustration',
  'module' => 'illustration',
  'prefix_path' => 'illustration',
  'column' => 'indexilustration',
  'with_wildcard_routes' => true,
  'name' => 'illustration',
  'requirements' => 
  array (
  ),
)),
'identification' => new sfDoctrineRouteCollection(array (
  'model' => 'Identification',
  'module' => 'identification',
  'prefix_path' => 'identification',
  'column' => 'indexbatiment',
  'with_wildcard_routes' => true,
  'name' => 'identification',
  'requirements' => 
  array (
  ),
)),
'equipements' => new sfDoctrineRouteCollection(array (
  'model' => 'Equipements',
  'module' => 'equipements',
  'prefix_path' => 'equipements',
  'column' => 'indexequipement',
  'with_wildcard_routes' => true,
  'name' => 'equipements',
  'requirements' => 
  array (
  ),
)),
'enquetes' => new sfDoctrineRouteCollection(array (
  'model' => 'Enquetes',
  'module' => 'enquetes',
  'prefix_path' => 'enquetes',
  'column' => 'indexenquete',
  'with_wildcard_routes' => true,
  'name' => 'enquetes',
  'requirements' => 
  array (
  ),
)),
'elements_paysagers' => new sfDoctrineRouteCollection(array (
  'model' => 'ElementsPaysagers',
  'module' => 'elements_paysagers',
  'prefix_path' => 'elements_paysagers',
  'column' => 'indexep',
  'with_wildcard_routes' => true,
  'name' => 'elements_paysagers',
  'requirements' => 
  array (
  ),
)),
'demande' => new sfDoctrineRouteCollection(array (
  'model' => 'Demande',
  'module' => 'demande',
  'prefix_path' => 'demande',
  'column' => 'indexdemande',
  'with_wildcard_routes' => true,
  'name' => 'demande',
  'requirements' => 
  array (
  ),
)),
'bib_usage' => new sfDoctrineRouteCollection(array (
  'model' => 'BibUsage',
  'module' => 'bib_usage',
  'prefix_path' => 'bib_usage',
  'column' => 'codeusage',
  'with_wildcard_routes' => true,
  'name' => 'bib_usage',
  'requirements' => 
  array (
  ),
)),
'bib_structure' => new sfDoctrineRouteCollection(array (
  'model' => 'BibStructure',
  'module' => 'bib_structure',
  'prefix_path' => 'bib_structure',
  'column' => 'codestructure',
  'with_wildcard_routes' => true,
  'name' => 'bib_structure',
  'requirements' => 
  array (
  ),
)),
'bib_so' => new sfDoctrineRouteCollection(array (
  'model' => 'BibSo',
  'module' => 'bib_so',
  'prefix_path' => 'bib_so',
  'column' => 'codeso',
  'with_wildcard_routes' => true,
  'name' => 'bib_so',
  'requirements' => 
  array (
  ),
)),
'bib_secteur' => new sfDoctrineRouteCollection(array (
  'model' => 'BibSecteur',
  'module' => 'bib_secteur',
  'prefix_path' => 'bib_secteur',
  'column' => 'codesecteur',
  'with_wildcard_routes' => true,
  'name' => 'bib_secteur',
  'requirements' => 
  array (
  ),
)),
'bib_risquenat' => new sfDoctrineRouteCollection(array (
  'model' => 'BibRisquenat',
  'module' => 'bib_risquenat',
  'prefix_path' => 'bib_risquenat',
  'column' => 'coderisque',
  'with_wildcard_routes' => true,
  'name' => 'bib_risquenat',
  'requirements' => 
  array (
  ),
)),
'bib_protection' => new sfDoctrineRouteCollection(array (
  'model' => 'BibProtection',
  'module' => 'bib_protection',
  'prefix_path' => 'bib_protection',
  'column' => 'codeprotection',
  'with_wildcard_routes' => true,
  'name' => 'bib_protection',
  'requirements' => 
  array (
  ),
)),
'bib_personnes' => new sfDoctrineRouteCollection(array (
  'model' => 'BibPersonnes',
  'module' => 'bib_personnes',
  'prefix_path' => 'bib_personnes',
  'column' => 'codepersonne',
  'with_wildcard_routes' => true,
  'name' => 'bib_personnes',
  'requirements' => 
  array (
  ),
)),
'bib_notepatri' => new sfDoctrineRouteCollection(array (
  'model' => 'BibNotepatri',
  'module' => 'bib_notepatri',
  'prefix_path' => 'bib_notepatri',
  'column' => 'indexnotepatri',
  'with_wildcard_routes' => true,
  'name' => 'bib_notepatri',
  'requirements' => 
  array (
  ),
)),
'bib_nature' => new sfDoctrineRouteCollection(array (
  'model' => 'BibNature',
  'module' => 'bib_nature',
  'prefix_path' => 'bib_nature',
  'column' => 'codenature',
  'with_wildcard_routes' => true,
  'name' => 'bib_nature',
  'requirements' => 
  array (
  ),
)),
'bib_meoeuvre' => new sfDoctrineRouteCollection(array (
  'model' => 'BibMeoeuvre',
  'module' => 'bib_meoeuvre',
  'prefix_path' => 'bib_meoeuvre',
  'column' => 'codemeo',
  'with_wildcard_routes' => true,
  'name' => 'bib_meoeuvre',
  'requirements' => 
  array (
  ),
)),
'bib_materiaux_ge' => new sfDoctrineRouteCollection(array (
  'model' => 'BibMateriauxGe',
  'module' => 'bib_materiaux_ge',
  'prefix_path' => 'bib_materiaux_ge',
  'column' => 'codematge',
  'with_wildcard_routes' => true,
  'name' => 'bib_materiaux_ge',
  'requirements' => 
  array (
  ),
)),
'bib_materiaux_fins' => new sfDoctrineRouteCollection(array (
  'model' => 'BibMateriauxFins',
  'module' => 'bib_materiaux_fins',
  'prefix_path' => 'bib_materiaux_fins',
  'column' => 'codematfins',
  'with_wildcard_routes' => true,
  'name' => 'bib_materiaux_fins',
  'requirements' => 
  array (
  ),
)),
'bib_masque' => new sfDoctrineRouteCollection(array (
  'model' => 'BibMasque',
  'module' => 'bib_masque',
  'prefix_path' => 'bib_masque',
  'column' => 'codemasque',
  'with_wildcard_routes' => true,
  'name' => 'bib_masque',
  'requirements' => 
  array (
  ),
)),
'bib_implantation' => new sfDoctrineRouteCollection(array (
  'model' => 'BibImplantation',
  'module' => 'bib_implantation',
  'prefix_path' => 'bib_implantation',
  'column' => 'codepem',
  'with_wildcard_routes' => true,
  'name' => 'bib_implantation',
  'requirements' => 
  array (
  ),
)),
'bib_illustration' => new sfDoctrineRouteCollection(array (
  'model' => 'BibIllustration',
  'module' => 'bib_illustration',
  'prefix_path' => 'bib_illustration',
  'column' => 'codeillustration',
  'with_wildcard_routes' => true,
  'name' => 'bib_illustration',
  'requirements' => 
  array (
  ),
)),
'bib_finition' => new sfDoctrineRouteCollection(array (
  'model' => 'BibFinition',
  'module' => 'bib_finition',
  'prefix_path' => 'bib_finition',
  'column' => 'codefinition',
  'with_wildcard_routes' => true,
  'name' => 'bib_finition',
  'requirements' => 
  array (
  ),
)),
'bib_faitage' => new sfDoctrineRouteCollection(array (
  'model' => 'BibFaitage',
  'module' => 'bib_faitage',
  'prefix_path' => 'bib_faitage',
  'column' => 'codefaitage',
  'with_wildcard_routes' => true,
  'name' => 'bib_faitage',
  'requirements' => 
  array (
  ),
)),
'bib_exposition' => new sfDoctrineRouteCollection(array (
  'model' => 'BibExposition',
  'module' => 'bib_exposition',
  'prefix_path' => 'bib_exposition',
  'column' => 'indexexposition',
  'with_wildcard_routes' => true,
  'name' => 'bib_exposition',
  'requirements' => 
  array (
  ),
)),
'bib_equipement' => new sfDoctrineRouteCollection(array (
  'model' => 'BibEquipement',
  'module' => 'bib_equipement',
  'prefix_path' => 'bib_equipement',
  'column' => 'codeequipement',
  'with_wildcard_routes' => true,
  'name' => 'bib_equipement',
  'requirements' => 
  array (
  ),
)),
'bib_element_paysager' => new sfDoctrineRouteCollection(array (
  'model' => 'BibElementPaysager',
  'module' => 'bib_element_paysager',
  'prefix_path' => 'bib_element_paysager',
  'column' => 'codeep',
  'with_wildcard_routes' => true,
  'name' => 'bib_element_paysager',
  'requirements' => 
  array (
  ),
)),
'bib_conservation' => new sfDoctrineRouteCollection(array (
  'model' => 'BibConservation',
  'module' => 'bib_conservation',
  'prefix_path' => 'bib_conservation',
  'column' => 'codeconservation',
  'with_wildcard_routes' => true,
  'name' => 'bib_conservation',
  'requirements' => 
  array (
  ),
)),
'bib_commune' => new sfDoctrineRouteCollection(array (
  'model' => 'BibCommune',
  'module' => 'bib_commune',
  'prefix_path' => 'bib_commune',
  'column' => 'codeinsee',
  'with_wildcard_routes' => true,
  'name' => 'bib_commune',
  'requirements' => 
  array (
  ),
)),
'bib_classe_archi' => new sfDoctrineRouteCollection(array (
  'model' => 'BibClasseArchi',
  'module' => 'bib_classe_archi',
  'prefix_path' => 'bib_classe_archi',
  'column' => 'codeclasse',
  'with_wildcard_routes' => true,
  'name' => 'bib_classe_archi',
  'requirements' => 
  array (
  ),
)),
'bib_canton' => new sfDoctrineRouteCollection(array (
  'model' => 'BibCanton',
  'module' => 'bib_canton',
  'prefix_path' => 'bib_canton',
  'column' => 'codecanton',
  'with_wildcard_routes' => true,
  'name' => 'bib_canton',
  'requirements' => 
  array (
  ),
)),
'sf_guard_signin' => new sfRoute('/login', array (
  'module' => 'sfGuardAuth',
  'action' => 'signin',
), array (
), array (
)),
'sf_guard_signout' => new sfRoute('/logout', array (
  'module' => 'sfGuardAuth',
  'action' => 'signout',
), array (
), array (
)),
'sf_guard_password' => new sfRoute('/request_password', array (
  'module' => 'sfGuardAuth',
  'action' => 'password',
), array (
), array (
)),
'summary' => new sfRoute('/summary/:id', array (
  'module' => 'identification',
  'action' => 'summary',
), array (
  'id' => '\\d+',
  'sf_method' => 
  array (
    0 => 'get',
  ),
), array (
)),
'export_synthese' => new sfRoute('/export/synthese/:id', array (
  'module' => 'export',
  'action' => 'synthese',
), array (
  'id' => '\\d+',
  'sf_method' => 
  array (
    0 => 'get',
  ),
), array (
)),
'export_complete' => new sfRoute('/export/complete/:id', array (
  'module' => 'export',
  'action' => 'complete',
), array (
  'id' => '\\d+',
  'sf_method' => 
  array (
    0 => 'get',
  ),
), array (
)),
'homepage' => new sfRoute('/', array (
  'module' => 'helper',
  'action' => 'index',
), array (
), array (
)),
'default_index' => new sfRoute('/:module', array (
  'action' => 'index',
), array (
), array (
)),
'default' => new sfRoute('/:module/:action/*', array (
), array (
), array (
)),
);
