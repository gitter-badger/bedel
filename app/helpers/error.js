'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Handlers
/**
 * Catch 404 error and forward to error handler
 * @param req {Object} - Express request object
 * @param res {Object} - Express response object
 * @param next {Function} - Express callback
*/
var makeE404 = function makeE404() {
  return function (req, res, next) {
    var err = new Error('404: Not Found');
    err.status = 404;
    next(err);
  };
};

/**
 * Error Handler
 * @param err {Error} - Error object
 * @param req {Object} - Express request object
 * @param res {Object} - Express response object
 * @param next {Function} - Express callback
*/
// Error handler
/**
 * Module depedencies
*/
var makeErrHandle = function makeErrHandle(oldLogger) {
  var logger = oldLogger;
  return function (error, req, res, next) {
    // Reassign
    var err = error;
    if (!err.status) {
      err.status = 500;
    }
    if (err.status > 499) {
      logger.prefix = _chalk2.default.red.bold('E' + err.status);
    } else if (err.status < 500 && err.status > 399) {
      logger.prefix = _chalk2.default.yellow.bold('E' + err.status);
    }
    logger.info('Got a ' + (err.status || 500) + ' for ' + req.url);
    logger.prefix = null;
    // Fix error formatting
    var a = void 0;
    var split = err.stack.split('\n');
    for (a = 0; a < split.length; a++) {
      if (split[a].includes('at ')) {
        split[a] = "\t" + split[a];
      }
    }
    err.stack = split.join('\n');
    // Send
    res.status(err.status || 500);
    res.render('error.ejs', {
      message: err.message,
      err: err
    });
  };
};

/**
 * Use method
 * @param app {Object} Express app object
 * @param logger {Logger} Logger
*/
module.exports = function (app, logger) {
  app.use(makeE404());
  app.use(makeErrHandle(logger));
};