Cloner le d�pot
ajouter les r�pertoire cache et log � la racine du projet
cd /chemin/vers/patrimoine_bati
mkdir cache
mkdir log
chmod 777 cache
chmod 777 log

donner les droits d'�criture sur les r�pertoires dans uploads pour permettre l'envoie de fichiers depuis l'interface de l'application
chmod 777 web/uploads/documents
chmod 777 web/uploads/images
chmod 777 web/uploads/pdf
chmod 777 web/uploads/assets

Copier le fichier config/databases.yml.sample en databases.yml
Mettre � jour les param�tres d'acc�s � la base de donn�es dans config/databases.yml
