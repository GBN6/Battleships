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


const player = () => {
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
};

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

  const boat5 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(5);
  const boat4 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(4);
  const boat3 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3);
  const boat2 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(3);
  const boat1 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(2);

  const allShips = [boat1, boat2, boat3, boat4, boat5];

  const boardLength = 10;
  let counterHover = 4;
  const gameboardGrid = Array(boardLength)
    .fill()
    .map(() => Array(boardLength).fill(0));

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

  function allShipsSunk(ships) {
    const sunkValue = ships.map((boat) => boat.isSunk());
    return sunkValue.every((value) => value === true);
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
      counterHover -= 1; 
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
      counterHover -= 1;
      return currentShip.leng;
    }
    return false;
  }

  function hitReceived(x, y) {
    if (gameboardGrid[x][y] === 1) return null;
    if (gameboardGrid[x][y]) {
      gameboardGrid[x][y] = gameboardGrid[x][y].hit();
      if (allShipsSunk(allShips)) return [x, y, 1, 0];
      return [x, y, 1];
    }

    gameboardGrid[x][y] = 1;
    return [x, y, 0];
  }

  function shipToHover() {
    if (counterHover === -1) return false;
    return allShips[counterHover].leng;
  }

  return { placeShip, hitReceived, allShipsSunk, shipToHover };
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


const computer = () => {
  const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();

  function randomBoat(len) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const rngDir = Math.floor(Math.random() * 1);

    const place = board.placeShip(x, y, rngDir, len);

    if (!place) {
      randomBoat(len);
    }
  }

  function initializeComputerBoats() {
    randomBoat(0);
    randomBoat(1);
    randomBoat(2);
    randomBoat(3);
    randomBoat(4);
  }

  function attackSquare(opponentBoard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const attack = opponentBoard.hitReceived(x, y);

    if (attack === null) {
      return attackSquare(opponentBoard);
    }
    return attack;
  }
  return { board, initializeComputerBoats, attackSquare };
};

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
      const square = document.querySelector(`.player-square.x${x}.y${i}`);
      square.classList.add('ship-placed');
    }
  } else {
    for (let i = x; i < x + len; i++) {
      const square = document.querySelector(`.player-square.x${i}.y${y}`);
      square.classList.add('ship-placed');
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

    while (playerBoard.firstChild) {
      playerBoard.removeChild(playerBoard.firstChild);
    }

    while (computerBoard.firstChild) {
      computerBoard.removeChild(computerBoard.firstChild);
    }

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

  function clearHover() {
    const playerSquare = document.querySelectorAll('.player-square');

    playerSquare.forEach((tile) => tile.classList.remove('hover'));
  }

  return { board, clearHover };
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
      return [Number(x), Number(y)];
    }
    return false;
  };

  const whichAxis = () => {
    if (buttonAxis.textContent === 'Axis: X') {
      return 1;
    }
    return 0;
  };

  const changeAxis = (e) => {
    if (e.target.textContent === 'Axis: X') {
      e.target.textContent = 'Axis: Y';
    } else {
      e.target.textContent = 'Axis: X';
    }
  };

  return { getCoords, whichAxis, changeAxis };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (controller);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const hoverShip = (() => {
  const boardLength = 10;

  function isPlacingPossible(x, y, dir, leng) {
    if (dir) {
      for (let i = y; i < y + leng; i++) {
        const square = document.querySelector(`.player-square.x${x}.y${i}`);
        if (
          square.classList.contains('ship-placed') ||
          square.classList.contains('hover')
        ) {
          return false;
        }
      }
    } else {
      for (let i = x; i < x + leng; i++) {
        const square = document.querySelector(`.player-square.x${i}.y${y}`);
        if (
          square.classList.contains('ship-placed') ||
          square.classList.contains('hover')
        ) {
          return false;
        }
      }
    }
    return true;
  }

  function hover(x, y, dir, len) {
    if (x > boardLength - 1 || y > boardLength - 1) return;
    if (dir === 1 && y + len < boardLength + 1) {
      if (!isPlacingPossible(x, y, dir, len)) return;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (i === x && j < y + len && j >= y) {
            document
              .querySelector(`.player-square.x${i}.y${j}`)
              .classList.add('hover');
          }
        }
      }
    }
    if (dir === 0 && x + len < boardLength + 1) {
      if (!isPlacingPossible(x, y, dir, len)) return;
      for (let i = 0; i < boardLength; i++) {
        for (let j = 0; j < boardLength; j++) {
          if (i >= x && i < x + len && j === y) {
            document
              .querySelector(`.player-square.x${i}.y${j}`)
              .classList.add('hover');
          }
        }
      }
    }
  }
  return { hover };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hoverShip);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const gameover = (() => {
  function gameoverDisplayWinner(winner) {
    const playerInstruction = document.querySelector('.player-instructions');
    if (winner === 'player') {
      playerInstruction.textContent = 'Game over! Player WON';
      playerInstruction.classList.add('winner');
    } else {
      playerInstruction.textContent = 'Game over! Computer WON';
      playerInstruction.classList.add('loser');
    }

    const buttonReset = document.createElement('button');
    buttonReset.textContent = 'Restart';
    buttonReset.classList.add('btn-reset');
    document.querySelector('.reset').append(buttonReset);
  }

  return { gameoverDisplayWinner };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameover);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function updateInstruction(option) {
  const playerInstruction = document.querySelector('.player-instructions');
  if (option === 1) {
    playerInstruction.textContent = 'Now attack your opponent';
  } else if (option === 2) {
    playerInstruction.textContent = 'Place your ships first';
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateInstruction);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const showAttackedSquare = (array, board) => {
  const attackedSquare = document.querySelector(
    `.${board}.x${array[0]}.y${array[1]}`
  );

  if (array[2]) {
    attackedSquare.classList.add('hit');
  } else {
    attackedSquare.classList.add('miss');
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showAttackedSquare);


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
/* harmony import */ var _DOM_hoverShip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _DOM_gameover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _DOM_updateInstructions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _DOM_showAttackedSquare__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);










let players = (0,_modules_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
let comp = (0,_modules_computer__WEBPACK_IMPORTED_MODULE_1__["default"])();

_DOM_createBoard__WEBPACK_IMPORTED_MODULE_3__["default"].board();
comp.initializeComputerBoats();

const axisButton = document.querySelector('.btn-axis');
const playerSquare = document.querySelectorAll('.player-square');
const compSquare = document.querySelectorAll('.computer-square');

function playerAttack(e) {
  const coords = _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].getCoords(e);
  if (!coords) return;
  let attackResult = players.attackSquare(coords[0], coords[1], comp.board);

  (0,_DOM_showAttackedSquare__WEBPACK_IMPORTED_MODULE_8__["default"])(attackResult, 'computer-square');
  if (attackResult === 4) {
    _DOM_gameover__WEBPACK_IMPORTED_MODULE_6__["default"].gameoverDisplayWinner('player');
    const resetButton = document.querySelector('.btn-reset');
    resetButton.addEventListener('click', resetGame);
    compSquare.forEach((square) =>
      square.removeEventListener('click', playerAttack)
    );
    return;
  }
  attackResult = comp.attackSquare(players.board);
  (0,_DOM_showAttackedSquare__WEBPACK_IMPORTED_MODULE_8__["default"])(attackResult, 'player-square');

  if (attackResult === 4) {
    _DOM_gameover__WEBPACK_IMPORTED_MODULE_6__["default"].gameoverDisplayWinner('computer');
    const resetButton = document.querySelector('.btn-reset');
    resetButton.addEventListener('click', resetGame);
    compSquare.forEach((square) =>
      square.removeEventListener('click', playerAttack)
    );
  }
}

function playerPlaceShip(e) {
  _DOM_createBoard__WEBPACK_IMPORTED_MODULE_3__["default"].clearHover();
  const coords = _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].getCoords(e);
  const dir = _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].whichAxis();
  const lenOfCurShip = players.playerPlaceShip(coords[0], coords[1], dir);
  (0,_DOM_drawShip__WEBPACK_IMPORTED_MODULE_2__["default"])(coords[0], coords[1], dir, lenOfCurShip);
  if (lenOfCurShip === 2) {
    (0,_DOM_updateInstructions__WEBPACK_IMPORTED_MODULE_7__["default"])(1);
    compSquare.forEach((square) =>
      square.addEventListener('click', playerAttack)
    );
  }
}

