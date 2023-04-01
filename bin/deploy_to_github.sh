#!/usr/bin/env bash
rm -rf dist
npm run build
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:wangdoudou86/react-mangosteen-1-preview.git
git push -f origin main:master
cd -