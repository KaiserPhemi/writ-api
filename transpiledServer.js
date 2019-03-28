"use strict";

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("./db/models"));

var dotenv = _interopRequireWildcard(require("dotenv"));

var _app = _interopRequireDefault(require("./routes/app"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// third-party libraries
// app
// disable logging
dotenv.config({
  silent: true
}); // checks for databse connection

_models.default.sequelize.authenticate().then(function () {
  return console.log('Database connected...');
}).catch(function (err) {
  return console.log("Error connecting to database: ".concat(err));
}); // start app and listen on parsed port


if (!module.parent) {
  _app.default.listen(port, function (error) {
    if (error) {
      throw error;
    }

    console.log("Application started. Listening on port: ".concat(port));
  });
}
