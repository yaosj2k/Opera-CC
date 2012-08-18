#!/usr/bin/env bash

DIR="${HOME}/Pictures/snapshots"
DATE="$(date +%Y%m%d@%H%M%S)"
NAME="${DIR}/snapshot-${DATE}.jpg"
LOG="${DIR}/snapshots.log"

# Check if the scrot exists
if [ -f `which scrot` ]
    then SCROT_LOCATE=`which scrot`
    else xterm -geometry 40x10 -e 'echo -e "您没有安装scrot!!!\nscrot have not installed!!!";read';exit
fi

# Check if the dir to store the screenshots exists, else create it:
if [ ! -d "${DIR}" ]; then mkdir -p "${DIR}"; fi

# Screenshot a selected window
if [ "$1" = "win" ]; then ${SCROT_LOCATE} -bs "${NAME}"; fi

# Screenshot the entire screen
if [ "$1" = "scr" ]; then ${SCROT_LOCATE} "${NAME}"; fi

# Screenshot a selected area
if [ "$1" = "area" ]; then 
    notify-send -t 5000 "5秒后截图"
    ${SCROT_LOCATE} -cd 5 -s "${NAME}"
fi

if [[ $# = 0 ]]; then
    # Display a warning if no area defined
    echo "No screenshot area has been specified. Screenshot not taken."
    echo "${DATE}: No screenshot area has been defined. Screenshot not taken." >> "${LOG}"
else
    # Save the screenshot in the directory and edit the log
    echo "${NAME}" >> "${LOG}"
    notify-send "截图保存在${DIR}"
fi
