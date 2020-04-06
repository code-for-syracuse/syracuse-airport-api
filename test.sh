#!/bin/bash

# Start local web server to serve test xml.
php -S 127.0.0.1:8080 -t ./data &

# Set env variable and run tests.
TESTING=1 ./node_modules/mocha/bin/mocha

# Shut down test server
pid=$(ps | grep php | head -n 1 | awk '{print $1}')
kill -9 $pid