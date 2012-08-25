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

version="opera-12.02-1565.x86_64.linux"
wget http://snapshot.opera.com/unix/RC1_12.02-1565/${version}.tar.xz
#wget ftp://ftp.opera.com/pub/opera/linux/1164/${version}.tar.xz

tar xf ${version}.tar.xz -C ./ --exclude=${version}/opera
mv ${version}/* ./
rmdir ${version}
./bin/parse.sh

rm ${version}.tar.xz
