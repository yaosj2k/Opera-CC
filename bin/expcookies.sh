#!/bin/bash

COODAT="profile/cookies4.dat"
[[ ! -f ${COODAT} ]] && exit

DIRFILE=$(zenity --file-selection --save --title="save file to ..." --filename="cookies.txt" --confirm-overwrite)
[[ -z $DIRFILE ]] && exit
DIRNAME=$(dirname $DIRFILE)
FILENAME=$(basename $DIRFILE)

exec ./bin/cookies.py ${COODAT} ${DIRNAME}/${FILENAME}
