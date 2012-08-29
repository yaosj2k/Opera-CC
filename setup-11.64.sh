#!/bin/bash

SH_COM=$(cd "${0%/*}";pwd)/$(basename $0)

readlink $SH_COM >/dev/null 2>&1
if [ $? -eq 0 ];then
    R_SH_COM=$(readlink $SH_COM)
    BASE_DIR=${R_SH_COM%/*}
    cd $BASE_DIR
else 
    BASE_DIR=${SH_COM%/*}
    cd $BASE_DIR
fi

SYS_BIT=$(getconf LONG_BIT)

if [[ $SYS_BIT == '64' ]] ;then
    version="opera-11.64-1403.x86_64.linux"
else
    version="opera-11.64-1403.i386.linux"
fi

wget ftp://ftp.opera.com/pub/opera/linux/1164/${version}.tar.xz

tar xf ${version}.tar.xz -C ./ --exclude=${version}/opera
mv ${version}/* ./
rmdir ${version}

chmod -R 755 *
./bin/parse.sh

rm ${version}.tar.xz
