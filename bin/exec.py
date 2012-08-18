#!/usr/bin/env python2

import sys,os

if not sys.argv:
    sys.exit()
    
if "goagent" in sys.argv[1]:
    os.system("/opt/goagent/proxy.py")

