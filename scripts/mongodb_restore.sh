#!/bin/bash

DB_NAME=theplandb

LATEST_DB_BACKUP_FOLDER=`aws s3 ls s3://morpheus-app/db-backups/ --query "sort_by(Contents,&LastModified)" | tail -2 | head -1 | awk '{print $2}'`

aws s3 cp --recursive s3://morpheus-app/db-backups/$LATEST_DB_BACKUP_FOLDER /tmp/$LATEST_DB_BACKUP_FOLDER
echo "Retrieved latest db backup from S3 - $LATEST_DB_BACKUP_FOLDER"

# --drop - drops the collection in the backup
# -d - dbname
mongorestore --drop -d $DB_NAME /tmp/$LATEST_DB_BACKUP_FOLDER
echo "Restored latest db backup for db $DB_NAME"

rm -rf /tmp/$LATEST_DB_BACKUP_FOLDER