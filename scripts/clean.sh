#! /usr/bin/env sh

find . -type f -name "*.js" -d 1 -exec rm {} \;
rm -rf utils
