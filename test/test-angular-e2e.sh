#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "***** Angular End-to-End (e2e) Tests - Using Protractor, Jasmine, Chrome or PhantomJS *****"
echo "-------------------------------------------------------------------"

$BASE_DIR/../rails-reset-and-start.sh

echo "Running e2e tests..."
$BASE_DIR/../node_modules/protractor/bin/protractor $BASE_DIR/../test/angular/config/protractor.conf.js

$BASE_DIR/../rails-stop-server.sh