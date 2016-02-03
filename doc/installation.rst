Cloner le dépot.

Créer les répertoires ``cache`` et ``log`` à la racine du projet et en modifier les droits :

- cd /chemin/vers/patrimoine_bati
- mkdir cache
- mkdir log
- chmod 777 cache
- chmod 777 log

Donner les droits d'écriture sur les répertoires dans ``uploads`` pour permettre le chargement de fichiers depuis l'interface de l'application :

- chmod 777 web/uploads/documents
- chmod 777 web/uploads/images
- chmod 777 web/uploads/pdf
- chmod 777 web/uploads/assets

Créer la base de données à partir du fichier ``https://github.com/PnEcrins/PatBati/blob/master/data/sql/schema.sql``.

Copier le fichier ``config/databases.yml.sample`` en ``databases.yml``.

Mettre à jour les paramètres d'accès à votre base de données dans ``config/databases.yml``.
