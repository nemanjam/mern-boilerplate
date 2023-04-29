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
RUN chown -R node:node /home/node/.npm-global

ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN npm --global config set user "${USER}"

USER node
RUN npm i --location=global pm2

ENV NODE_ENV=production
RUN npm install
RUN npm run build

CMD [ "pm2-runtime", "--no-auto-exit", "npm", "--", "run", "docker:start:prod" ]
