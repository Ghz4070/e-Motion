"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mariadb = _interopRequireDefault(require("mariadb"));

var _cors = _interopRequireDefault(require("cors"));

var _config = require("./config");

var _database = require("./database");

var _Users = require("./Routes/Users");

var _Vehicles = require("./Routes/Vehicles");

var _Offers = require("./Routes/Offers");

var _Locations = require("./Routes/Locations");

var _Users2 = require("./Controller/Users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pool = _mariadb["default"].createPool({
  host: _database.Host,
  user: _database.User,
  password: _database.Password,
  database: _database.Database
});

function asyncConnection() {
  return _asyncConnection.apply(this, arguments);
}

function _asyncConnection() {
  _asyncConnection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var conn, app, mariadbConn, dayInMilliseconds;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return pool.getConnection();

          case 3:
            conn = _context.sent;
            console.log('hello');
            app = (0, _express["default"])();
            app.use(_express["default"]["static"]('src'));
            app.use(function (req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
              res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-access-token, Access-Control-Allow-Headers, Authorization, X-Requested-With"');
              res.setHeader('Access-Control-Allow-Credentials', true);
              next();
            }); //Middleware

            app.use(_bodyParser["default"].json());
            app.use(_bodyParser["default"].urlencoded({
              extended: true
            }));
            app.use((0, _morgan["default"])('dev'));
            app.use((0, _cors["default"])());

            mariadbConn = function mariadbConn(req, res, next) {
              req.conn = conn;
              next();
            };

            dayInMilliseconds = 86400000;
            setInterval((0, _Users2.reportLateVehicle)(conn), dayInMilliseconds); //Routes

            app.use("".concat(_config.rootApi, "/offer"), mariadbConn, _Offers.anonymeRouteOffers);
            app.use("".concat(_config.rootApi, "/admin/offer"), mariadbConn, _Offers.adminRouteOffers);
            app.use("".concat(_config.rootApi, "/vehicle"), mariadbConn, _Vehicles.anonymeRouteVehicles);
            app.use("".concat(_config.rootApi, "/admin/vehicle"), mariadbConn, _Vehicles.adminRouteVehicles);
            app.use("".concat(_config.rootApi, "/user"), mariadbConn, _Users.anonymeRouteUsers);
            app.use("".concat(_config.rootApi, "/admin/user"), mariadbConn, _Users.adminRouteUsers);
            app.use("".concat(_config.rootApi, "/admin/location"), mariadbConn, _Locations.adminRouteLocations);
            app.use("".concat(_config.rootApi, "/location"), mariadbConn, _Locations.anonymeRouteLocations);
            app.listen(_config.port, function () {
              return console.log("Server running in port ".concat(_config.port));
            });
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 29:
            _context.prev = 29;

            if (!conn) {
              _context.next = 32;
              break;
            }

            return _context.abrupt("return", conn.end());

          case 32:
            return _context.finish(29);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 26, 29, 33]]);
  }));
  return _asyncConnection.apply(this, arguments);
}

asyncConnection();