# DOCKER-VERSION 1.0.0
FROM resin/rpi-raspbian

# Install required packages
RUN apt-get update
RUN apt-get --yes upgrade
RUN apt-get install -y wget dialog

# Install nodejs
RUN wget http://node-arm.herokuapp.com/node_latest_armhf.deb
RUN dpkg -i node_latest_armhf.deb

# Pushing the repository
COPY . /src
WORKDIR /src
RUN npm install

# Run boy, run!
EXPOSE 3000
CMD ["node", "/src/bin/www"]