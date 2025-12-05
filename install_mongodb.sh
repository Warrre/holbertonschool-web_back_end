#!/bin/bash
# Install the missing libssl1.1 dependency
echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.list
sudo apt update
sudo apt install -y libssl1.1
sudo rm /etc/apt/sources.list.d/focal-security.list
sudo apt update

# Add the MongoDB 4.4 repository and key
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update

# Install MongoDB 4.4 packages
sudo apt install -y mongodb-org

# Prepare required directories and permissions
sudo mkdir -p /var/lib/mongodb /var/log/mongodb
sudo chown -R mongodb:mongodb /var/lib/mongodb /var/log/mongodb

# Start mongod
sudo -u mongodb /usr/bin/mongod --config /etc/mongod.conf &

# Verification
mongod --version
