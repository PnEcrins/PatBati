CREATE TABLE bib_canton (codecanton SERIAL, canton VARCHAR(50), PRIMARY KEY(codecanton));
CREATE TABLE bib_classe_archi (codeclasse SERIAL, classe VARCHAR(50), PRIMARY KEY(codeclasse));
CREATE TABLE bib_commune (codeinsee VARCHAR(1), codecanton INT NOT NULL, codesecteur INT NOT NULL, commune VARCHAR(30), PRIMARY KEY(codeinsee));
CREATE TABLE bib_conservation (codeconservation SERIAL, conservation VARCHAR(50), PRIMARY KEY(codeconservation));
CREATE TABLE bib_element_paysager (codeep SERIAL, naturels_construits VARCHAR(1), elements_paysagers VARCHAR(50), PRIMARY KEY(codeep));
CREATE TABLE bib_equipement (codeequipement SERIAL, equipement VARCHAR(50), codetypeequip INT NOT NULL, PRIMARY KEY(codeequipement));
CREATE TABLE bib_exposition (indexexposition SERIAL, nomexposition VARCHAR(2) NOT NULL, PRIMARY KEY(indexexposition));
CREATE TABLE bib_faitage (codefaitage SERIAL, faitage VARCHAR(50), PRIMARY KEY(codefaitage));
CREATE TABLE bib_finition (codefinition SERIAL, finition VARCHAR(50), PRIMARY KEY(codefinition));
CREATE TABLE bib_illustration (codeillustration SERIAL, illustration VARCHAR(50) NOT NULL, ordre_illustration INT, PRIMARY KEY(codeillustration));
CREATE TABLE bib_implantation (codepem SERIAL, pem VARCHAR(10), PRIMARY KEY(codepem));
CREATE TABLE bib_masque (codemasque SERIAL, masque VARCHAR(50), PRIMARY KEY(codemasque));
CREATE TABLE bib_materiaux_fins (codematfins SERIAL, matfins VARCHAR(50), type_matfins VARCHAR(50), PRIMARY KEY(codematfins));
CREATE TABLE bib_materiaux_ge (codematge SERIAL, matge VARCHAR(50), PRIMARY KEY(codematge));
CREATE TABLE bib_meoeuvre (codemeo SERIAL, meoeuvre VARCHAR(50), PRIMARY KEY(codemeo));
CREATE TABLE bib_nature (codenature SERIAL, nature VARCHAR(50), PRIMARY KEY(codenature));
CREATE TABLE bib_notepatri (indexnotepatri SERIAL, valnotepatri INT NOT NULL, PRIMARY KEY(indexnotepatri));
CREATE TABLE bib_personnes (codepersonne SERIAL, personne VARCHAR(50) NOT NULL, descriptif VARCHAR(100), PRIMARY KEY(codepersonne));
CREATE TABLE bib_protection (codeprotection SERIAL, protection VARCHAR(50), PRIMARY KEY(codeprotection));
CREATE TABLE bib_risquenat (coderisque SERIAL, risque VARCHAR(50), PRIMARY KEY(coderisque));
CREATE TABLE bib_secteur (codesecteur SERIAL, secteur VARCHAR(12), PRIMARY KEY(codesecteur));
CREATE TABLE bib_so (codeso SERIAL, second_oeuvre VARCHAR(50), codetypeso INT NOT NULL, PRIMARY KEY(codeso));
CREATE TABLE bib_structure (codestructure SERIAL, structure VARCHAR(50), PRIMARY KEY(codestructure));
CREATE TABLE bib_type_equipement (codetypeequip SERIAL, type_equip VARCHAR(50), PRIMARY KEY(codetypeequip));
CREATE TABLE bib_type_so (codetypeso SERIAL, type_so VARCHAR(50), PRIMARY KEY(codetypeso));
CREATE TABLE bib_usage (codeusage SERIAL, usage VARCHAR(50), PRIMARY KEY(codeusage));
CREATE TABLE demande (indexdemande SERIAL, indexbatiment INT NOT NULL, demandep BOOLEAN, autorisationp BOOLEAN, date_permis DATE, num_permis VARCHAR(50), date_demandep DATE, PRIMARY KEY(indexdemande));
CREATE TABLE elements_paysagers (indexep SERIAL, codeep INT NOT NULL, codeconservation INT NOT NULL, indexbatiment INT NOT NULL, info_ep VARCHAR(200), ep_rem BOOLEAN, PRIMARY KEY(indexep));
CREATE TABLE enquetes (indexenquete SERIAL, codepersonne INT NOT NULL, indexbatiment INT NOT NULL, date_enquete DATE, date_redaction DATE, PRIMARY KEY(indexenquete));
CREATE TABLE equipements (indexequipement SERIAL, codeequipement INT NOT NULL, codeconservation INT NOT NULL, indexbatiment INT NOT NULL, info_equip VARCHAR(200), equipement_rem BOOLEAN, PRIMARY KEY(indexequipement));
CREATE TABLE identification (indexbatiment SERIAL, codepem INT, codeclasse INT NOT NULL, codefaitage INT, codeinsee VARCHAR(5) NOT NULL, appelation VARCHAR(50), indivision BOOLEAN, proprietaire VARCHAR(150), cadastre VARCHAR(20), lieu_dit VARCHAR(100), altitude INT, x INT, y INT, situationgeo VARCHAR(200), denivelle INT, exposition INT, pente INT, capacite INT, date_insert TIMESTAMP without time zone, date_update TIMESTAMP without time zone, bat_suppr BOOLEAN DEFAULT 'false', notepatri INT, patrimonialite VARCHAR(200), info_risquenat VARCHAR(200), info_masque VARCHAR(200), PRIMARY KEY(indexbatiment));
CREATE TABLE illustration (indexilustration SERIAL, codeillustration INT NOT NULL, codepersonne INT, indexbatiment INT NOT NULL, indexajaris INT, date_illustration DATE, vignette VARCHAR(100), fichier_source VARCHAR(100), PRIMARY KEY(indexilustration));
CREATE TABLE rel_masque (codemasque INT, indexbatiment INT, PRIMARY KEY(codemasque, indexbatiment));
CREATE TABLE rel_matfins_finition (codematfins INT, codefinition INT, PRIMARY KEY(codematfins, codefinition));
CREATE TABLE rel_matge_meo (codematge INT, codemeo INT, PRIMARY KEY(codematge, codemeo));
CREATE TABLE rel_protection (indexbatiment INT, codeprotection INT, PRIMARY KEY(indexbatiment, codeprotection));
CREATE TABLE rel_recommande (codeclasse INT, codenature INT, PRIMARY KEY(codeclasse, codenature));
CREATE TABLE rel_remplace (indexstructure_ancien INT, indexstructure_nouveau INT, PRIMARY KEY(indexstructure_ancien, indexstructure_nouveau));
CREATE TABLE rel_risquenat (indexbatiment INT, coderisque INT, PRIMARY KEY(indexbatiment, coderisque));
CREATE TABLE rel_so_matfins (indexso INT, codematfins INT, codefinition INT, PRIMARY KEY(indexso, codematfins, codefinition));
CREATE TABLE rel_structures_matfins (indexstructure INT, codematfins INT, codefinition INT, PRIMARY KEY(indexstructure, codematfins, codefinition));
CREATE TABLE second_oeuvre (indexso SERIAL, indexbatiment INT NOT NULL, codeso INT NOT NULL, codeconservation INT NOT NULL, info_so VARCHAR(200), so_rem BOOLEAN, PRIMARY KEY(indexso));
CREATE TABLE structures (indexstructure SERIAL, codeconservation INT NOT NULL, codematge INT NOT NULL, codestructure INT NOT NULL, codemeo INT NOT NULL, indexbatiment INT NOT NULL, info_structure VARCHAR(200), structure_rem BOOLEAN, PRIMARY KEY(indexstructure));
CREATE TABLE travaux (indextravaux SERIAL, codeusage INT NOT NULL, codenature INT NOT NULL, indexdemande INT NOT NULL, date_travaux DATE, autorisation BOOLEAN, subvention_pne INT, PRIMARY KEY(indextravaux));
CREATE TABLE sf_guard_group (id SERIAL, name VARCHAR(255) UNIQUE, description VARCHAR(1000), created_at TIMESTAMP without time zone, updated_at TIMESTAMP without time zone, PRIMARY KEY(id));
CREATE TABLE sf_guard_group_permission (group_id INT, permission_id INT, created_at TIMESTAMP without time zone, updated_at TIMESTAMP without time zone, PRIMARY KEY(group_id, permission_id));
CREATE TABLE sf_guard_permission (id SERIAL, name VARCHAR(255) UNIQUE, description VARCHAR(1000), created_at TIMESTAMP without time zone, updated_at TIMESTAMP without time zone, PRIMARY KEY(id));
CREATE TABLE sf_guard_remember_key (id SERIAL, user_id INT, remember_key VARCHAR(32), ip_address VARCHAR(50), created_at TIMESTAMP without time zone, updated_at TIMESTAMP without time zone, PRIMARY KEY(id, ip_address));
CREATE TABLE sf_guard_user (id SERIAL, username VARCHAR(128) NOT NULL UNIQUE, algorithm VARCHAR(128) DEFAULT 'sha1' NOT NULL, salt VARCHAR(128), password VARCHAR(128), is_active BOOLEAN DEFAULT 'true', is_super_admin BOOLEAN DEFAULT 'false', last_login TIMESTAMP without time zone, created_at TIMESTAMP without time zone, updated_at TIMESTAMP without time zone, PRIMARY KEY(id));
CREATE TABLE sf_guard_user_group (user_id INT, group_id INT, created_at TIMESTAMP without time zone, updated_at TIMESTAMP without time zone, PRIMARY KEY(user_id, group_id));
CREATE TABLE sf_guard_user_permission (user_id INT, permission_id INT, created_at TIMESTAMP without time zone, updated_at TIMESTAMP without time zone, PRIMARY KEY(user_id, permission_id));
CREATE INDEX is_active_idx ON sf_guard_user (is_active);
ALTER TABLE bib_commune ADD FOREIGN KEY (codesecteur) REFERENCES bib_secteur(codesecteur) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE bib_commune ADD FOREIGN KEY (codecanton) REFERENCES bib_canton(codecanton) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE bib_equipement ADD FOREIGN KEY (codetypeequip) REFERENCES bib_type_equipement(codetypeequip) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE bib_so ADD FOREIGN KEY (codetypeso) REFERENCES bib_type_so(codetypeso) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE demande ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE elements_paysagers ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE elements_paysagers ADD FOREIGN KEY (codeep) REFERENCES bib_element_paysager(codeep) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE elements_paysagers ADD FOREIGN KEY (codeconservation) REFERENCES bib_conservation(codeconservation) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE enquetes ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE enquetes ADD FOREIGN KEY (codepersonne) REFERENCES bib_personnes(codepersonne) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE equipements ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE equipements ADD FOREIGN KEY (codeequipement) REFERENCES bib_equipement(codeequipement) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE equipements ADD FOREIGN KEY (codeconservation) REFERENCES bib_conservation(codeconservation) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE identification ADD FOREIGN KEY (notepatri) REFERENCES bib_notepatri(indexnotepatri) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE identification ADD FOREIGN KEY (exposition) REFERENCES bib_exposition(indexexposition) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE identification ADD FOREIGN KEY (codepem) REFERENCES bib_implantation(codepem) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE identification ADD FOREIGN KEY (codeinsee) REFERENCES bib_commune(codeinsee) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE identification ADD FOREIGN KEY (codefaitage) REFERENCES bib_faitage(codefaitage) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE identification ADD FOREIGN KEY (codeclasse) REFERENCES bib_classe_archi(codeclasse) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE illustration ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE illustration ADD FOREIGN KEY (codepersonne) REFERENCES bib_personnes(codepersonne) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE illustration ADD FOREIGN KEY (codeillustration) REFERENCES bib_illustration(codeillustration) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_masque ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) ON DELETE cascade NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_masque ADD FOREIGN KEY (codemasque) REFERENCES bib_masque(codemasque) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_matfins_finition ADD FOREIGN KEY (codematfins) REFERENCES bib_materiaux_fins(codematfins) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_matfins_finition ADD FOREIGN KEY (codefinition) REFERENCES bib_finition(codefinition) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_matge_meo ADD FOREIGN KEY (codemeo) REFERENCES bib_meoeuvre(codemeo) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_matge_meo ADD FOREIGN KEY (codematge) REFERENCES bib_materiaux_ge(codematge) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_protection ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) ON DELETE cascade NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_protection ADD FOREIGN KEY (codeprotection) REFERENCES bib_protection(codeprotection) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_recommande ADD FOREIGN KEY (codenature) REFERENCES bib_nature(codenature) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_recommande ADD FOREIGN KEY (codeclasse) REFERENCES bib_classe_archi(codeclasse) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_remplace ADD FOREIGN KEY (indexstructure_nouveau) REFERENCES structures(indexstructure) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_remplace ADD FOREIGN KEY (indexstructure_ancien) REFERENCES structures(indexstructure) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_risquenat ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) ON DELETE cascade NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_risquenat ADD FOREIGN KEY (coderisque) REFERENCES bib_risquenat(coderisque) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_so_matfins ADD FOREIGN KEY (indexso) REFERENCES second_oeuvre(indexso) ON DELETE cascade NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_so_matfins ADD FOREIGN KEY (codematfins) REFERENCES bib_materiaux_fins(codematfins) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_so_matfins ADD FOREIGN KEY (codefinition) REFERENCES bib_finition(codefinition) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_structures_matfins ADD FOREIGN KEY (indexstructure) REFERENCES structures(indexstructure) ON DELETE cascade NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_structures_matfins ADD FOREIGN KEY (codematfins) REFERENCES bib_materiaux_fins(codematfins) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE rel_structures_matfins ADD FOREIGN KEY (codefinition) REFERENCES bib_finition(codefinition) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE second_oeuvre ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE second_oeuvre ADD FOREIGN KEY (codeso) REFERENCES bib_so(codeso) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE second_oeuvre ADD FOREIGN KEY (codeconservation) REFERENCES bib_conservation(codeconservation) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE structures ADD FOREIGN KEY (indexbatiment) REFERENCES identification(indexbatiment) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE structures ADD FOREIGN KEY (codestructure) REFERENCES bib_structure(codestructure) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE structures ADD FOREIGN KEY (codemeo) REFERENCES bib_meoeuvre(codemeo) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE structures ADD FOREIGN KEY (codematge) REFERENCES bib_materiaux_ge(codematge) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE structures ADD FOREIGN KEY (codeconservation) REFERENCES bib_conservation(codeconservation) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE travaux ADD FOREIGN KEY (indexdemande) REFERENCES demande(indexdemande) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE travaux ADD FOREIGN KEY (codeusage) REFERENCES bib_usage(codeusage) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE travaux ADD FOREIGN KEY (codenature) REFERENCES bib_nature(codenature) NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE sf_guard_group_permission ADD FOREIGN KEY (permission_id) REFERENCES sf_guard_permission(id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE sf_guard_group_permission ADD FOREIGN KEY (group_id) REFERENCES sf_guard_group(id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE sf_guard_remember_key ADD FOREIGN KEY (user_id) REFERENCES sf_guard_user(id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE sf_guard_user_group ADD FOREIGN KEY (user_id) REFERENCES sf_guard_user(id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE sf_guard_user_group ADD FOREIGN KEY (group_id) REFERENCES sf_guard_group(id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE sf_guard_user_permission ADD FOREIGN KEY (user_id) REFERENCES sf_guard_user(id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE sf_guard_user_permission ADD FOREIGN KEY (permission_id) REFERENCES sf_guard_permission(id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE;
