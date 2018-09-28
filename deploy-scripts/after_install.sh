#!/bin/bash

if [ -z "$APPLICATION_NAME" ]; then
    APPLICATION_NAME="morpheus"
fi

APP_CLIENT_NAME=$APPLICATION_NAME-client
APP_SERVER_NAME=$APPLICATION_NAME-server

APP_CLIENT_DIR="/opt/$APPLICATION_NAME-client/"
APP_SERVER_DIR="/opt/$APPLICATION_NAME-server/"

# Configure server
sudo mv /tmp/morpheus-deploy/server/* $APP_SERVER_DIR
sudo rm -rf /tmp/morpheus-deploy/server
sudo chown -R ec2-user:ec2-user $APP_SERVER_DIR
cd $APP_SERVER_DIR
sudo npm install pm2 -g
sudo chown -R ec2-user:ec2-user node_modules

# Run script to install server modules
cd /home/ec2-user
./fix-morpheus-server.sh

# Configure client
sudo mv /tmp/morpheus-deploy/* $APP_CLIENT_DIR
sudo rm -rf $APP_CLIENT_DIR/deploy-scripts
sudo rm -rf $APP_CLIENT_DIR/appspec.yml

sudo chown -R ec2-user:ec2-user $APP_CLIENT_DIR
cd $APP_CLIENT_DIR
sudo npm install serve
sudo chown -R ec2-user:ec2-user node_modules

#### CRON ####

## 1. Backup MongoDB every 6 hours to S3 ##
chmod +x $APP_CLIENT_DIR/mongodb_backup.sh
chmod +x $APP_CLIENT_DIR/mongodb_restore.sh

echo "*** Add mongodb database restore script to cronjob"
cat > /etc/cron.d/database-backups <<EOL
#!/bin/bash
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=""
0 */6 * * * root /opt/morpheus-client/mongodb_backup.sh >> /var/log/mongodb_backup.log 2>&1
EOL

#### END OF CRON ####

# TODO: add some log rotate

# Sleep for a bit you have worked hard, and then check if everything is up and running
sleep 2

echo 'After Install complete!'