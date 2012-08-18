#!/bin/bash
aria2c --load-cookies=/tmp/cookies.txt -c $1 -d $HOME/Downloads -s5 -x5 --referer=$2
read -p "Press Enter to Continue "
