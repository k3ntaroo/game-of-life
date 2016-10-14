/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	window.onload = function () {
	  var GOL = __webpack_require__(1);

	  var dom = document.getElementById('gol-wrapper');

	  var canvas = document.createElement('canvas');
	  canvas.id = 'gol';
	  canvas.height = window.innerHeight;
	  canvas.width = window.innerWidth;

	  dom.appendChild(canvas);

	  new GOL(canvas.width, canvas.height, canvas.getContext('2d')).run();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* constants */
	var DEAD = false;
	var ALIVE = true;
	var CELL_WIDTH = 3;

	var ALIVE_STYLE = 'rgba(100, 255, 100, 1)';
	var DEAD_STYLE = 'rgba(255, 255, 255, 1)';

	var step_vectors = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

	/*
	 * conway's game of life
	 */

	var GOL = function () {
	  /*
	   * parameters of constructor
	   *   height: the number of rows in the field
	   *   width: the number of columns in the field
	   *   context: the context of the canvas
	   */

	  function GOL(height, width, ctx) {
	    _classCallCheck(this, GOL);

	    this.row = Math.floor(height / CELL_WIDTH);
	    this.column = Math.floor(width / CELL_WIDTH);
	    this.ctx = ctx;
	    this.fields = [generateRamdomField(this.row, this.column), generateEmptyField(this.row, this.column)];

	    this.adj_cells = generateField(this.row, this.column, function () {
	      return 0;
	    });

	    this.frame = 0;
	  }

	  _createClass(GOL, [{
	    key: 'run',
	    value: function run() {
	      var FPS = 20;
	      this.renderFieldInit();
	      setInterval(this.proceed.bind(this), 1000 / FPS);
	    }
	  }, {
	    key: 'proceed',
	    value: function proceed() {
	      this.updateField();
	      this.rerenderField();
	      ++this.frame;
	    }
	  }, {
	    key: 'updateField',
	    value: function updateField() {
	      var _this = this;

	      var adj_cells = this.adj_cells;
	      for (var r = 0; r < this.row; ++r) {
	        adj_cells[r].fill(0);
	      }

	      var currentField = this.fields[this.frame % 2];
	      var nextField = this.fields[1 - this.frame % 2];

	      var _loop = function _loop(_r) {
	        var _loop2 = function _loop2(_c) {
	          if (currentField[_r][_c] == ALIVE) {
	            step_vectors.forEach(function (_ref) {
	              var _ref2 = _slicedToArray(_ref, 2);

	              var dr = _ref2[0];
	              var dc = _ref2[1];
	              var ar = _r + dr;
	              var ac = _c + dc;

	              if (0 <= ar && ar < _this.row && 0 <= ac && ac < _this.column) {
	                ++adj_cells[ar][ac];
	              }
	            });
	          }
	        };

	        for (var _c = 0; _c < _this.column; ++_c) {
	          _loop2(_c);
	        }
	      };

	      for (var _r = 0; _r < this.row; ++_r) {
	        _loop(_r);
	      }

	      for (var _r2 = 0; _r2 < this.row; ++_r2) {
	        for (var c = 0; c < this.column; ++c) {
	          // update a cell
	          var adj = adj_cells[_r2][c];
	          if (currentField[_r2][c] == DEAD) {
	            nextField[_r2][c] = adj == 3 ? ALIVE : DEAD;
	          } else {
	            nextField[_r2][c] = adj == 2 || adj == 3 ? ALIVE : DEAD;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'renderFieldInit',
	    value: function renderFieldInit() {
	      var currentField = this.fields[0];

	      this.ctx.fillStyle = DEAD_STYLE;
	      this.ctx.fillRect(this.row * CELL_WIDTH, this.column * CELL_WIDTH, 0, 0);

	      // render ALIVE
	      this.ctx.fillStyle = ALIVE_STYLE;
	      for (var r = 0; r < this.row; ++r) {
	        for (var c = 0; c < this.column; ++c) {
	          if (currentField[r][c] == ALIVE) {
	            this.ctx.fillRect(CELL_WIDTH * r, CELL_WIDTH * c, CELL_WIDTH, CELL_WIDTH);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'rerenderField',
	    value: function rerenderField() {
	      var prevField = this.fields[this.frame % 2];
	      var currentField = this.fields[1 - this.frame % 2];

	      // rerender DEAD -> ALIVE
	      this.ctx.fillStyle = ALIVE_STYLE;
	      for (var r = 0; r < this.row; ++r) {
	        for (var c = 0; c < this.column; ++c) {
	          if (prevField[r][c] == DEAD && currentField[r][c] == ALIVE) {
	            this.ctx.fillRect(CELL_WIDTH * r, CELL_WIDTH * c, CELL_WIDTH, CELL_WIDTH);
	          }
	        }
	      }

	      // rerender ALIVE -> DEAD
	      this.ctx.fillStyle = DEAD_STYLE;
	      for (var _r3 = 0; _r3 < this.row; ++_r3) {
	        for (var _c2 = 0; _c2 < this.column; ++_c2) {
	          if (prevField[_r3][_c2] == ALIVE && currentField[_r3][_c2] == DEAD) {
	            this.ctx.fillRect(CELL_WIDTH * _r3, CELL_WIDTH * _c2, CELL_WIDTH, CELL_WIDTH);
	          }
	        }
	      }
	    }
	  }]);

	  return GOL;
	}();

	/* field generators */

	function generateField(row, column, generator) {
	  var field = new Array(row);
	  for (var j = 0; j < row; ++j) {
	    field[j] = new Array(column);
	    for (var k = 0; k < column; ++k) {
	      field[j][k] = generator();
	    }
	  }

	  return field;
	}

	function generateEmptyField(row, column) {
	  return generateField(row, column, function () {
	    return DEAD;
	  });
	}

	function generateRamdomField(row, column) {
	  return generateField(row, column, function () {
	    return [DEAD, ALIVE][Math.floor(Math.random() * 98) % 2];
	  });
	}

	/* END field generators */

	module.exports = GOL;

/***/ }
/******/ ]);