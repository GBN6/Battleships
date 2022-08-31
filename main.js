/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const player = (() => {
  const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  let currentShip = 5;
  function attackSquare(x, y, opponentBoard) {
    return opponentBoard.hitReceived(x, y);
  }

  function playerPlaceShip(x, y, dir) {
    if (!currentShip) return false;
    const placeSuccessfull = board.placeShip(x, y, dir, currentShip - 1);
    if (placeSuccessfull) {
      currentShip -= 1;
    }
    return placeSuccessfull;
  }

  return { board, attackSquare, playerPlaceShip };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const gameboard = () => {
  // All ships
  // 1-Carrier-5
  // 2-Battleship-4
  // 3-Destroyer-3
  // 4-Submarine-3
  // 5-Patrol Boat-2

  const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(5);
  const battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(4);
  const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3);
  const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3);
  const patrol = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(2);

  const allShips = [patrol, submarine, destroyer, battleship, carrier];

  const boardLength = 10;
  const gameboardGrid = Array(boardLength)
    .fill()
    .map(() => Array(boardLength).fill(0));
  const missed = [];

  function isPlacingPossible(x, y, dir, leng) {
    if (dir) {
      for (let i = y; i < y + leng; i++) {
        if (gameboardGrid[x][i]) return false;
      }
    } else {
      for (let i = x; i < x + leng; i++) {
        if (gameboardGrid[i][y]) return false;
      }
    }
    return true;
  }

  function allShipsSunk(sunkValue) {
    return sunkValue.every((el) => el === true);
  }

  // dir values
  // 0: vertical
  // 1: horizontal

  function placeShip(x, y, dir, currentShipName) {
    const currentShip = allShips[currentShipName];

    if (x > boardLength - 1 || y > boardLength - 1) return false;
    if (dir === 1 && y + currentShip.leng < boardLength + 1) {
      if (!isPlacingPossible(x, y, dir, currentShip.leng)) return false;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (i === x && j < y + currentShip.leng && j >= y) {
            gameboardGrid[i][j] = currentShip;
          }
        }
      }
      return currentShip.leng;
    }
    if (dir === 0 && x + currentShip.leng < boardLength + 1) {
      if (!isPlacingPossible(x, y, dir, currentShip.leng)) return false;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (i >= x && i < x + currentShip.leng && j === y) {
            gameboardGrid[i][j] = currentShip;
          }
        }
      }
      return currentShip.leng;
    }
    return false;
  }

  function trackMissedHits(x, y) {
    missed.push([x, y]);
  }

  function hitReceived(x, y) {
    if (gameboardGrid[x][y] === 1) return null;
    if (gameboardGrid[x][y]) {
      gameboardGrid[x][y] = gameboardGrid[x][y].hit();
      return [x, y];
    }

    trackMissedHits(x, y);
    return false;
  }
  return { placeShip, hitReceived, allShipsSunk, missed };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ship = (leng) => {
  let hitCounter = 0;

  function hit() {
    hitCounter += 1;
    return 1;
  }

  function isSunk() {
    if (hitCounter === leng) return true;
    return false;
  }

  return { leng, hit, isSunk };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ship);


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const computer = (() => {
  const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();

  function initializeComputer() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let rngDir = Math.floor(Math.random() * 1);
    let n = 0;
    while (n <= 4) {
      if (board.placeShip(x, y, rngDir, n) === false) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        continue;
      }
      board.placeShip(x, y, rngDir, n);
      rngDir = Math.floor(Math.random() * 1);
      n++;
    }
  }

  function attackSquare(opponentBoard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return opponentBoard.hitReceived(x, y);
  }
  return { board, initializeComputer, attackSquare };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computer);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const playerDrawShips = (x, y, dir, len) => {
  if (dir) {
    for (let i = y; i < y + len; i++) {
      const tile = document.querySelector(`.player-square.x${x}.y${i}`);
      tile.classList.add('ship-placed');
    }
  } else {
    for (let i = x; i < x + len; i++) {
      const tile = document.querySelector(`.player-square.x${i}.y${y}`);
      tile.classList.add('ship-placed');
    }
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerDrawShips);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createGameboard = (() => {
  function board() {
    const playerBoard = document.querySelector('.player-gameboard');
    const computerBoard = document.querySelector('.computer-gameboard');

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.classList.add('player-square');
        square.classList.add(`x${i}`);
        square.classList.add(`y${j}`);
        playerBoard.append(square);
      }
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.classList.add('computer-square');
        square.classList.add(`x${i}`);
        square.classList.add(`y${j}`);
        computerBoard.append(square);
      }
    }
  }

  return { board };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createGameboard);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const controller = (() => {
  const buttonAxis = document.querySelector('.btn-axis');

  const getCoords = (e) => {
    let x;
    let y;

    if (e.target.classList.length === 3) {
      x = e.target.classList[1].charAt(1);
      y = e.target.classList[2].charAt(1);
    }

    return [Number(x), Number(y)];
  };

  const whichAxis = () => {
    if (buttonAxis.textContent === 'Axis: X') {
      return 1;
    }
    return 0;
  };

  const changeAxis = (e) => {
    if (e.target.textContent === 'Axis: X') {
      e.target.textContent = 'Axis: y';
    } else {
      e.target.textContent = 'Axis: X';
    }
  };


  return { getCoords, whichAxis, changeAxis };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (controller);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _DOM_drawShip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _DOM_createBoard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);






_DOM_createBoard__WEBPACK_IMPORTED_MODULE_3__["default"].board();

function playerClick(e) {
  const coords = _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].getCoords(e);
  const dir = _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].whichAxis();
  const lenOfCurShip = _modules_player__WEBPACK_IMPORTED_MODULE_0__["default"].playerPlaceShip(coords[0], coords[1], dir);
  if (lenOfCurShip) (0,_DOM_drawShip__WEBPACK_IMPORTED_MODULE_2__["default"])(coords[0], coords[1], dir, lenOfCurShip);
}

const playerSquare = document.querySelectorAll('.player-square');
playerSquare.forEach((square) => square.addEventListener('click', playerClick));

const axisButton = document.querySelector('.btn-axis');
axisButton.addEventListener('click', _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].changeAxis);

})();

/******/ })()
;