function playerShipHover(e) {
  const hoverCounter = players.board.shipToHover();
  if (!hoverCounter) {
    playerSquare.forEach((square) =>
      square.removeEventListener('mouseover', playerShipHover)
    );
    playerSquare.forEach((square) =>
      square.removeEventListener('mouseleave', playerShipHover)
    );
  }
  const coords = _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].getCoords(e);
  const direction = _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].whichAxis();
  _DOM_createBoard__WEBPACK_IMPORTED_MODULE_3__["default"].clearHover();
  _DOM_hoverShip__WEBPACK_IMPORTED_MODULE_5__["default"].hover(coords[0], coords[1], direction, hoverCounter);
}

function resetGame() {
  _DOM_createBoard__WEBPACK_IMPORTED_MODULE_3__["default"].board();
  players = (0,_modules_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
  comp = (0,_modules_computer__WEBPACK_IMPORTED_MODULE_1__["default"])();
  comp.initializeComputerBoats();

  playerSquare.forEach((square) =>
    square.addEventListener('click', playerPlaceShip)
  );
  playerSquare.forEach((square) =>
    square.addEventListener('mouseover', playerShipHover)
  );
  playerSquare.forEach((square) =>
    square.addEventListener('mouseleave', playerShipHover)
  );
  axisButton.addEventListener('click', _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].changeAxis);

  const resetButton = document.querySelector('.btn-reset');
  resetButton.remove();
  (0,_DOM_updateInstructions__WEBPACK_IMPORTED_MODULE_7__["default"])(2);
}

playerSquare.forEach((square) =>
  square.addEventListener('click', playerPlaceShip)
);

playerSquare.forEach((square) =>
  square.addEventListener('mouseover', playerShipHover)
);
playerSquare.forEach((square) =>
  square.addEventListener('mouseleave', playerShipHover)
);

axisButton.addEventListener('click', _DOM_getAxisAndCoords__WEBPACK_IMPORTED_MODULE_4__["default"].changeAxis);

})();

/******/ })()
;