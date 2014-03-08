#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "***** Running ALL Tests (Rails, Angular Unit, Angular End-to-End) *****"

$BASE_DIR/test-rails.sh
$BASE_DIR/test-angular-unit.sh
$BASE_DIR/test-angular-e2e.sh
