#!/bin/bash

sudo cp -r /home/ubuntu/deploy/client/ /home/ubuntu/client/ && rm -rf /home/ubuntu/deploy/client/
sudo service nginx reload

echo "> Nginx reloaded"