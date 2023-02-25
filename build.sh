#!/bin/sh 

rm -rf ./dist
mkdir ./dist
mkdir ./dist/assets


rm -rf ./build
mkdir ./build




npm run  build --no-source-maps --no-optimize --public-url ./ application/index.html 

cp -r ./application/assets/icons ./dist/assets/icons
cp -r ./application/assets/image ./dist/assets/image

mkdir ./dist/assets/js
cp  ./application/assets/js/kaiads.v5.min.js ./dist/assets/js/



cp ./application/manifest.webapp ./dist/
cp ./application/manifest.webmanifest ./dist/




#!/bin/bash
#create default app zip
cd dist/
mv manifest.webmanifest ../
rm ../build/feedolin.zip
zip -r ../build/feedolin.zip ./*
mv  ../manifest.webmanifest ./





#create bHaCkers zip
rm ../build/feedolin-omnisd.zip
zip -r ../build/application.zip ./*
cd ../build/
mkdir -p feedolin-omnisd
touch ./feedolin-omnisd/metadata.json
echo '{ "version": 1, "manifestURL": "app://feedolin/manifest.webapp" }'  > ./feedolin-omnisd/metadata.json

cp application.zip feedolin-omnisd/
cd feedolin-omnisd/
zip -r ../feedolin-omnisd.zip ./*
rm -fr ../feedolin-omnisd
rm ../application.zip


#create KaiOS 3.0 app zip

#rm ../build/greg-kaios3.zip
cd ../../
cd dist/
mv manifest.webapp ../
zip -r ../build/feedolin-kaios3.zip ./*
mv  ../manifest.webapp ./
exit






