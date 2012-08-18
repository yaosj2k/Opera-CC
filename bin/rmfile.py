#!/usr/bin/env python2

import sys,os

print(sys.argv[:])
filename=sys.argv[1].split("\n")[1][4:]
os.remove(filename)
os.system('notify-send "rm '+str(filename)+'"')
