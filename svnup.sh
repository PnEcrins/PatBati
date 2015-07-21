#!/bin/sh
cd /var/www/ecrins
echo "Update";
svn update apps/ lib/ plugins/ sql/ web/ config/doctrine/schema.yml
./symfony cc
echo "Done"
