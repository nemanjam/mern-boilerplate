# MERN Boilerplate

This is full stack boilerplate with React, Redux, Express, Mongoose and Passport. Skip the tedious part and get straight to developing your app.

## Demo

- Live demo is available here: **[https://mern-boilerplate.arm1.nemanjamitic.com](https://mern-boilerplate.arm1.nemanjamitic.com)**

## Deployment with Docker (2023. update)

Since Heroku is no longer free I made Docker production deployment that you can use on any Linux VPS.

- original [mern-docker-prod](https://github.com/nemanjam/mern-docker-prod) repository with Docker code and instructions that you can reuse to deploy your own Mern apps
- Traefik part of the deployment [traefik-proxy](https://github.com/nemanjam/traefik-proxy) and [traefik-proxy/apps/mern-boilerplate](https://github.com/nemanjam/traefik-proxy/tree/main/apps/mern-boilerplate)


## Features

- Server

  - User and Message models with `1:N` relation
  - Full CRUD REST API operations for both Message and User models
  - Passport authentication with local `email/password`, Facebook and Google OAuth strategies and JWT protected APIs
  - `User` and `Admin` roles
  - NodeJS server with Babel for new JS syntax unified with React client
  - `async/await` syntax across whole app
  - Joi server side validation of user's input
  - Single `.env` file configuration
  - Image upload with Multer
  - Database seed

- Client

  - React client with functional components and Hooks
  - Redux state management with Thunk for async actions
  - CSS agnostic, so you don't waste your time replacing my CSS framework with yours
  - Home, Users, Profile, Admin, Notfound, Login and Register pages
  - Protected routes with Higher order components
  - Different views for unauthenticated, authenticated and admin user
  - Edit/Delete forms for Message and User with Formik and Yup validation
  - Admin has privileges to edit and delete other users and their messages
  - Layout component, so you can have pages without Navbar
  - Loading states with Loader component
  - Single config file within `/constants` folder

## Installation

Read on on how to set up this for development. Clone the repo.

```
$ git clone https://github.com/nemanjam/mern-boilerplate.git
$ cd mern-boilerplate
```

### Server

#### .env file

Rename `.env.example` to `.env` and fill in database connection strings, Google and Facebook tokens, JWT secret and your client and server production URLs.

```
#db
MONGO_URI_DEV=mongodb://localhost:27017/mernboilerplate
MONGO_URI_PROD=

#google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=/auth/google/callback

#facebook
FACEBOOK_APP_ID=
FACEBOOK_SECRET=
FACEBOOK_CALLBACK_URL=/auth/facebook/callback

#jwt
JWT_SECRET_DEV=secret
JWT_SECRET_PROD=

#site urls
CLIENT_URL_DEV=https://localhost:3000
CLIENT_URL_PROD=https://mern-boilerplate-demo.herokuapp.com
SERVER_URL_DEV=https://localhost:5000
SERVER_URL_PROD=https://mern-boilerplate-demo.herokuapp.com

#img folder path
IMAGES_FOLDER_PATH=/public/images/
```

#### Generate certificates

Facebook OAuth requires that your server runs on `https` in development as well, so you need to generate certificates. Go to `/server/security` folder and run this.

```
$ cd server/security
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256
```

#### Install dependencies

```
$ cd server
$ npm install
```

#### Run the server

You are good to go, server will be available on `https://localhost:5000`

```
$ npm run server
```

### Client

Just install the dependencies and run the dev server. App will load on `https://localhost:3000`.

```
$ cd client
$ npm install
$ npm start
```

That's it as far for development setup. For production check the `Deployment on Heroku` section.

## Screenshots

![Screenshot1](/screenshots/Screenshot_1.png)

![Screenshot2](/screenshots/Screenshot_2.png)

![Screenshot3](/screenshots/Screenshot_3.png)

![Screenshot4](/screenshots/Screenshot_4.png)

![Screenshot5](/screenshots/Screenshot_5.png)

![Screenshot6](/screenshots/Screenshot_6.png)

## Deployment on Heroku

#### Push to Heroku

This project is already all set up for deployment on Heroku, you just need to create Heroku application add heroku remote to this repo and push it to `heroku` origin.

```
$ heroku login
$ heroku create my-own-app-name
$ git remote add heroku https://git.heroku.com/my-own-app-name.git
$ git push heroku master
$ heroku open
```

#### Database setup

But before that you need MongoDB database, so go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create cluster, whitelist all IPs and get database URL. Set that URL in `.env` file as `MONGO_URI_PROD`.

```
MONGO_URI_PROD=mongodb+srv://<your-username-here>:<your-password-here>@cluster0-abcd.mongodb.net/test?retryWrites=true&w=majority
```

If you don't insert environment variables in Heroku manually via web interface or console you'll need to remove `.env` file from `server/.gitignore` and push it to Heroku. Never push `.env` file to development repo though.

```
...
#.env #comment out .env file
...
```

In the following section you can read detailed instructions about Heroku deployment process.

### Server setup

#### Development

Server uses Babel so that we can use the same newer JavaScript syntax like the one used on the Client. In development we are passing `server/src/index.js` file to `babel-node` executable along with `nodemon` daemon. We run that with `npm run server` script.

```
"server": "nodemon --exec babel-node src/index.js",
```

#### Production

That is fine for development, we compile the source on every run but for production we want to avoid that and to compile and build code once to JavaScript version which Node.JS can execute. So we take all the code from `/server/src` folder compile it and put the output into `/server/build` destination folder. `-d` is short for destination, and `-s` flag is for sourcemaps for debugging. We make that into `build-babel` script.

```
"build-babel": "babel -d ./build ./src -s",
```

We also need to delete and make `build` folder on every deployment, so we do that with this simple script.

```
"clean": "rm -rf build && mkdir build",
```

Now we have everything to build our server code. We do that by calling 2 last scripts.

```
"build": "npm run clean && npm run build-babel",
```

Now we just need to call build script and run compiled file with node. Make sure Babel is in the production dependencies in the `server/package.json` or you'll get "babel is not defined" error on Heroku.

```
"start-prod": "npm run build && node ./build/index.js",
```

#### Running server on Heroku

Our server is now all set up, all we need is to call `start-prod` script. Heroku infers runtime he needs to run the application by the type of dependencies file in the root folder, so for Node.JS we need another `package.json`. Heroku will call `start` script after building phase so we just need to pass our `start-prod` script to spin up the server with the `--prefix server` where `server` is folder in which `package.json` with that script is located.

```
"start": "npm run start-prod --prefix server",
```

#### Installing dependencies

Before all this happens Heroku needs to install the dependencies for both server and client, `heroku-postbuild` script is meant for that. `NPM_CONFIG_PRODUCTION=false` variable is there to disable production environment while dependencies are being installed. Again `--prefix` flag is specifying the folder of the script being run. In this script we build our React client as well.

```
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix server && npm install --prefix client && npm run build --prefix client"
```

### Client Setup

Before you push to production you'll need to set your URLs in `client/constants`. That's it.

```javascript
export const FACEBOOK_AUTH_LINK =
  "https://my-own-app.herokuapp.com/auth/facebook";
export const GOOGLE_AUTH_LINK = "https://my-own-app.herokuapp.com/auth/google";
```

## References

- Brad Traversy [Dev connector 2.0](https://github.com/bradtraversy/devconnector_2.0)
- Brad Traversy [Learn The MERN Stack Youtube playlist](https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE)
- Thinkster [react-redux-realworld-example-app](https://github.com/gothinkster/react-redux-realworld-example-app)
- Thinkster [
  node-express-realworld-example-app ](https://github.com/gothinkster/node-express-realworld-example-app)
- Quinston Pimenta [Deploy React with Node (Express, configured for ES6, Babel) to Heroku (without babel-node)](https://www.youtube.com/watch?v=mvI25HLDfR4)

- Kim Nguyen [How to Deploy ES6 Node.js & Express back-end to Heroku](https://medium.com/@kimtnguyen/how-to-deploy-es6-node-js-express-back-end-to-heroku-7e6743e8d2ff)

## Licence

### MIT
