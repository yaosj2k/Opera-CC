#!/bin/bash

DOWN_URL="$1"
REF="$2"
COOKIES="/tmp/cookies.txt"
# get filename from the url and convert some hex codes
# i hate spaces in filenames so i'm switching them
# with underscores here, adjust the first s///g if
# you want to keep the spaces
FILE="$(basename $DOWN_URL | sed -r \
's/[_%]20/\_/g;s/[_%]22/\"/g;s/[_%]23/\#/g;s/[_%]24/\$/g;
s/[_%]25/\%/g;s/[_%]26/\&/g;s/[_%]28/\(/g;s/[_%]29/\)/g;
s/[_%]2C/\,/g;s/[_%]2D/\-/g;s/[_%]2E/\./g;s/[_%]2F/\//g;
s/[_%]3C/\</g;s/[_%]3D/\=/g;s/[_%]3E/\>/g;s/[_%]3F/\?/g;
s/[_%]40/\@/g;s/[_%]5B/\[/g;s/[_%]5C/\\/g;s/[_%]5D/\]/g;
s/[_%]5E/\^/g;s/[_%]5F/\_/g;s/[_%]60/\`/g;s/[_%]7B/\{/g;
s/[_%]7C/\|/g;s/[_%]7D/\}/g;s/[_%]7E/\~/g;s/[_%]2B/\+/g')"

UA="Opera/9.80 (X11; Linux x86_64; U; en) Presto/2.10.229 Version/11.64"
DIRFILE=$(zenity --file-selection --save --filename="$FILE" --confirm-overwrite)
[[ -z $DIRFILE ]] && exit
DIRNAME="$(dirname $DIRFILE)"
FILENAME="$(basename $DIRFILE)"

echo "save to ${DIRFILE}"
notify-send $1
aria2c --allow-overwrite=true \
    --user-agent="$UA" \
    --load-cookies="$COOKIES" \
    -d "$DIRNAME" \
    -o "$FILENAME" \
    -c "$DOWN_URL" \
    -s5 -x5 \
    --referer="$REF"
read -p "Press Enter to Continue "
