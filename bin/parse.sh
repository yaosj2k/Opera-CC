#!/bin/bash

#=======================================
a=" OK "
b=" FAIL "
COLUMNS=40
exes="unzip exo-open aria2c mplayer grep sed python2 python wget expect notify-send xterm readlink"
#=======================================
which which >/dev/null 2>&1
if [[ $? != 0 ]];then
    echo "error ...exit"
fi

for exe in $exes;do
    cmd="check command $exe ..."
    echo -e -n "$cmd"
    which $exe >/dev/null 2>&1
    if [[ $? == 0 ]];then
        #echo -e "ok\n"
        echo -e "\e[$[$COLUMNS-${#a}-${#cmd}]C\033[32m$a\033[0m"
    else
        #echo -e "false\n"
        echo -e "\e[$[ $COLUMNS - ${#b} - ${#cmd}]C\033[31m$b\033[0m"
    fi
done
