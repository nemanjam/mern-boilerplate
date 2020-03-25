import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import https from 'https';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import passport from 'passport';

import localAuthRoutes from './routes/localAuth';
import googleAuthRoutes from './routes/googleAuth';
import facebookAuthRoutes from './routes/facebookAuth';
import apiRoutes from './routes/api';

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./services/jwtStrategy');
require('./services/facebookStrategy');
require('./services/googleStrategy');
require('./services/localStrategy');

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true, // Adding new mongo url parser
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/', localAuthRoutes);
app.use('/', googleAuthRoutes);
app.use('/', facebookAuthRoutes);
app.use('/', apiRoutes);
app.use('/static', express.static(__dirname + '/static'));

// Serve static assets if in production
if (isProduction) {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'));
  });

  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 5000;

  const httpsOptions = {
    key: readFileSync(resolve(__dirname, '../security/cert.key')),
    cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
  };

  const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log('https server running at ' + port);
  });
}
