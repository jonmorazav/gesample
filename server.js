const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require("bcrypt");
const morgan = require('morgan');
const MongoStore = require('connect-mongo')(session);
const sessions = require('express-sessions');
const PORT = process.env.PORT || 8080;
const routes = require('./routes');
const keys = require('./keys.json')

const environment = app.get('env');
const saltRounds = 10;

app.use(session({
  secret: keys.sessionKey,
  resave: false,
  rolling: true,
  cookie: {
    maxAge: 900000
  },
  store: new MongoStore({
    url: `mongodb://${keys.mongoUrl}/session?authSource=${keys.mongoUser}`
  }),
  saveUninitialized: false
}))

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, function() {
  console.log('Listening on port: ' + PORT);
});