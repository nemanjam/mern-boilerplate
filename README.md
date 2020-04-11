# MERN Boilerplate

This is fullstack boilerplate with React, Redux, Express, Mongoose and Passport.

Out of the box on server you get User and Message models, both with full CRUD operations, User and Admin roles, server side validation with Joi, Passport with local, JWT, Facebook and Google authorization strategies.

On client you get Redux state management with Thunk for async actions, Formik for forms handling, protected routes with Higher order components.

See Features section for details.

## Demo

Live demo is available here: **[Demo](https://mern-boilerplate-demo.herokuapp.com/)**

## Features

### Server

- User and Message models with `1:N` relation
- Full CRUD REST API operations for both Message and User models
- Passport authentication with local `email/password` strategy, Facebook and Google OAuth strategies and JWT protected APIs
- `User` and `Admin` roles
- NodeJS server with Babel for unified new JS syntax with React client
- `async/await` syntax across whole app
- Joi server side validation of user's input
- Single `.env` file configuration
- Image upload with Multer
- Database seed

### Client

- React client with functional components and Hooks
- Redux state management with Thunk for async actions
- CSS agnostic, so you don't waste your time replacing my CSS framework with yours
- Home, Users, Profile, Admin, Notfound, Login and Register pages
- Protected routes with Higher order components
- Different views for unauthenticated, authenticated and admin user
- Edit/Delete forms for Message and User
- Admin has privileges to edit and delete other users and their messages
- Layout component, so you can have pages without Navbar
- Loading states with Loader component
- Single config file within `/constants` folder

## Installation

## Screenshots

## Deployment on Heroku

This project is already all set up for deployment on Heroku, you just need to create Heroku application add heroku remote to this repo and push it to `heroku` origin.

```
$ heroku login
$ heroku create my-own-app-name
$ git remote add heroku https://git.heroku.com/my-own-app-name.git
$ git push heroku master
$ heroku open
```

In the following section you can read detailed instruction about Heroku deployment process.

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

## References

## Licence

### MIT
