#!/usr/bin/env python2

import sys,os
import commands
import urllib,re

cookies_file='./profile/cookies4.dat'

if os.path.exists(commands.getoutput('which urxvt')):
    terminal='urxvtc'
else:
    terminal='xterm'

cwdpath=os.path.realpath(sys.argv[0])[0:os.path.realpath(sys.argv[0]).rfind(os.sep)+1]
argv_t=sys.argv[1].lstrip('mplayer:').split(',')
url=argv_t[0]
referrer=argv_t[1]


if 'songtaste' in url or 'rayfile' in url or 'duomi' in url:
    os.system('python2 '+cwdpath+'cookies.py '+cookies_file+' /tmp/cookies_byopera.txt')
    os.system('notify-send '+url)
    # -cookies-file /tmp/cookies_byopera.txt 
    str_run=terminal+' -geometry 80x20 -e '
    str_run+='mplayer -referrer "'+referrer+'" -cookies-file "/tmp/cookies_byopera.txt" -cache 64 "'+url+'"'
    print(str_run)
    os.system(str_run)
    sys.exit()


#def getMediaURL(URL):
    #urlobj=urllib.urlopen("http://www.flvcd.com/parse.php?kw="+URL)
    #urlcnt=urlobj.read()
    #cnt_match=re.findall(r"(?<=\<U\>).*(?=\n)",urlcnt)
    #return cnt_match

str_run='./bin/mplayer-flv.sh "'+url+'" "'+referrer+'"'
#playlist=' '.join(getMediaURL(url))
#os.system('notify-send "'+playlist+'"')
#str_run='mplayer -slave -force-window-position -referrer "'+referrer+'" -cookies-file "/tmp/cookies_byopera.txt" -really-quiet -cache 128 "'+playlist+'"'
os.system(str_run)

