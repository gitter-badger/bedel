// App.js tests
const request = require('request');
const app = require('../app');

// Tests
describe('app.js tests', () => {

  it('should check if server is started successfully', (done) => {
    // Open
    app({ port: 3030, silent: true });
    // Check
    request('http://localhost:3030', (err) => {
      if (err) {
        throw err;
      }
    });
    done();
  });

});
