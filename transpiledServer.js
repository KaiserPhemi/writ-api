'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate express
// third-party libraries
var app = (0, _express2.default)();
var port = 5555;

// parse incoming requests
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// disable logging server info
app.disable('x-powered-by');

app.get('/', function (req, res) {
  console.log('We are live');
  res.send('Hello Node!');
});

// start app and listen on parsed port
app.listen(port, function (error) {
  if (error) {
    throw error;
  }
  console.log('Server started on port ' + port);
});
