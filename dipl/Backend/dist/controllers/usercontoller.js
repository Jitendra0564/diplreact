"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var bcrypt = require('bcryptjs');
var path = require('path');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var File = require('../models/fileupload');
var User = require('../models/UsersModels');

// Configure multer for file uploads
var storage = multer.diskStorage({
  destination: function destination(req, File, cb) {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
var fileFilter = function fileFilter(req, file, cb) {
  // Filter to allow only specific file types (e.g., images, PDFs)
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};
var upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// User registration controller
exports.registerUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, name, email, dob, password, fatherName, isAdmin, motherName, contactNo, AlternativeNo, fatherNo, Address, BankName, BankAccNo, Ifsc, Department, Position, Role, AadharCardNo, PanCardNo, joiningdate, Education, workHistory, Language, Status, userExists, salt, hashedPassword, newUser, savedUser;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, dob = _req$body.dob, password = _req$body.password, fatherName = _req$body.fatherName, isAdmin = _req$body.isAdmin, motherName = _req$body.motherName, contactNo = _req$body.contactNo, AlternativeNo = _req$body.AlternativeNo, fatherNo = _req$body.fatherNo, Address = _req$body.Address, BankName = _req$body.BankName, BankAccNo = _req$body.BankAccNo, Ifsc = _req$body.Ifsc, Department = _req$body.Department, Position = _req$body.Position, Role = _req$body.Role, AadharCardNo = _req$body.AadharCardNo, PanCardNo = _req$body.PanCardNo, joiningdate = _req$body.joiningdate, Education = _req$body.Education, workHistory = _req$body.workHistory, Language = _req$body.Language, Status = _req$body.Status; // Check if the user already exists
          _context.next = 4;
          return User.findOne({
            email: email
          });
        case 4:
          userExists = _context.sent;
          if (!userExists) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            msg: 'User with this email already exists'
          }));
        case 7:
          _context.next = 9;
          return bcrypt.genSalt(10);
        case 9:
          salt = _context.sent;
          _context.next = 12;
          return bcrypt.hash(password, salt);
        case 12:
          hashedPassword = _context.sent;
          // Create a user
          newUser = new User({
            name: name,
            email: email,
            dob: dob,
            password: hashedPassword,
            isAdmin: isAdmin,
            // Set to false by default
            fatherName: fatherName,
            motherName: motherName,
            contactNo: contactNo,
            AlternativeNo: AlternativeNo,
            fatherNo: fatherNo,
            Address: Address,
            BankName: BankName,
            BankAccNo: BankAccNo,
            Ifsc: Ifsc,
            Department: Department,
            Position: Position,
            Role: Role,
            joiningdate: joiningdate,
            workHistory: Array.isArray(workHistory) ? workHistory : JSON.parse(workHistory),
            Education: Array.isArray(Education) ? Education : JSON.parse(Education),
            Language: Language,
            Status: Status,
            AadharCardNo: AadharCardNo,
            PanCardNo: PanCardNo
          }); // Save the new user
          _context.next = 16;
          return newUser.save();
        case 16:
          savedUser = _context.sent;
          res.status(201).json({
            user: savedUser
          });
          _context.next = 24;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send('Server error');
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// User login controller
exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, user, isMatch, payload;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Check if the user exists
          _context2.next = 4;
          return User.findOne({
            email: email
          });
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            msg: 'Invalid credentials'
          }));
        case 7:
          _context2.next = 9;
          return bcrypt.compare(password, user.password);
        case 9:
          isMatch = _context2.sent;
          if (isMatch) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            msg: 'Invalid credentials'
          }));
        case 12:
          // Create and send a JSON Web Token
          payload = {
            user: {
              id: user.id,
              isAdmin: user.isAdmin,
              name: user.name
            }
          };
          jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2d'
          }, function (err, token) {
            if (err) throw err;
            res.cookie('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              // Set secure option based on environment
              sameSite: 'strict',
              maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days in milliseconds
            });
            res.json({
              token: token,
              name: user.name,
              isAdmin: user.isAdmin
            });
          });
          _context2.next = 20;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send('Server error');
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Create a new user
exports.createUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body3, name, email, dob, password, fatherName, motherName, contactNo, AlternativeNo, fatherNo, Address, BankName, BankAccNo, Ifsc, Department, Position, Role, joiningdate, workHistory, Education, Language, Status, AadharCardNo, PanCardNo, userExists, salt, hashedPassword, newUser, savedUser, fileIds, _i, _Object$keys, fileCategory, file, fileId, populatedUser;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, dob = _req$body3.dob, password = _req$body3.password, fatherName = _req$body3.fatherName, motherName = _req$body3.motherName, contactNo = _req$body3.contactNo, AlternativeNo = _req$body3.AlternativeNo, fatherNo = _req$body3.fatherNo, Address = _req$body3.Address, BankName = _req$body3.BankName, BankAccNo = _req$body3.BankAccNo, Ifsc = _req$body3.Ifsc, Department = _req$body3.Department, Position = _req$body3.Position, Role = _req$body3.Role, joiningdate = _req$body3.joiningdate, workHistory = _req$body3.workHistory, Education = _req$body3.Education, Language = _req$body3.Language, Status = _req$body3.Status, AadharCardNo = _req$body3.AadharCardNo, PanCardNo = _req$body3.PanCardNo; // Check if file size limit is exceeded
          if (!(req.files && Object.values(req.files).some(function (file) {
            return file[0].size > 5 * 1024 * 1024;
          }))) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: 'File size exceeds the allowed limit of 5MB'
          }));
        case 4:
          _context3.next = 6;
          return User.findOne({
            email: email
          });
        case 6:
          userExists = _context3.sent;
          if (!userExists) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            msg: 'User already exists'
          }));
        case 9:
          _context3.next = 11;
          return bcrypt.genSalt(10);
        case 11:
          salt = _context3.sent;
          _context3.next = 14;
          return bcrypt.hash(password, salt);
        case 14:
          hashedPassword = _context3.sent;
          // Create a new user object
          newUser = new User({
            name: name,
            email: email,
            dob: dob,
            password: hashedPassword,
            fatherName: fatherName,
            motherName: motherName,
            contactNo: contactNo,
            AlternativeNo: AlternativeNo,
            fatherNo: fatherNo,
            Address: Address,
            BankName: BankName,
            BankAccNo: BankAccNo,
            Ifsc: Ifsc,
            Department: Department,
            Position: Position,
            Role: Role,
            joiningdate: joiningdate,
            workHistory: Array.isArray(workHistory) ? workHistory : JSON.parse(workHistory),
            Education: Array.isArray(Education) ? Education : JSON.parse(Education),
            Language: Language,
            Status: Status,
            AadharCardNo: AadharCardNo,
            PanCardNo: PanCardNo
          }); // Save the new user
          _context3.next = 18;
          return newUser.save();
        case 18:
          savedUser = _context3.sent;
          if (!req.files) {
            _context3.next = 35;
            break;
          }
          fileIds = [];
          _i = 0, _Object$keys = Object.keys(req.files);
        case 22:
          if (!(_i < _Object$keys.length)) {
            _context3.next = 32;
            break;
          }
          fileCategory = _Object$keys[_i];
          file = req.files[fileCategory][0];
          _context3.next = 27;
          return File.uploadFile(file, savedUser._id, fileCategory);
        case 27:
          fileId = _context3.sent;
          fileIds.push(fileId);
        case 29:
          _i++;
          _context3.next = 22;
          break;
        case 32:
          savedUser.files = fileIds; // Assign the array of file IDs to the user's files field
          _context3.next = 35;
          return savedUser.save();
        case 35:
          _context3.next = 37;
          return User.findById(savedUser._id).populate('files');
        case 37:
          populatedUser = _context3.sent;
          res.status(201).json({
            user: populatedUser
          });
          _context3.next = 44;
          break;
        case 41:
          _context3.prev = 41;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: 'Server error'
          });
        case 44:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 41]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Get all users with All fields
