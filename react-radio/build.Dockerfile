# build image:
# docker build -t radio-react-build -f build.Dockerfile .
# amd64
#FROM node
# arm64
#FROM arm64v8/node
# armv7
FROM arm32v7/node
WORKDIR /radio-react-docker/
CMD ["bash", "build_in_docker.sh"]
