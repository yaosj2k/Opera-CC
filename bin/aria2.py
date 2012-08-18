#!/usr/bin/env python2

import sys
import os

## accept follow!
#dl://http://xunlei referrer
#http:// referrer

print("download",sys.argv[1],sys.argv[2])
os.system("notify-send '"+sys.argv[1]+"'")
os.system("python2 ./bin/cookies.py ./profile/cookies4.dat /tmp/cookies.txt")
if "dl:" in sys.argv[1]:
    os.system("urxvtc -geometry 80x20 -e ./bin/aria2xunlei.py '"+sys.argv[1]+"'")
if "http://" in sys.argv[1] :
    print("start download!")
    os.system("urxvtc -geometry 80x20 -e ./bin/aria2x.sh "+sys.argv[1]+" "+sys.argv[2])
