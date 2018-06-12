#!/bin/bash

DB_NAME=theplandb

mongodump --db $DB_NAME

dt=$(date '+%d%m%Y-%H:%M');

aws s3 cp --recursive dump/$DB_NAME s3://morpheus-app/db-backups/$DB_NAME-$dt

rm -rf dump