#!/bin/bash

# Mongodb running
sudo /etc/init.d/mongod start

# Restart nginx
sudo service nginx reload

# Install Server
sudo /etc/init.d/morpheus-server start

# # # Install Client
sudo /etc/init.d/morpheus-client start