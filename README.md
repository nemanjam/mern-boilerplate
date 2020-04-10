# MERN Boilerplate

## Demo

## Features

## Installation

## Screenshots

## Deployment on Heroku

### Server setup

#### Development

Server uses Babel so that we can use the same newer Javascript syntax like the one used on the Client. In development we are passing `server/src/index.js` file to `babel-node` executable along with `nodemon` daemon. We run that with `npm run server` script.

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

#### Installing dependencies

Before all this happens Heroku needs to install the dependencies for both server and client, `heroku-postbuild` script is meant for that. `NPM_CONFIG_PRODUCTION=false` variable is there to disable production environment while dependencies are being installed. Again `--prefix` flag is specifying the folder of the script being run. In this script we build our React client as well.

```
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix server && npm install --prefix client && npm run build --prefix client"
```

That is the explanation of deployment process for Heroku, it is already all set up in existing repo, you just need to create Heroku application add Heroku remote to this repo and push it to `heroku` origin.

```
heroku login
heroku create my-own-app-name
git remote add heroku https://git.heroku.com/my-own-app-name
git push heroku master
heroku open
```

## References

## Licence
