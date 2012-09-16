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

# get media_url
wget -O /tmp/flv-search-result.txt http://www.flvcd.com/parse.php?kw=$1
media_url=$(grep "<U>" /tmp/flv-search-result.txt | sed s/\<U\>//g)

# exit if nothing
[[ -z $media_url ]] && notify-send "no media on this page" && exit

# export cookies
python2 ./bin/cookies.py ./profile/cookies4.dat /tmp/cookies_byopera.txt

case "$1" in
  *youku*)
  echo "$media_url" | mplayer -slave -cache 1024 -really-quiet -cookies-file "/tmp/cookies_byopera.txt" -playlist -
  ;;

  *)
  wget --load-cookies /tmp/cookies_byopera.txt -O - $media_url | mplayer -really-quiet -cache 1024 -
  ;;
esac

# end
rm -f /tmp/flv-search-result.txt
