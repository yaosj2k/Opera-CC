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

./bin/parse.sh
SYS_BIT=$(getconf LONG_BIT)

last_snapshot_page=$(curl -L http://snapshot.opera.com/unix/latest)
last_snapshot_url="http://snapshot.opera.com"$(echo $last_snapshot_page | sed -r 's/.*Index\ of\ ([^<]+).*/\1/')
version_64=$(echo $last_snapshot_page | sed -r 's/.+(opera.*x86_64\.linux)\.tar\.xz.+/\1/')
version_32=$(echo $last_snapshot_page | sed -r 's/.+(opera.*i386\.linux)\.tar\.xz.+/\1/')
if [[ $SYS_BIT == '64' ]] ;then
    version=$version_64
    squid_link="https://dl.dropbox.com/sh/m2hz4s4hvd2g28x/NhKeU9kS8D/squid-x86_64.tar.gz"
    platform="x86_64"
else
    version=$version_32
    squid_link="https://dl.dropbox.com/sh/m2hz4s4hvd2g28x/nUPMR9xe9f/squid-i386.tar.gz"
    platform="i386"
fi

echo "last snapshot is $version, press anykey to continue."
read -n 1
wget $last_snapshot_url/$version.tar.xz

tar xf ${version}.tar.xz -C ./ --exclude=${version}/opera
mv ${version}/* ./
rmdir ${version}

### squid
wget ${squid_link}
tar -xzvf squid-${platform}.tar.gz -C ./bin/squid/
rm -rf squid-${platform}.tar.gz

./bin/update-drf.sh

chmod -R 755 *
rm ./${version}.tar.xz
