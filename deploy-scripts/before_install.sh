#!/bin/bash

APP_CLIENT_NAME="$APPLICATION_NAME-client"
APP_SERVER_NAME="$APPLICATION_NAME-server"

APP_CLIENT_DIR="/opt/$APPLICATION_NAME-client/"
APP_SERVER_DIR="/opt/$APPLICATION_NAME-server/"

CLIENT_USER=$APP_CLIENT_NAME
SERVER_USER=$APP_SERVER_NAME
sudo adduser $CLIENT_USER
sudo adduser $SERVER_USER

if [ -d $APP_CLIENT_DIR ]
then
 rm -rf $APP_CLIENT_DIR
fi

if [ -d $APP_SERVER_DIR ]
then
 rm -rf $APP_SERVER_DIR
fi

mkdir -p $APP_CLIENT_DIR
mkdir -p $APP_SERVER_DIR

touch /var/log/$APP_CLIENT_NAME.log
sudo chown $CLIENT_USER:$CLIENT_USER /var/log/$APP_CLIENT_NAME.log

touch /var/log/$APP_SERVER_NAME.log
sudo chown $SERVER_USER:$SERVER_USER /var/log/$APP_SERVER_NAME.log