#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "***** Angular End-to-End (e2e) Tests - Using Selenium, Protractor, Jasmine, Chrome or PhantomJS *****"
echo "-------------------------------------------------------------------"

$BASE_DIR/../server_scripts/rails-stop-server.sh
$BASE_DIR/../server_scripts/rails-db-reset.sh
$BASE_DIR/../server_scripts/rails-start-server.sh
$BASE_DIR/../server_scripts/selenium-start-server.sh

echo "Running e2e tests..."
$BASE_DIR/../node_modules/protractor/bin/protractor $BASE_DIR/../test/angular/config/protractor.conf.js

$BASE_DIR/../server_scripts/selenium-stop-server.sh
$BASE_DIR/../server_scripts/rails-stop-server.sh
$BASE_DIR/../server_scripts/rails-db-reset.sh
