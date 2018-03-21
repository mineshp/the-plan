#!/bin/bash

APP_CLIENT_NAME="$APPLICATION_NAME-client"
APP_SERVER_NAME="$APPLICATION_NAME-server"

APP_CLIENT_DIR="/opt/$APPLICATION_NAME-client/"
APP_SERVER_DIR="/opt/$APPLICATION_NAME-server/"

CLIENT_USER=$APP_CLIENT_NAME
SERVER_USER=$APP_SERVER_NAME

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

touch /var/log/morpheus-client-error.log
touch /var/log/morpheus-client-output.log