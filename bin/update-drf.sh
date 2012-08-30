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

mkdir -p $BASE_DIR/../profile/dragonfly/
cd $BASE_DIR/../profile/dragonfly/
wget --no-check-certificate -N "https://dragonfly.opera.com/app/stp-1/experimental/zips/latest/client-$OP_LANG.zip"
if [[ -f client-$OP_LANG.zip ]];then
	
	rm -r $(ls |grep -v "client-$OP_LANG.zip")
	unzip "client-$OP_LANG.zip"
	rm "client-$OP_LANG.zip"
    echo ""
    read -p "Update OK, Please Press Enter to Continue"
else
	echo "download error!!!"
fi
