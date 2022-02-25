#!/bin/sh 
parcel build application/index.html --no-source-maps  --no-minify --no-cache
cd dist
zip -r ../build/greg.zip ./*