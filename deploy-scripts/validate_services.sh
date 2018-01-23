#!/bin/bash

function testService() {
    service="$1"
    if (( $(ps -ef | grep -v grep | grep $service | wc -l) > 0 ))
    then
        echo "$service is running"
    else
        echo "$service failed to start"
        exit 1
    fi
}

# Check if we have all four services are running
testService "mongod"
testService "nginx"
testService "server.js"
testService "Serve"