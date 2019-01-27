#!/bin/bash

# Catch keyboard interrupt
trap bashtrap INT
bashtrap()
{
    echo "Keyboard interrupt detected. Aborting..."
    exit 1
}

# Make sure script is run as root
if [ "${EUID}" -ne 0 ]; then
    echo "Error: Please run with root."
    exit 1
fi

echo "CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';" | mysql -u root -p
echo "CREATE DATABASE rideshare;" | mysql -u root -p
echo "GRANT ALL PRIVILEGES ON rideshare.* TO 'admin'@'localhost';" | mysql -u root -p