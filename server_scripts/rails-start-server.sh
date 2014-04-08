#!/bin/bash

BASE_DIR=`dirname $0`

echo ""

$BASE_DIR/rails-stop-server.sh

echo "Starting Rails server in background..."
rails s > log/rails-server.log &

