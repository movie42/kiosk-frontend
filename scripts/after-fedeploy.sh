#!/bin/bash

sudo cp -rf /home/ubuntu/deploy/client/* /home/ubuntu/client/ && rm -rf /home/ubuntu/deploy/client/
sudo service nginx reload

echo "> Nginx reloaded"