#!/bin/bash

BASE_DIR=`dirname $0`

echo ""

echo "Killing Rails server if already running..."
#UNIX piping is insane/great!
ps aux | grep -i "rails s" | grep -iv grep | awk {'print $2'} | xargs kill