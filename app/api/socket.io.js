'use strict';
// Socket.io file
/**
 * Module depedencies
*/

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// IO method
module.exports = {
  // Array of connections + methods
  events: [
    // Example:
    // { event: test, listener: (data, socket) => console.log('hi!') }
  ],
  /**
   * Start a socket.io server
   * @param server {Server} - Http/Https server class
   */
  init: function init(server, logger) {
    // Start io
    this.io = (0, _socket2.default)(server);
    this.logger = logger;
    return this.sockets;
  },


  /**
   * Default listener
   */
  defaultListener: function defaultListener(socket) {
    this.logger.debug('A client has connected to the socket.io server');
    // Add Listeners
    var listener = void 0;
    for (var _iterator = this.events, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      if (_isArray) {
        if (_i >= _iterator.length) break;
        listener = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        listener = _i.value;
      }

      socket.on(listener.event, listener.listener(socket, this.logger));
    }
  },


  /**
   * Add the listener for the 'connection' event
   */
  start: function start() {
    this.logger.debug('Adding listener for socket.io connection event...');
    this.io.on('connection', this.defaultListener.bind(this));
  },


  /**
   * Use a specific listener for a certain event
   * @param event {String} - Event to listen on
   * @param listener {Function} - Listener
   */
  use: function use(event, listener) {
    this.events.push({
      event: event,
      listener: listener.bind(this)
    });
  }
};