# build:
# docker build -t react-radio-arm .
# export:
# docker save --output react-radio-arm.tar react-radio-arm
# load:
# docker load --input react-radio-arm.tar
# run:
# Docker run --rm -d -p 80:80 react-radio-arm
#
# amd64
#FROM nginx:1.19
# armv7
FROM arm32v7/nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./build /usr/share/nginx/html
