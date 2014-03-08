#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "***** Angular Unit Tests - Using Karma, Jasmine, PhantomJS *****"
echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

$BASE_DIR/../node_modules/karma/bin/karma start $BASE_DIR/../test/angular/config/karma.conf.js