# Install base image
FROM readytalk/nodejs:latest

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

EXPOSE  4000
CMD ["node", "/src/index.js"]