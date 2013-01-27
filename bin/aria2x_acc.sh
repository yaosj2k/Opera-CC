#!/bin/sh

echo $1
echo $2

d_dir=$(dirname "$2")
d_file=$(basename "$2")
aria2c -x 8 -s 8 --file-allocation=none --load-cookies=/tmp/cookies.txt -c --dir="$d_dir" --out="$d_file" "$1"
