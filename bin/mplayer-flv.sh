#/bin/bash
# Latest Version 2012.09.16

flv_web_addr=$(echo "$1" | sed 's/^http:\/\([a-z0-9]\)/http:\/\/\1/')
[[ $2 ]] && referrer=$2

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

notify-send "$media_url"
case "$1" in
  *tudou*)
  wget --referer="$referrer" --load-cookies /tmp/cookies_byopera.txt -O - $media_url | mplayer -force-window-position -really-quiet -cache 1024 -
  ;;

  *)
  echo "$media_url" | mplayer -referrer $referrer -slave -force-window-position -cache 1024 -really-quiet -cookies-file "/tmp/cookies_byopera.txt" -playlist -
  ;;
esac

# end
rm -f /tmp/flv-search-result.txt
