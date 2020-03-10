#!/bin/bash

# Start local wb server to serve test xml.
http-server ./data &

# Set env variable and run tests.
env TESTING=1 mocha

# Shut down test server
pid=$(ps | grep http-server | head -n 1 | awk '{print $1}')
kill -9 $pid