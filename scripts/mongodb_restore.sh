#!/bin/bash

DB_NAME=theplandb

aws s3 cp --recursive s3://morpheus-app/db-backups/$DB_NAME-$dt /tmp/$DB_NAME-backup

mongorestore /tmp/$DB_NAME-backup

rm -rf /tmp/$DB_NAME-backup

