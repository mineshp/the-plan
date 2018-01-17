#!/bin/bash
APP_CLIENT_DIR="/opt/$APPLICATION_NAME-client/"
APP_SERVER_DIR="/opt/$APPLICATION_NAME-server/"

sudo /etc/init.d/mongod start
echo "MongoDB server running"

# Install Server
sudo /etc/init.d/morpheus-server start

# # # Install Client
sudo /etc/init.d/morpheus-server start