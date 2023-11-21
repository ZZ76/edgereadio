## Before build
1. Edit `REACT_APP_BASE_URL` in `.env.prudoction`. Use ip address e.g. `http://192.168.1.2:5000` instead use `localhost`.
2. Check Linux distribution with `cat /etc/*-release`. Then select the suitable base docker image for nginx and set in `Dockerfile`

## Build react project locally

In `react-radio` directory 
build the app, run:
```
$ npm run build
```

## Build docker image to serve react code

1. build docker image:
```
$ docker build -t react-radio-arm .
```

2. export image:
```
$ docker save --output react-radio-arm.tar react-radio-arm
```

3. load image:
```
$ docker load --input react-radio-arm.tar
```

4. run image:
```
$ docker run --rm -d -p 80:80 react-radio-arm
```

## Build react docker in docker

1. build docker image:
```
docker build -t react-radio-build -f build.Dockerfile .
```
the image's job is simply try to install packages and run `npm run build`.

2. in `react-radio`, run docker image to build the react code:
```
REACT_SRC=`pwd`
REACT_DST=/radio-react-docker
docker run -d --rm --name build-react-radio \
--mount type=bind,src=${REACT_SRC},dst=${REACT_DST} \
react-radio-build
```
