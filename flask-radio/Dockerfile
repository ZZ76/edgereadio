# build:
# docker build -t flask-radio-arm .
# export:
# docker save --output flask-radio-arm.tar react-radio-arm
# load:
# docker load --input flask-radio-arm.tar
# run:
# docker run --rm -d -p 5000:5000 flask-radio-arm
#
# amd64
#FROM python:3.12-rc-slim
FROM python:slim-buster
# arm
#FROM arm32v7/python:3.12-rc-slim

RUN apt update
RUN apt install -y vlc
WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN pip3 install --only-binary :all: greenlet
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "bash", "start-prod.sh" ]
