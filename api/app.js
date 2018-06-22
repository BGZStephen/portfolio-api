global.ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const errorUtils = require('./utils/error-utils');
const debug = require('debug')('app');

// connect to mongodb
mongoose.connect(config.database);

// once connected
mongoose.connection.on('connected', () => {
	debug('Connected to database successfully');
});

// in case of error
mongoose.connection.on('error', err => {
	debug('Error: ' + err);
});

// require models for global
require('./models');

const app = express();

// middleware

// cross origin resource sharing setup
app.use(cors());

// static folder for public views
app.use(express.static(path.join(__dirname, '../public')));

// body partser initialize
app.use(bodyParser.json());

// routing
app.use(require('./routes/public'));
app.use(require('./routes/private'));

// error handlers
app.use(errorUtils.logErrors);
app.use(errorUtils.errorHandler);

const port = 9000;
app.listen(port, () => {
	debug(`Server started, listening on port: ${port}`);
});
