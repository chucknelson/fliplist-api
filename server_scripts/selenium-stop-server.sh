echo "Stopping selenium..."
ps aux | grep -i "node" | grep -iv grep | grep -iv java | awk {'print $2'} | xargs kill -9
ps aux | grep -i "java" | grep -iv grep | awk {'print $2'} | xargs kill -9