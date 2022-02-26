#!/bin/sh 
parcel build application/index.html --no-source-maps --no-cache
cd dist
zip -r ../build/feedolin.zip ./*