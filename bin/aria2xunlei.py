#!/usr/bin/env python2

import sys
import os,time

cookies_file='/tmp/cookies.txt'

print(sys.argv[1])

argv_t=sys.argv[1].lstrip('dl:').split(',',3)

download_url=argv_t[0]
download_referrer=argv_t[1]

run_d="aria2c --load-cookies="+cookies_file+" -c '"+download_url+"' --on-download-complete bin/aria2-com.py -d $HOME/Downloads -s5 -x5 --referer='"+download_referrer+"'"

print(run_d)
os.system(run_d)
time.sleep(1)
raw_input("press anykey to continue:")
