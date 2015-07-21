Cloner le dépot
ajouter les répertoire cache et log à la racine du projet
cd /chemin/vers/patrimoine_bati
mkdir cache
mkdir log
chmod 777 cache
chmod 777 log

donner les droits d'écriture sur les répertoires dans uploads pour permettre l'envoie de fichiers depuis l'interface de l'application
chmod 777 web/uploads/documents
chmod 777 web/uploads/images
chmod 777 web/uploads/pdf
chmod 777 web/uploads/assets
