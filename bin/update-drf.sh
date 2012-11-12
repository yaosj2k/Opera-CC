#!/usr/bin/env bash

OP_LANG=zh-cn

SH_COM=$(cd "${0%/*}";pwd)/$(basename $0)
readlink $SH_COM >/dev/null 2>&1
if [ $? -eq 0 ];then
    R_SH_COM=$(readlink $SH_COM)
    BASE_DIR=${R_SH_COM%/*}
else 
    BASE_DIR=${SH_COM%/*}
fi

rtime=$(date --date="$(curl -I 'https://dragonfly.opera.com/app/stp-1/zips/latest/client-${OP_LAND}.zip' | awk -F' ' '/Last-Modified/{print($3,$4,$5,$6,$7)}')" +%s)

mkdir -p $BASE_DIR/../profile/dragonfly/
cd $BASE_DIR/../profile/dragonfly/
if [[ -f updatetime.log ]];then
    atime=$(cat updatetime.log)
    if [[ $rtime -le $atime ]];then
    echo -e "\033[33mdragonfly already the newest~\033[0m"
    echo "Press Enter to Continue"
    read -n 1
    exit
    fi
fi

wget --no-check-certificate -N "https://dragonfly.opera.com/app/stp-1/zips/latest/client-$OP_LANG.zip"
if [[ -f client-$OP_LANG.zip ]];then
    rm -r $(ls |grep -v "client-$OP_LANG.zip")
    unzip "client-$OP_LANG.zip"
    rm "client-$OP_LANG.zip"
    echo $rtime > updatetime.log
    echo -e "\033[32mUpdate OK~\033[0m"
    echo "Please Press Enter to Continue"
    read -n 1
else
    echo "download error!!!"
fi
