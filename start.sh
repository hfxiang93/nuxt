#!/bin/bash

#下载依赖、打包文件
docker run --rm \
  -v $PWD:/home \
  -w /home \
  node:10 sh -c "npm install && npm run build"

#删除容器
docker rm -f besteladminweb &> /dev/null


# 运行容器
docker run -d --restart=on-failure:5 \
    -p 80:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    --name besteladminweb nginx:1.13
