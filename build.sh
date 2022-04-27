#!/bin/sh 
cp ./application/assets/icons/* ./dist/assets/icons/
cp manifest.webapp ./dist/
parcel ./application/index.html --no-source-maps --no-cache
