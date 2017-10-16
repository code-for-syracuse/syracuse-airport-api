# Install base image
FROM node:8

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

EXPOSE  3000
CMD ["node", "/src/index.js"]