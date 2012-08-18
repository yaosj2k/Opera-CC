#!/usr/bin/env python2
import sys
import base64
link_thunder=sys.argv[1]
if link_thunder.find('thunder://')==0:
    url=base64.decodestring(link_thunder[10:])[2:-2]
print(url)
import os
os.system("zenity --info --text="+url)
