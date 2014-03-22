#!/bin/bash

BASE_DIR=`dirname $0`

echo ""

$BASE_DIR/rails-stop-server.sh

echo "Resetting database fixtures for testing..."
rake db:migrate:reset db:fixtures:load

echo "Starting Rails server in background..."
rails s > rails-server-log.txt &

