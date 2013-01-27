#!/usr/bin/env python2
#coding=utf-8
import sys,os
import subprocess
import time

#print(sys.argv[:])

tran_info = sys.argv[1].strip("\"").split("\n")

From = tran_info[0].lstrip("From: ")
To = tran_info[1].lstrip("To: ").decode('latin-1')#.encode('utf-8')
#time.sleep(33)
#sss = sys.argv[1].split("\n")[1][4:]
#fp = open("/tmp/tt.txt", 'w')
#fp.write(repr(tran_info))
#fp.close()
#exit()

print From, To
#time.sleep(22)
os.system("python2 ./bin/cookies.py ./profile/cookies4.dat /tmp/cookies.txt")
if not os.access("/tmp/cookies.txt", os.R_OK):
  os.system("notify-send cookies.txt didn't exist")
  exit()
else:
  os.system("notify-send started")
  #d_dir = os.path.dirname(To)
  #d_file = os.path.basename(To)
  subprocess.call(['./bin/aria2x_acc.sh', From, To])
  #subprocess.poll()
  #os.system("exo-open --launch TerminalEmulator ./bin/aria2x_acc.sh \"" +
            #From + '\" \"' + To + '\"')

print(">>> Download done")
time.sleep(999999)

#filename=sys.argv[1].split("\n")[1][4:]
#os.remove(filename)
#os.system('notify-send "rm '+str(filename)+'"')