exports.getAllUsers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return User.find();
        case 3:
          users = _context4.sent;
          res.json(users);
          _context4.next = 11;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);
          res.status(500).send('Server error');
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Get a user by ID
exports.getUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var userId, authenticatedUserId, isAdmin, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.params.id;
          authenticatedUserId = req.user.id;
          isAdmin = req.user.isAdmin; // Check if the authenticated user is trying to access their own data or if they are an admin
          if (!(userId !== authenticatedUserId && !isAdmin)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            msg: 'Access denied. You can only view your own data.'
          }));
        case 6:
          _context5.next = 8;
          return User.findById(userId);
        case 8:
          user = _context5.sent;
          if (user) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            msg: 'User not found'
          }));
        case 11:
          res.json(user);
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0.message);
          res.status(500).send('Server error');
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Get all users with only 3 fields
exports.getUsers = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          if (!req.user.isAdmin) {
            _context6.next = 7;
            break;
          }
          _context6.next = 4;
          return User.find({}, '_id name email');
        case 4:
          users = _context6.sent;
          _context6.next = 10;
          break;
        case 7:
          _context6.next = 9;
          return User.find({
            _id: req.user.id
          }, '_id name email');
        case 9:
          users = _context6.sent;
        case 10:
          res.json(users);
          _context6.next = 16;
          break;
        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: _context6.t0.message
          });
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 13]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// Update a user
exports.updateUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body4, name, email, password, fatherName, motherName, contactNo, AlternativeNo, fatherNo, Address, BankName, BankAccNo, Ifsc, Department, Position, Role, AadharCardNo, joiningdate, Education, workHistory, Language, Status, userId, user, salt, hashedPassword, updatedUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body4 = req.body, name = _req$body4.name, email = _req$body4.email, password = _req$body4.password, fatherName = _req$body4.fatherName, motherName = _req$body4.motherName, contactNo = _req$body4.contactNo, AlternativeNo = _req$body4.AlternativeNo, fatherNo = _req$body4.fatherNo, Address = _req$body4.Address, BankName = _req$body4.BankName, BankAccNo = _req$body4.BankAccNo, Ifsc = _req$body4.Ifsc, Department = _req$body4.Department, Position = _req$body4.Position, Role = _req$body4.Role, AadharCardNo = _req$body4.AadharCardNo, joiningdate = _req$body4.joiningdate, Education = _req$body4.Education, workHistory = _req$body4.workHistory, Language = _req$body4.Language, Status = _req$body4.Status;
          userId = req.params.id; // Check if the user exists
          _context7.next = 5;
          return User.findById(userId);
        case 5:
          user = _context7.sent;
          if (user) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            msg: 'User not found'
          }));
        case 8:
          // Update the user fields
          user.name = name || user.name;
          user.email = email || user.email;
          user.fatherName = fatherName || user.fatherName;
          user.motherName = motherName || user.motherName;
          user.contactNo = contactNo || user.contactNo;
          user.AlternativeNo = AlternativeNo || user.AlternativeNo;
          user.fatherNo = fatherNo || user.fatherNo;
          user.Address = Address || user.Address;
          user.BankName = BankName || user.BankName;
          user.BankAccNo = BankAccNo || user.BankAccNo;
          user.Ifsc = Ifsc || user.Ifsc;
          user.Department = Department || user.Department;
          user.Position = Position || user.Position;
          user.Role = Role || user.Role;
          user.AadharCardNo = AadharCardNo || user.AadharCardNo;
          user.Education = Education || user.Education;
          user.joiningdate = joiningdate || user.joiningdate;
          user.workHistory = workHistory || user.workHistory;
          user.Language = Language || user.Language;
          user.status = Status || user.status;

          // Update the password if provided
          if (!password) {
            _context7.next = 36;
            break;
          }
          _context7.next = 31;
          return bcrypt.genSalt(10);
        case 31:
          salt = _context7.sent;
          _context7.next = 34;
          return bcrypt.hash(password, salt);
        case 34:
          hashedPassword = _context7.sent;
          user.password = hashedPassword;
        case 36:
          _context7.next = 38;
          return user.save();
        case 38:
          updatedUser = _context7.sent;
          res.json(updatedUser);
          _context7.next = 46;
          break;
        case 42:
          _context7.prev = 42;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0.message);
          res.status(500).send('Server error');
        case 46:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 42]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.deleteUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var userId, user, deletedUser;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          userId = req.params.id; // Check if the user exists
          _context8.next = 4;
          return User.findById(userId);
        case 4:
          user = _context8.sent;
          if (user) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            msg: 'User not found'
          }));
        case 7:
          _context8.next = 9;
          return User.deleteOne({
            _id: userId
          });
        case 9:
          deletedUser = _context8.sent;
          if (!(deletedUser.deletedCount === 0)) {
            _context8.next = 12;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            msg: 'User not found'
          }));
        case 12:
          res.json({
            msg: 'User deleted'
          });
          _context8.next = 19;
          break;
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0.message);
          res.status(500).send('Server error');
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 15]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();