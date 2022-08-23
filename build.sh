#!/bin/sh 
cp ./application/assets/icons/* ./dist/assets/icons/
cp manifest.webapp ./dist/
npm run  build --no-source-maps --no-optimize  ./ application/index.html 
