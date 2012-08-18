#!/usr/bin/python2
# -*- coding: utf-8 -*-
import urllib,sys,os

sFileName=sys.argv[3]
toFileName_gb18030=urllib.unquote_plus(sFileName)
toFileName_utf8_unic=toFileName_gb18030.decode("gb18030")
print toFileName_utf8_unic.encode("utf-8")
if sFileName!=toFileName_utf8_unic.encode("utf-8"):
    os.rename(sFileName,toFileName_utf8_unic)
