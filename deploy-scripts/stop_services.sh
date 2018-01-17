#!/bin/bash
sudo /etc/init.d/mongod stop
# Stop Server and Client
# Uses pm2 kill
sudo /etc/init.d/morpheus-server kill
