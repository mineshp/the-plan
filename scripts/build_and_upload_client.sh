#!/bin/bash

VERSION=""

usage() {
  echo "--profile is required"
  echo "--app-name is required"
  echo "--deploy-bucket is required"
  echo "--version is required"
  exit $1
}

while [[ $# > 0 ]]
do
  key="$1"

  case $key in
      -p|--profile)
      PROFILE="$2"
      shift
    ;;
      -a|--app-name)
      APP_NAME="$2"
      shift
    ;;
     -b|--deploy-bucket)
     DEPLOY_BUCKET="$2"
     shift
    ;;
     -v|--version)
     VERSION="$2"
     shift
    ;;
  esac
  shift
done

if [ -z "$PROFILE" ]; then
  usage 4
fi

if [ -z "$APP_NAME" ]; then
  usage 4
fi

if [ -z "$DEPLOY_BUCKET" ]; then
  usage 4
fi

if [ -z "$VERSION" ]; then
  usage 4
fi

echo 'Build and upload client code'

rm -rf build
rm -rf morpheus-app-*
rm -rf deployments

APP_VERSION_NAME=morpheus-app-$VERSION
TEMP_DEPLOY_FOLDER=deployments/$APP_VERSION_NAME
mkdir -p $TEMP_DEPLOY_FOLDER

# App package libraries
cp package.json $TEMP_DEPLOY_FOLDER
cp yarn.lock $TEMP_DEPLOY_FOLDER
npm run build
sleep 2
cp -R build $TEMP_DEPLOY_FOLDER

# cp -R public $TEMP_DEPLOY_FOLDER

# Code Deploy
cp appspec.yml $TEMP_DEPLOY_FOLDER
cp -R deploy-scripts $TEMP_DEPLOY_FOLDER
cp -R scripts/mongodb_backup.sh $TEMP_DEPLOY_FOLDER
cp -R scripts/mongodb_restore.sh $TEMP_DEPLOY_FOLDER

# Client App code
cp client-pm2.json $TEMP_DEPLOY_FOLDER
# cp -R src $TEMP_DEPLOY_FOLDER

# Server App code
mkdir $TEMP_DEPLOY_FOLDER/server
mkdir $TEMP_DEPLOY_FOLDER/server/export
cp -R server/config $TEMP_DEPLOY_FOLDER/server
rm $TEMP_DEPLOY_FOLDER/server/config/testSetup.js
cp -R server/dynamodb $TEMP_DEPLOY_FOLDER/server
cp -R server/mongodb $TEMP_DEPLOY_FOLDER/server
cp -R server/export/templates $TEMP_DEPLOY_FOLDER/server/export
cp -R server/export/pdf.js $TEMP_DEPLOY_FOLDER/server/export
cp -R server/middlewares $TEMP_DEPLOY_FOLDER/server/middlewares
cp -R server/app.js $TEMP_DEPLOY_FOLDER/server
cp -R server/server.js $TEMP_DEPLOY_FOLDER/server
cp -R server/package.json $TEMP_DEPLOY_FOLDER/server

echo $APP_VERSION_NAME
APP_ZIP_NAME=$APP_VERSION_NAME.zip
cd $TEMP_DEPLOY_FOLDER
zip -r $APP_ZIP_NAME .

aws s3 cp $APP_ZIP_NAME s3://$DEPLOY_BUCKET/deployments/