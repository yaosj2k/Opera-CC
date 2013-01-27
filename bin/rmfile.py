#!/usr/bin/env python2

import sys,os
import subprocess,time
print(sys.argv[:])


filename=sys.argv[1].split("\n")[1][4:]
filename = filename.decode("latin-1")
os.remove(filename)

cmd = ['rm -f', filename]
subprocess.call(cmd)
#os.system('notify-send "rm '+str(filename)+'"')
