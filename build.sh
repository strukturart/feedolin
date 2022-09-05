#!/bin/sh 

rm -rf ./dist
mkdir ./dist
mkdir ./dist/assets


rm -rf ./build
mkdir ./build




npm run  build --no-source-maps --no-optimize  ./ application/index.html 

cp -r ./application/assets/icons ./dist/assets/icons
cp -r ./application/assets/image ./dist/assets/image

mkdir ./dist/assets/js
cp  ./application/assets/js/kaiads.v5.min.js ./dist/assets/js/



cp ./application/manifest.webapp ./dist/
cp ./application/manifest.webmanifest ./dist/

#!/bin/bash
#create default app zip
cd dist/
rm ../build/feedolin.zip
zip -r ../build/feedolin.zip ./*


#create bHaCkers zip
rm ../build/feedolon-omnisd.zip
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


#github page
cd ../..
rm -fr ./docs
mkdir docs
cp -r ./dist/* ./docs/
exit


