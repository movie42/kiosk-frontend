#!/bin/bash

sudo cp /home/ubuntu/deploy/client /home/ubuntu/client
sudo rm -rf /home/ubuntu/deploy/client
sudo service nginx reload

echo "> Nginx reloaded"