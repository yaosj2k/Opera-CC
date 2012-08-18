#/bin/bash
# Latest Version 2010.07.22
# See ChangeLog 2008-09-12

flv_web_addr=$(echo "$1" | sed 's/^http:\/\([a-z0-9]\)/http:\/\/\1/')

#songtaste=$(echo $1 |grep "songtaste.com" -o)
#if [ $songtaste == "songtaste.com" ]
#	then
#	xterm -e mplayer $1
#	exit
#fi
wget -O /tmp/flv-search-result.txt http://www.flvcd.com/parse.php?kw=$1
python2 ./bin/cookies.py ./profile/cookies4.dat /tmp/cookies_byopera.txt
grep "<U>" /tmp/flv-search-result.txt | sed s/\<U\>//g | xargs notify-send

grep "<U>" /tmp/flv-search-result.txt | sed s/\<U\>//g | mplayer -slave -really-quiet -cookies-file "/tmp/cookies_byopera.txt" -playlist -

rm -f /tmp/flv-search-result.txt
