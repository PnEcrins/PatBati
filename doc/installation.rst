Cloner le d�pot.

Cr�er les r�pertoires ``cache`` et ``log`` � la racine du projet et en modifier les droits :

- cd /chemin/vers/patrimoine_bati
- mkdir cache
- mkdir log
- chmod 777 cache
- chmod 777 log

Donner les droits d'�criture sur les r�pertoires dans ``uploads`` pour permettre le chargement de fichiers depuis l'interface de l'application :

- chmod 777 web/uploads/documents
- chmod 777 web/uploads/images
- chmod 777 web/uploads/pdf
- chmod 777 web/uploads/assets

Cr�er la base de donn�es � partir du fichier ``https://github.com/PnEcrins/PatBati/blob/master/data/sql/schema.sql``.

Copier le fichier ``config/databases.yml.sample`` en ``databases.yml``.

Mettre � jour les param�tres d'acc�s � votre base de donn�es dans ``config/databases.yml``.
