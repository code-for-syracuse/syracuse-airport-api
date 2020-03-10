#!/bin/bash

# Start local wb server to serve test xml.
./node_modules/http-server/bin/http-server ./data &

# Set env variable and run tests.
TESTING=1 ./node_modules/mocha/bin/mocha

# Shut down test server
pid=$(ps | grep http-server | head -n 1 | awk '{print $1}')
kill -9 $pid