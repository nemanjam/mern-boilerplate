FROM node:16.19.0-alpine

ENV USER=node

# home folder node user
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# relative to build context
COPY . ./
COPY package*.json ./

RUN chown -R node:node /home/node/app

RUN mkdir /home/node/.npm-global
RUN chown -R 1000:1000 /home/node/.npm-global

ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN npm --global config set user "${USER}"

USER node

RUN npm install --loglevel=warn;
RUN npm i --location=global pm2

CMD [ "pm2-runtime", "--no-autorestart", "npm", "--", "run", "start-prod" ]
