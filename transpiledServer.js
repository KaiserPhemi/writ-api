'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// instantiate express
// libraries
var app = (0, _express2.default)();
var port = 5555;

// parse incoming request
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// disable logging server info
app.disable('x-powered-by');

// start app and listen on port 5555
app.listen(port, function (error) {
  if (error) {
    throw error;
  }
  console.log('Server started on port ' + port);
});
