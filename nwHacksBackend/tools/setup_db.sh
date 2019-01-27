#!/bin/bash

# Catch keyboard interrupt
trap bashtrap INT
bashtrap()
{
    echo "Keyboard interrupt detected. Aborting..."
    exit 1
}

echo "CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';" | mysql -u root -p
echo "CREATE DATABASE rideshare;" | mysql -u root -p
echo "GRANT ALL PRIVILEGES ON rideshare.* TO 'admin'@'localhost';" | mysql -u root -p