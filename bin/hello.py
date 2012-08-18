#!/usr/bin/env python2
import sys,os

print(sys.argv[:])
cwdpath=os.path.realpath(sys.argv[0])[0:os.path.realpath(sys.argv[0]).rfind(os.sep)+1]
filename=sys.argv[1].split("\n")[1][4:]
os.system('notify-send "'+str(filename)+'"')
