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
sudo npm install --production || { echo 'npm install failed' ; exit 1; }
sudo chown -R ec2-user:ec2-user node_modules

# Configure client
sudo mv /tmp/morpheus-deploy/* $APP_CLIENT_DIR
sudo rm -rf $APP_CLIENT_DIR/deploy-scripts
sudo rm -rf $APP_CLIENT_DIR/appspec.yml

sudo chown -R ec2-user:ec2-user $APP_CLIENT_DIR
cd $APP_CLIENT_DIR
sudo npm install serve
sudo chown -R ec2-user:ec2-user node_modules

# TODO: add some log rotate

# Sleep for a bit and then check if everything is up and running
sleep 2

# echo "Tagging instance with appropriate version"
# INSTANCE=$(ec2-metadata -i| sed -En 's/^instance-id: (.*)/\1/p')
# VERSION=$(cat /opt/image-resizer/package.json |jq -r .version)
# ec2-create-tags $INSTANCE -t "ynap:instance-version=$VERSION" --region="eu-west-1"

echo 'After Install complete!'