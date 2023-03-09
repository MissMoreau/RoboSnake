var main;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Agent.ts":
/*!**********************!*\
  !*** ./src/Agent.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Agent": () => (/* binding */ Agent),
/* harmony export */   "AgentA": () => (/* binding */ AgentA),
/* harmony export */   "AgentB": () => (/* binding */ AgentB),
/* harmony export */   "AgentC": () => (/* binding */ AgentC),
/* harmony export */   "AgentD": () => (/* binding */ AgentD),
/* harmony export */   "randomMotion": () => (/* binding */ randomMotion)
/* harmony export */ });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// C uses these moves in order, repeatedly
var cycle = ["up", "up", "right", "down", "right"];
function randomMotion(part) {
    var randomNumber = Math.random() * 4; // random float in the half-open range [0, 4)
    var motion;
    if (randomNumber < 1)
        motion = "up";
    else if (randomNumber < 2)
        motion = "down";
    else if (randomNumber < 3)
        motion = "left";
    else
        motion = "right";
    // try not to hit anything
    if (tryMove(motion, part) != "apple" && tryMove(motion, part) != "empty") {
        switch (motion) {
            case "up":
                return "down";
            case "right":
                return "left";
            case "down":
                return "up";
            case "left":
                return "right";
        }
    }
    return motion;
}
function tryMove(motion, screenPart) {
    // the snake is positioned in the center at p[2][2]
    switch (motion) {
        case "left":
            return screenPart[2][1];
        case "right":
            return screenPart[2][3];
        case "up":
            return screenPart[1][2];
        case "down":
            return screenPart[3][2];
    }
}
// This is the parent class for all players
var Agent = /** @class */ (function () {
    function Agent() {
    }
    Agent.prototype.agentMove = function (screenPart) {
        throw new Error("Unimplemented method: agentMove");
    };
    return Agent;
}());

// This is the class for the A player
var AgentA = /** @class */ (function (_super) {
    __extends(AgentA, _super);
    function AgentA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentA.prototype.agentMove = function (screenPart) {
        return "right";
    };
    return AgentA;
}(Agent));

// This is the class for the B player
var AgentB = /** @class */ (function (_super) {
    __extends(AgentB, _super);
    function AgentB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentB.prototype.agentMove = function (screenPart) {
        return randomMotion(screenPart);
    };
    return AgentB;
}(Agent));

var AgentC = /** @class */ (function (_super) {
    __extends(AgentC, _super);
    function AgentC() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        return _this;
    }
    AgentC.prototype.agentMove = function (screenPart) {
        var c = cycle[this.index];
        this.index++;
        this.index = this.index % cycle.length;
        return c;
    };
    return AgentC;
}(Agent));

// This is the class for the D player
var AgentD = /** @class */ (function (_super) {
    __extends(AgentD, _super);
    function AgentD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AgentD.prototype.agentMove = function (screenPart) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (screenPart[j][i] == "apple") {
                    if (i > 3)
                        return "right";
                    else if (i < 3)
                        return "left";
                    else if (j > 3)
                        return "down";
                    else if (j < 3)
                        return "up";
                }
            }
        }
        return randomMotion(screenPart);
    };
    return AgentD;
}(Agent));

// For all users: Add your new agents below following
// the following format:
// export class Agent_ extends Agent {
//   agentMove(screenPart: ScreenPart): Motion {
//     add your functionality here!!!
//   }
// }


/***/ }),

/***/ "./src/DrawingLibrary.ts":
/*!*******************************!*\
  !*** ./src/DrawingLibrary.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canvas": () => (/* binding */ canvas),
/* harmony export */   "fillCell": () => (/* binding */ fillCell),
/* harmony export */   "resetCanvas": () => (/* binding */ resetCanvas),
/* harmony export */   "scheduleNextUpdate": () => (/* binding */ scheduleNextUpdate),
/* harmony export */   "updateApples": () => (/* binding */ updateApples),
/* harmony export */   "updateLost": () => (/* binding */ updateLost)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var timeoutId = null;
function scheduleNextUpdate(milliseconds, update) {
    if (timeoutId)
        clearTimeout(timeoutId);
    timeoutId = setTimeout(update, milliseconds);
}
var canvas = document.getElementById("gameScreen").getContext("2d");
function resetCanvas() {
    if (timeoutId)
        clearTimeout(timeoutId);
    canvas.scale(1, 1);
    canvas.fillStyle = "white";
    canvas.fillRect(0, 0, 500, 500);
}
var CELL_SIZE = 10;
function fillCell(color, left, top) {
    canvas.fillStyle = color;
    canvas.fillRect(left * CELL_SIZE, top * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
function updateLost(player, lost) {
    document.getElementById("lost" + player).innerText = lost.toString();
}
function updateApples(player, apples) {
    document.getElementById("apples" + player).innerText = apples.toString();
}


/***/ }),

/***/ "./src/GameRunner.ts":
/*!***************************!*\
  !*** ./src/GameRunner.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* binding */ Point),
/* harmony export */   "SnakeState": () => (/* binding */ SnakeState),
/* harmony export */   "getScreenPart": () => (/* binding */ getScreenPart),
/* harmony export */   "run": () => (/* binding */ run),
/* harmony export */   "step": () => (/* binding */ step)
/* harmony export */ });
/* harmony import */ var _Agent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Agent */ "./src/Agent.ts");
/* harmony import */ var _DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DrawingLibrary */ "./src/DrawingLibrary.ts");
/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameScreen */ "./src/GameScreen.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());

var SnakeState = /** @class */ (function (_super) {
    __extends(SnakeState, _super);
    function SnakeState(x, y, agent, cell) {
        var _this = _super.call(this, x, y) || this;
        _this.apples = 0;
        _this.lost = false;
        _this.agent = agent;
        _this.cell = cell;
        return _this;
    }
    SnakeState.prototype.setPoint = function (p) {
        this.x = p.x;
        this.y = p.y;
    };
    return SnakeState;
}(Point));

// x and y are the left and top coordinate of a 5x5 square region.
// cells outside the bounds of the board are represented with "outside"
function getScreenPart(screen, s) {
    var part = new Array(5);
    for (var j = 0; j < 5; j++) {
        part[j] = new Array(5);
        for (var i = 0; i < 5; i++) {
            if (s.x + i - 2 >= 0 &&
                s.y - 2 + j >= 0 &&
                s.x - 2 + i < screen.length &&
                s.y - 2 + j < screen.length)
                part[j][i] = screen[s.y + j - 2][s.x + i - 2];
            else
                part[j][i] = "outside";
        }
    }
    return part;
}
// stepTime is a number of milliseconds
function run(stepTime, newApplesEachStep, screen) {
    // player initial positions
    // For users, these four lines are where you will make your changes.
    // You will change the new Agent_() part of any of the below
    // code to fit your added agent. Replace the _ part of that example
    // with the letter of your new agent and you will be good to go!
    var a = new SnakeState(0, 0, new _Agent__WEBPACK_IMPORTED_MODULE_0__.AgentA(), "A");
    var b = new SnakeState(screen.length - 1, 0, new _Agent__WEBPACK_IMPORTED_MODULE_0__.AgentB(), "B");
    var c = new SnakeState(0, screen.length - 1, new _Agent__WEBPACK_IMPORTED_MODULE_0__.AgentC(), "C");
    var d = new SnakeState(screen.length - 1, screen.length - 1, new _Agent__WEBPACK_IMPORTED_MODULE_0__.AgentD(), "D");
    // draw starting screen
    screen[a.y][a.x] = a.cell;
    screen[b.y][b.x] = b.cell;
    screen[c.y][c.x] = c.cell;
    screen[d.y][d.x] = d.cell;
    (0,_GameScreen__WEBPACK_IMPORTED_MODULE_2__.draw)(screen);
    // this will wait for stepTime milliseconds and then call step with these arguments
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.scheduleNextUpdate)(stepTime, function () {
        return step(stepTime, newApplesEachStep, screen, a, b, c, d);
    });
    // the "() =>" part is important!
    // without it, step will get called immediately instead of waiting
}
function locationAfterMotion(motion, snake) {
    switch (motion) {
        case "left":
            return new Point(snake.x - 1, snake.y);
        case "right":
            return new Point(snake.x + 1, snake.y);
        case "up":
            return new Point(snake.x, snake.y - 1);
        case "down":
            return new Point(snake.x, snake.y + 1);
    }
}
function step(stepTime, newApplesEachStep, screen, snakeA, snakeB, snakeC, snakeD) {
    // generate new apples
    for (var i = 0; i < newApplesEachStep; i++) {
        // random integers in the closed range [0, screen.length]
        var x = Math.floor(Math.random() * screen.length);
        var y = Math.floor(Math.random() * screen.length);
        // if we generated coordinates that aren't empty, skip this apple
        if (screen[y][x] == "empty")
            screen[y][x] = "apple";
    }
    // players take turns in order: A -> B -> C -> D -> A -> B -> C -> D -> ...
    snakeA = snakeAction(snakeA, screen);
    snakeB = snakeAction(snakeB, screen);
    snakeC = snakeAction(snakeC, screen);
    snakeD = snakeAction(snakeD, screen);
    // update game screen
    (0,_GameScreen__WEBPACK_IMPORTED_MODULE_2__.draw)(screen);
    // update snake statistics
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateLost)("A", snakeA.lost);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateApples)("A", snakeA.apples);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateLost)("B", snakeB.lost);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateApples)("B", snakeB.apples);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateLost)("C", snakeC.lost);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateApples)("C", snakeC.apples);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateLost)("D", snakeD.lost);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.updateApples)("D", snakeD.apples);
    // run again unless everyone has lost
    if (!snakeA.lost || !snakeB.lost || !snakeC.lost || !snakeD.lost)
        (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_1__.scheduleNextUpdate)(stepTime, function () {
            return step(stepTime, newApplesEachStep, screen, snakeA, snakeB, snakeC, snakeD);
        });
}
// snakeAction generates the turn for the specified player
function snakeAction(snake, screen) {
    if (!snake.lost) {
        var currentLocation = locationAfterMotion(snake.agent.agentMove(getScreenPart(screen, snake)), snake);
        if (currentLocation.x < 0 ||
            currentLocation.y < 0 ||
            currentLocation.x >= screen.length ||
            currentLocation.y >= screen.length)
            // hit the edge of the screen
            snake.lost = true;
        else
            switch (screen[currentLocation.y][currentLocation.x]) {
                case "empty": {
                    // make the move
                    snake.setPoint(currentLocation);
                    screen[currentLocation.y][currentLocation.x] = snake.cell;
                    break;
                }
                case "apple": {
                    // make the move and eat the apple
                    snake.setPoint(currentLocation);
                    snake.apples++;
                    screen[currentLocation.y][currentLocation.x] = snake.cell;
                    break;
                }
                default: {
                    // lose
                    snake.lost = true;
                    break;
                }
            }
    }
    return snake;
}


/***/ }),

/***/ "./src/GameScreen.ts":
/*!***************************!*\
  !*** ./src/GameScreen.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "draw": () => (/* binding */ draw),
/* harmony export */   "initialize": () => (/* binding */ initialize)
/* harmony export */ });
/* harmony import */ var _DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawingLibrary */ "./src/DrawingLibrary.ts");

function initialize(size) {
    var screen = new Array(size);
    for (var i = 0; i < size; i++)
        screen[i] = new Array(size).fill("empty");
    return screen;
}
function draw(screen) {
    for (var y = 0; y < screen.length; y++) {
        for (var x = 0; x < screen.length; x++) {
            switch (screen[y][x]) {
                case "empty":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("white", x, y);
                    break;
                case "apple":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("red", x, y);
                    break;
                case "A":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("green", x, y);
                    break;
                case "B":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("blue", x, y);
                    break;
                case "C":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("orange", x, y);
                    break;
                case "D":
                    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.fillCell)("purple", x, y);
                    break;
            }
        }
    }
}


/***/ })

/******/ 	});
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
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "play": () => (/* binding */ play)
/* harmony export */ });
/* harmony import */ var _DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DrawingLibrary */ "./src/DrawingLibrary.ts");
/* harmony import */ var _GameRunner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameRunner */ "./src/GameRunner.ts");
/* harmony import */ var _GameScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameScreen */ "./src/GameScreen.ts");



function play() {
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.resetCanvas)();
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateLost)("A", false);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateApples)("A", 0);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateLost)("B", false);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateApples)("B", 0);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateLost)("C", false);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateApples)("C", 0);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateLost)("D", false);
    (0,_DrawingLibrary__WEBPACK_IMPORTED_MODULE_0__.updateApples)("D", 0);
    var screen = (0,_GameScreen__WEBPACK_IMPORTED_MODULE_2__.initialize)(50);
    (0,_GameRunner__WEBPACK_IMPORTED_MODULE_1__.run)(1000, 10, screen);
}

})();

main = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDO0lBQzlCLGdEQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0FnZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9EcmF3aW5nTGlicmFyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVJ1bm5lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZVNjcmVlbi50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvTWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXliZUNlbGwsIFNjcmVlblBhcnQgfSBmcm9tIFwiLi9HYW1lUnVubmVyXCI7XHJcblxyXG5leHBvcnQgdHlwZSBQbGF5ZXIgPSBcIkFcIiB8IFwiQlwiIHwgXCJDXCIgfCBcIkRcIjtcclxuXHJcbmV4cG9ydCB0eXBlIE1vdGlvbiA9IFwidXBcIiB8IFwiZG93blwiIHwgXCJsZWZ0XCIgfCBcInJpZ2h0XCI7XHJcblxyXG4vLyBDIHVzZXMgdGhlc2UgbW92ZXMgaW4gb3JkZXIsIHJlcGVhdGVkbHlcclxuY29uc3QgY3ljbGU6IE1vdGlvbltdID0gW1widXBcIiwgXCJ1cFwiLCBcInJpZ2h0XCIsIFwiZG93blwiLCBcInJpZ2h0XCJdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbU1vdGlvbihwYXJ0OiBTY3JlZW5QYXJ0KTogTW90aW9uIHtcclxuICBjb25zdCByYW5kb21OdW1iZXI6IG51bWJlciA9IE1hdGgucmFuZG9tKCkgKiA0OyAvLyByYW5kb20gZmxvYXQgaW4gdGhlIGhhbGYtb3BlbiByYW5nZSBbMCwgNClcclxuXHJcbiAgbGV0IG1vdGlvbjogTW90aW9uO1xyXG4gIGlmIChyYW5kb21OdW1iZXIgPCAxKSBtb3Rpb24gPSBcInVwXCI7XHJcbiAgZWxzZSBpZiAocmFuZG9tTnVtYmVyIDwgMikgbW90aW9uID0gXCJkb3duXCI7XHJcbiAgZWxzZSBpZiAocmFuZG9tTnVtYmVyIDwgMykgbW90aW9uID0gXCJsZWZ0XCI7XHJcbiAgZWxzZSBtb3Rpb24gPSBcInJpZ2h0XCI7XHJcblxyXG4gIC8vIHRyeSBub3QgdG8gaGl0IGFueXRoaW5nXHJcbiAgaWYgKHRyeU1vdmUobW90aW9uLCBwYXJ0KSAhPSBcImFwcGxlXCIgJiYgdHJ5TW92ZShtb3Rpb24sIHBhcnQpICE9IFwiZW1wdHlcIikge1xyXG4gICAgc3dpdGNoIChtb3Rpb24pIHtcclxuICAgICAgY2FzZSBcInVwXCI6XHJcbiAgICAgICAgcmV0dXJuIFwiZG93blwiO1xyXG4gICAgICBjYXNlIFwicmlnaHRcIjpcclxuICAgICAgICByZXR1cm4gXCJsZWZ0XCI7XHJcbiAgICAgIGNhc2UgXCJkb3duXCI6XHJcbiAgICAgICAgcmV0dXJuIFwidXBcIjtcclxuICAgICAgY2FzZSBcImxlZnRcIjpcclxuICAgICAgICByZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1vdGlvbjtcclxufVxyXG5cclxuZnVuY3Rpb24gdHJ5TW92ZShtb3Rpb246IE1vdGlvbiwgc2NyZWVuUGFydDogU2NyZWVuUGFydCk6IE1heWJlQ2VsbCB7XHJcbiAgLy8gdGhlIHNuYWtlIGlzIHBvc2l0aW9uZWQgaW4gdGhlIGNlbnRlciBhdCBwWzJdWzJdXHJcbiAgc3dpdGNoIChtb3Rpb24pIHtcclxuICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgIHJldHVybiBzY3JlZW5QYXJ0WzJdWzFdO1xyXG4gICAgY2FzZSBcInJpZ2h0XCI6XHJcbiAgICAgIHJldHVybiBzY3JlZW5QYXJ0WzJdWzNdO1xyXG4gICAgY2FzZSBcInVwXCI6XHJcbiAgICAgIHJldHVybiBzY3JlZW5QYXJ0WzFdWzJdO1xyXG4gICAgY2FzZSBcImRvd25cIjpcclxuICAgICAgcmV0dXJuIHNjcmVlblBhcnRbM11bMl07XHJcbiAgfVxyXG59XHJcbi8vIFRoaXMgaXMgdGhlIHBhcmVudCBjbGFzcyBmb3IgYWxsIHBsYXllcnNcclxuZXhwb3J0IGNsYXNzIEFnZW50IHtcclxuICBhZ2VudE1vdmUoc2NyZWVuUGFydDogU2NyZWVuUGFydCk6IE1vdGlvbiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmltcGxlbWVudGVkIG1ldGhvZDogYWdlbnRNb3ZlXCIpO1xyXG4gIH1cclxufVxyXG4vLyBUaGlzIGlzIHRoZSBjbGFzcyBmb3IgdGhlIEEgcGxheWVyXHJcbmV4cG9ydCBjbGFzcyBBZ2VudEEgZXh0ZW5kcyBBZ2VudCB7XHJcbiAgYWdlbnRNb3ZlKHNjcmVlblBhcnQ6IFNjcmVlblBhcnQpOiBNb3Rpb24ge1xyXG4gICAgcmV0dXJuIFwicmlnaHRcIjtcclxuICB9XHJcbn1cclxuLy8gVGhpcyBpcyB0aGUgY2xhc3MgZm9yIHRoZSBCIHBsYXllclxyXG5leHBvcnQgY2xhc3MgQWdlbnRCIGV4dGVuZHMgQWdlbnQge1xyXG4gIGFnZW50TW92ZShzY3JlZW5QYXJ0OiBTY3JlZW5QYXJ0KTogTW90aW9uIHtcclxuICAgIHJldHVybiByYW5kb21Nb3Rpb24oc2NyZWVuUGFydCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWdlbnRDIGV4dGVuZHMgQWdlbnQge1xyXG4gIHByaXZhdGUgaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICBhZ2VudE1vdmUoc2NyZWVuUGFydDogU2NyZWVuUGFydCk6IE1vdGlvbiB7XHJcbiAgICBjb25zdCBjOiBNb3Rpb24gPSBjeWNsZVt0aGlzLmluZGV4XTtcclxuICAgIHRoaXMuaW5kZXgrKztcclxuICAgIHRoaXMuaW5kZXggPSB0aGlzLmluZGV4ICUgY3ljbGUubGVuZ3RoO1xyXG4gICAgcmV0dXJuIGM7XHJcbiAgfVxyXG59XHJcbi8vIFRoaXMgaXMgdGhlIGNsYXNzIGZvciB0aGUgRCBwbGF5ZXJcclxuZXhwb3J0IGNsYXNzIEFnZW50RCBleHRlbmRzIEFnZW50IHtcclxuICBhZ2VudE1vdmUoc2NyZWVuUGFydDogU2NyZWVuUGFydCk6IE1vdGlvbiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDU7IGorKykge1xyXG4gICAgICAgIGlmIChzY3JlZW5QYXJ0W2pdW2ldID09IFwiYXBwbGVcIikge1xyXG4gICAgICAgICAgaWYgKGkgPiAzKSByZXR1cm4gXCJyaWdodFwiO1xyXG4gICAgICAgICAgZWxzZSBpZiAoaSA8IDMpIHJldHVybiBcImxlZnRcIjtcclxuICAgICAgICAgIGVsc2UgaWYgKGogPiAzKSByZXR1cm4gXCJkb3duXCI7XHJcbiAgICAgICAgICBlbHNlIGlmIChqIDwgMykgcmV0dXJuIFwidXBcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByYW5kb21Nb3Rpb24oc2NyZWVuUGFydCk7XHJcbiAgfVxyXG59XHJcbi8vIEZvciBhbGwgdXNlcnM6IEFkZCB5b3VyIG5ldyBhZ2VudHMgYmVsb3cgZm9sbG93aW5nXHJcbi8vIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxyXG4vLyBleHBvcnQgY2xhc3MgQWdlbnRfIGV4dGVuZHMgQWdlbnQge1xyXG4vLyAgIGFnZW50TW92ZShzY3JlZW5QYXJ0OiBTY3JlZW5QYXJ0KTogTW90aW9uIHtcclxuLy8gICAgIGFkZCB5b3VyIGZ1bmN0aW9uYWxpdHkgaGVyZSEhIVxyXG4vLyAgIH1cclxuLy8gfVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8taW1wbGllZC1ldmFsICovXHJcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cclxuXHJcbmxldCB0aW1lb3V0SWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVOZXh0VXBkYXRlKG1pbGxpc2Vjb25kczogbnVtYmVyLCB1cGRhdGU6ICgpID0+IGFueSk6IHZvaWQge1xyXG4gIGlmICh0aW1lb3V0SWQpIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xyXG4gIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoPFRpbWVySGFuZGxlcj4gdXBkYXRlLCBtaWxsaXNlY29uZHMpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2FudmFzOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPVxyXG4gICg8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZVNjcmVlblwiKSkuZ2V0Q29udGV4dChcIjJkXCIpITtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXNldENhbnZhcygpOiB2b2lkIHtcclxuICBpZiAodGltZW91dElkKSBjbGVhclRpbWVvdXQodGltZW91dElkKTtcclxuICBjYW52YXMuc2NhbGUoMSwgMSk7XHJcbiAgY2FudmFzLmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICBjYW52YXMuZmlsbFJlY3QoMCwgMCwgNTAwLCA1MDApO1xyXG59XHJcblxyXG5jb25zdCBDRUxMX1NJWkUgPSAxMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWxsQ2VsbChcclxuICBjb2xvcjogc3RyaW5nLFxyXG4gIGxlZnQ6IG51bWJlcixcclxuICB0b3A6IG51bWJlclxyXG4pOiB2b2lkIHtcclxuICBjYW52YXMuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgY2FudmFzLmZpbGxSZWN0KGxlZnQqQ0VMTF9TSVpFLCB0b3AqQ0VMTF9TSVpFLCBDRUxMX1NJWkUsIENFTExfU0laRSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMb3N0KFxyXG4gIHBsYXllcjogXCJBXCIgfCBcIkJcIiB8IFwiQ1wiIHwgXCJEXCIsXHJcbiAgbG9zdDogYm9vbGVhblxyXG4pOiB2b2lkIHtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvc3RcIiArIHBsYXllcikhLmlubmVyVGV4dCA9IGxvc3QudG9TdHJpbmcoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFwcGxlcyhcclxuICBwbGF5ZXI6IFwiQVwiIHwgXCJCXCIgfCBcIkNcIiB8IFwiRFwiLFxyXG4gIGFwcGxlczogbnVtYmVyXHJcbik6IHZvaWQge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwbGVzXCIgKyBwbGF5ZXIpIS5pbm5lclRleHQgPSBhcHBsZXMudG9TdHJpbmcoKTtcclxufSIsImltcG9ydCB7IEFnZW50LCBBZ2VudEEsIEFnZW50QiwgQWdlbnRDLCBBZ2VudEQsIE1vdGlvbiB9IGZyb20gXCIuL0FnZW50XCI7XHJcbmltcG9ydCB7IHNjaGVkdWxlTmV4dFVwZGF0ZSwgdXBkYXRlQXBwbGVzLCB1cGRhdGVMb3N0IH0gZnJvbSBcIi4vRHJhd2luZ0xpYnJhcnlcIjtcclxuaW1wb3J0IHsgQ2VsbCwgZHJhdywgR2FtZVNjcmVlbiB9IGZyb20gXCIuL0dhbWVTY3JlZW5cIjtcclxuXHJcbi8vIGEgTWF5YmVDZWxsIGlzIGVpdGhlciBhIENlbGwgb3IgdGhlIHN0cmluZyBcIm91dHNpZGVcIlxyXG5leHBvcnQgdHlwZSBNYXliZUNlbGwgPSBDZWxsIHwgXCJvdXRzaWRlXCI7XHJcblxyXG4vLyBhIFNjcmVlblBhcnQgaXMgYSA1eDUgYXJyYXkgb2YgTWF5YmVDZWxsIGFycmF5c1xyXG5leHBvcnQgdHlwZSBTY3JlZW5QYXJ0ID0gTWF5YmVDZWxsW11bXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludCB7XHJcbiAgcHVibGljIHg6IG51bWJlcjtcclxuICBwdWJsaWMgeTogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU25ha2VTdGF0ZSBleHRlbmRzIFBvaW50IHtcclxuICBwdWJsaWMgYXBwbGVzOiBudW1iZXI7XHJcbiAgcHVibGljIGxvc3Q6IGJvb2xlYW47XHJcbiAgcHVibGljIGFnZW50OiBBZ2VudDtcclxuICBwdWJsaWMgY2VsbDogQ2VsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGFnZW50OiBBZ2VudCwgY2VsbDogQ2VsbCkge1xyXG4gICAgc3VwZXIoeCwgeSk7IC8vIGNhbGwgUG9pbnQgY29uc3RydWN0b3IgdG8gc2V0IHggYW5kIHlcclxuICAgIHRoaXMuYXBwbGVzID0gMDtcclxuICAgIHRoaXMubG9zdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hZ2VudCA9IGFnZW50O1xyXG4gICAgdGhpcy5jZWxsID0gY2VsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRQb2ludChwOiBQb2ludCk6IHZvaWQge1xyXG4gICAgdGhpcy54ID0gcC54O1xyXG4gICAgdGhpcy55ID0gcC55O1xyXG4gIH1cclxufVxyXG5cclxuLy8geCBhbmQgeSBhcmUgdGhlIGxlZnQgYW5kIHRvcCBjb29yZGluYXRlIG9mIGEgNXg1IHNxdWFyZSByZWdpb24uXHJcbi8vIGNlbGxzIG91dHNpZGUgdGhlIGJvdW5kcyBvZiB0aGUgYm9hcmQgYXJlIHJlcHJlc2VudGVkIHdpdGggXCJvdXRzaWRlXCJcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcmVlblBhcnQoc2NyZWVuOiBHYW1lU2NyZWVuLCBzOiBTbmFrZVN0YXRlKTogU2NyZWVuUGFydCB7XHJcbiAgY29uc3QgcGFydDogU2NyZWVuUGFydCA9IG5ldyBBcnJheTxNYXliZUNlbGxbXT4oNSk7XHJcbiAgZm9yIChsZXQgaiA9IDA7IGogPCA1OyBqKyspIHtcclxuICAgIHBhcnRbal0gPSBuZXcgQXJyYXk8TWF5YmVDZWxsPig1KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBzLnggKyBpIC0gMiA+PSAwICYmXHJcbiAgICAgICAgcy55IC0gMiArIGogPj0gMCAmJlxyXG4gICAgICAgIHMueCAtIDIgKyBpIDwgc2NyZWVuLmxlbmd0aCAmJlxyXG4gICAgICAgIHMueSAtIDIgKyBqIDwgc2NyZWVuLmxlbmd0aFxyXG4gICAgICApXHJcbiAgICAgICAgcGFydFtqXVtpXSA9IHNjcmVlbltzLnkgKyBqIC0gMl1bcy54ICsgaSAtIDJdO1xyXG4gICAgICBlbHNlIHBhcnRbal1baV0gPSBcIm91dHNpZGVcIjtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHBhcnQ7XHJcbn1cclxuXHJcbi8vIHN0ZXBUaW1lIGlzIGEgbnVtYmVyIG9mIG1pbGxpc2Vjb25kc1xyXG5leHBvcnQgZnVuY3Rpb24gcnVuKFxyXG4gIHN0ZXBUaW1lOiBudW1iZXIsXHJcbiAgbmV3QXBwbGVzRWFjaFN0ZXA6IG51bWJlcixcclxuICBzY3JlZW46IEdhbWVTY3JlZW5cclxuKTogdm9pZCB7XHJcbiAgLy8gcGxheWVyIGluaXRpYWwgcG9zaXRpb25zXHJcbiAgLy8gRm9yIHVzZXJzLCB0aGVzZSBmb3VyIGxpbmVzIGFyZSB3aGVyZSB5b3Ugd2lsbCBtYWtlIHlvdXIgY2hhbmdlcy5cclxuICAvLyBZb3Ugd2lsbCBjaGFuZ2UgdGhlIG5ldyBBZ2VudF8oKSBwYXJ0IG9mIGFueSBvZiB0aGUgYmVsb3dcclxuICAvLyBjb2RlIHRvIGZpdCB5b3VyIGFkZGVkIGFnZW50LiBSZXBsYWNlIHRoZSBfIHBhcnQgb2YgdGhhdCBleGFtcGxlXHJcbiAgLy8gd2l0aCB0aGUgbGV0dGVyIG9mIHlvdXIgbmV3IGFnZW50IGFuZCB5b3Ugd2lsbCBiZSBnb29kIHRvIGdvIVxyXG4gIGNvbnN0IGEgPSBuZXcgU25ha2VTdGF0ZSgwLCAwLCBuZXcgQWdlbnRBKCksIFwiQVwiKTtcclxuICBjb25zdCBiID0gbmV3IFNuYWtlU3RhdGUoc2NyZWVuLmxlbmd0aCAtIDEsIDAsIG5ldyBBZ2VudEIoKSwgXCJCXCIpO1xyXG4gIGNvbnN0IGMgPSBuZXcgU25ha2VTdGF0ZSgwLCBzY3JlZW4ubGVuZ3RoIC0gMSwgbmV3IEFnZW50QygpLCBcIkNcIik7XHJcbiAgY29uc3QgZCA9IG5ldyBTbmFrZVN0YXRlKFxyXG4gICAgc2NyZWVuLmxlbmd0aCAtIDEsXHJcbiAgICBzY3JlZW4ubGVuZ3RoIC0gMSxcclxuICAgIG5ldyBBZ2VudEQoKSxcclxuICAgIFwiRFwiXHJcbiAgKTtcclxuXHJcbiAgLy8gZHJhdyBzdGFydGluZyBzY3JlZW5cclxuICBzY3JlZW5bYS55XVthLnhdID0gYS5jZWxsO1xyXG4gIHNjcmVlbltiLnldW2IueF0gPSBiLmNlbGw7XHJcbiAgc2NyZWVuW2MueV1bYy54XSA9IGMuY2VsbDtcclxuICBzY3JlZW5bZC55XVtkLnhdID0gZC5jZWxsO1xyXG4gIGRyYXcoc2NyZWVuKTtcclxuXHJcbiAgLy8gdGhpcyB3aWxsIHdhaXQgZm9yIHN0ZXBUaW1lIG1pbGxpc2Vjb25kcyBhbmQgdGhlbiBjYWxsIHN0ZXAgd2l0aCB0aGVzZSBhcmd1bWVudHNcclxuICBzY2hlZHVsZU5leHRVcGRhdGUoc3RlcFRpbWUsICgpID0+XHJcbiAgICBzdGVwKHN0ZXBUaW1lLCBuZXdBcHBsZXNFYWNoU3RlcCwgc2NyZWVuLCBhLCBiLCBjLCBkKVxyXG4gICk7XHJcbiAgLy8gdGhlIFwiKCkgPT5cIiBwYXJ0IGlzIGltcG9ydGFudCFcclxuICAvLyB3aXRob3V0IGl0LCBzdGVwIHdpbGwgZ2V0IGNhbGxlZCBpbW1lZGlhdGVseSBpbnN0ZWFkIG9mIHdhaXRpbmdcclxufVxyXG5cclxuZnVuY3Rpb24gbG9jYXRpb25BZnRlck1vdGlvbihtb3Rpb246IE1vdGlvbiwgc25ha2U6IFNuYWtlU3RhdGUpOiBQb2ludCB7XHJcbiAgc3dpdGNoIChtb3Rpb24pIHtcclxuICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgIHJldHVybiBuZXcgUG9pbnQoc25ha2UueCAtIDEsIHNuYWtlLnkpO1xyXG4gICAgY2FzZSBcInJpZ2h0XCI6XHJcbiAgICAgIHJldHVybiBuZXcgUG9pbnQoc25ha2UueCArIDEsIHNuYWtlLnkpO1xyXG4gICAgY2FzZSBcInVwXCI6XHJcbiAgICAgIHJldHVybiBuZXcgUG9pbnQoc25ha2UueCwgc25ha2UueSAtIDEpO1xyXG4gICAgY2FzZSBcImRvd25cIjpcclxuICAgICAgcmV0dXJuIG5ldyBQb2ludChzbmFrZS54LCBzbmFrZS55ICsgMSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RlcChcclxuICBzdGVwVGltZTogbnVtYmVyLFxyXG4gIG5ld0FwcGxlc0VhY2hTdGVwOiBudW1iZXIsXHJcbiAgc2NyZWVuOiBHYW1lU2NyZWVuLFxyXG4gIHNuYWtlQTogU25ha2VTdGF0ZSxcclxuICBzbmFrZUI6IFNuYWtlU3RhdGUsXHJcbiAgc25ha2VDOiBTbmFrZVN0YXRlLFxyXG4gIHNuYWtlRDogU25ha2VTdGF0ZVxyXG4pOiB2b2lkIHtcclxuICAvLyBnZW5lcmF0ZSBuZXcgYXBwbGVzXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdBcHBsZXNFYWNoU3RlcDsgaSsrKSB7XHJcbiAgICAvLyByYW5kb20gaW50ZWdlcnMgaW4gdGhlIGNsb3NlZCByYW5nZSBbMCwgc2NyZWVuLmxlbmd0aF1cclxuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzY3JlZW4ubGVuZ3RoKTtcclxuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzY3JlZW4ubGVuZ3RoKTtcclxuICAgIC8vIGlmIHdlIGdlbmVyYXRlZCBjb29yZGluYXRlcyB0aGF0IGFyZW4ndCBlbXB0eSwgc2tpcCB0aGlzIGFwcGxlXHJcbiAgICBpZiAoc2NyZWVuW3ldW3hdID09IFwiZW1wdHlcIikgc2NyZWVuW3ldW3hdID0gXCJhcHBsZVwiO1xyXG4gIH1cclxuXHJcbiAgLy8gcGxheWVycyB0YWtlIHR1cm5zIGluIG9yZGVyOiBBIC0+IEIgLT4gQyAtPiBEIC0+IEEgLT4gQiAtPiBDIC0+IEQgLT4gLi4uXHJcbiAgc25ha2VBID0gc25ha2VBY3Rpb24oc25ha2VBLCBzY3JlZW4pO1xyXG4gIHNuYWtlQiA9IHNuYWtlQWN0aW9uKHNuYWtlQiwgc2NyZWVuKTtcclxuICBzbmFrZUMgPSBzbmFrZUFjdGlvbihzbmFrZUMsIHNjcmVlbik7XHJcbiAgc25ha2VEID0gc25ha2VBY3Rpb24oc25ha2VELCBzY3JlZW4pO1xyXG5cclxuICAvLyB1cGRhdGUgZ2FtZSBzY3JlZW5cclxuICBkcmF3KHNjcmVlbik7XHJcblxyXG4gIC8vIHVwZGF0ZSBzbmFrZSBzdGF0aXN0aWNzXHJcbiAgdXBkYXRlTG9zdChcIkFcIiwgc25ha2VBLmxvc3QpO1xyXG4gIHVwZGF0ZUFwcGxlcyhcIkFcIiwgc25ha2VBLmFwcGxlcyk7XHJcbiAgdXBkYXRlTG9zdChcIkJcIiwgc25ha2VCLmxvc3QpO1xyXG4gIHVwZGF0ZUFwcGxlcyhcIkJcIiwgc25ha2VCLmFwcGxlcyk7XHJcbiAgdXBkYXRlTG9zdChcIkNcIiwgc25ha2VDLmxvc3QpO1xyXG4gIHVwZGF0ZUFwcGxlcyhcIkNcIiwgc25ha2VDLmFwcGxlcyk7XHJcbiAgdXBkYXRlTG9zdChcIkRcIiwgc25ha2VELmxvc3QpO1xyXG4gIHVwZGF0ZUFwcGxlcyhcIkRcIiwgc25ha2VELmFwcGxlcyk7XHJcblxyXG4gIC8vIHJ1biBhZ2FpbiB1bmxlc3MgZXZlcnlvbmUgaGFzIGxvc3RcclxuICBpZiAoIXNuYWtlQS5sb3N0IHx8ICFzbmFrZUIubG9zdCB8fCAhc25ha2VDLmxvc3QgfHwgIXNuYWtlRC5sb3N0KVxyXG4gICAgc2NoZWR1bGVOZXh0VXBkYXRlKHN0ZXBUaW1lLCAoKSA9PlxyXG4gICAgICBzdGVwKHN0ZXBUaW1lLCBuZXdBcHBsZXNFYWNoU3RlcCwgc2NyZWVuLCBzbmFrZUEsIHNuYWtlQiwgc25ha2VDLCBzbmFrZUQpXHJcbiAgICApO1xyXG59XHJcblxyXG4vLyBzbmFrZUFjdGlvbiBnZW5lcmF0ZXMgdGhlIHR1cm4gZm9yIHRoZSBzcGVjaWZpZWQgcGxheWVyXHJcbmZ1bmN0aW9uIHNuYWtlQWN0aW9uKHNuYWtlOiBTbmFrZVN0YXRlLCBzY3JlZW46IEdhbWVTY3JlZW4pOiBTbmFrZVN0YXRlIHtcclxuICBpZiAoIXNuYWtlLmxvc3QpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRMb2NhdGlvbiA9IGxvY2F0aW9uQWZ0ZXJNb3Rpb24oXHJcbiAgICAgIHNuYWtlLmFnZW50LmFnZW50TW92ZShnZXRTY3JlZW5QYXJ0KHNjcmVlbiwgc25ha2UpKSxcclxuICAgICAgc25ha2VcclxuICAgICk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGN1cnJlbnRMb2NhdGlvbi54IDwgMCB8fFxyXG4gICAgICBjdXJyZW50TG9jYXRpb24ueSA8IDAgfHxcclxuICAgICAgY3VycmVudExvY2F0aW9uLnggPj0gc2NyZWVuLmxlbmd0aCB8fFxyXG4gICAgICBjdXJyZW50TG9jYXRpb24ueSA+PSBzY3JlZW4ubGVuZ3RoXHJcbiAgICApXHJcbiAgICAgIC8vIGhpdCB0aGUgZWRnZSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgIHNuYWtlLmxvc3QgPSB0cnVlO1xyXG4gICAgZWxzZVxyXG4gICAgICBzd2l0Y2ggKHNjcmVlbltjdXJyZW50TG9jYXRpb24ueV1bY3VycmVudExvY2F0aW9uLnhdKSB7XHJcbiAgICAgICAgY2FzZSBcImVtcHR5XCI6IHtcclxuICAgICAgICAgIC8vIG1ha2UgdGhlIG1vdmVcclxuICAgICAgICAgIHNuYWtlLnNldFBvaW50KGN1cnJlbnRMb2NhdGlvbik7XHJcbiAgICAgICAgICBzY3JlZW5bY3VycmVudExvY2F0aW9uLnldW2N1cnJlbnRMb2NhdGlvbi54XSA9IHNuYWtlLmNlbGw7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBcImFwcGxlXCI6IHtcclxuICAgICAgICAgIC8vIG1ha2UgdGhlIG1vdmUgYW5kIGVhdCB0aGUgYXBwbGVcclxuICAgICAgICAgIHNuYWtlLnNldFBvaW50KGN1cnJlbnRMb2NhdGlvbik7XHJcbiAgICAgICAgICBzbmFrZS5hcHBsZXMrKztcclxuICAgICAgICAgIHNjcmVlbltjdXJyZW50TG9jYXRpb24ueV1bY3VycmVudExvY2F0aW9uLnhdID0gc25ha2UuY2VsbDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAvLyBsb3NlXHJcbiAgICAgICAgICBzbmFrZS5sb3N0ID0gdHJ1ZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHNuYWtlO1xyXG59XHJcbiIsImltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL0FnZW50XCI7XHJcbmltcG9ydCB7IGZpbGxDZWxsIH0gZnJvbSBcIi4vRHJhd2luZ0xpYnJhcnlcIjtcclxuXHJcbi8vIGEgQ2VsbCBpcyBlaXRoZXIgYSBQbGF5ZXIgb3IgdGhlIHN0cmluZyBcImVtcHR5XCIgb3IgXCJhcHBsZVwiXHJcbmV4cG9ydCB0eXBlIENlbGwgPSBQbGF5ZXIgfCBcImVtcHR5XCIgfCBcImFwcGxlXCI7XHJcblxyXG4vLyBhIEdhbWVTY3JlZW4gaXMgYW4gYXJyYXkgb2YgQ2VsbCBhcnJheXNcclxuZXhwb3J0IHR5cGUgR2FtZVNjcmVlbiA9IENlbGxbXVtdOyAvLyByb3ctbWFqb3Igb3JkZXIsIHNob3VsZCBhbHdheXMgaGF2ZSBzcXVhcmUgZGltZW5zaW9uc1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoc2l6ZTogbnVtYmVyKTogR2FtZVNjcmVlbiB7XHJcbiAgY29uc3Qgc2NyZWVuID0gbmV3IEFycmF5PENlbGxbXT4oc2l6ZSk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspXHJcbiAgICBzY3JlZW5baV0gPSBuZXcgQXJyYXk8Q2VsbD4oc2l6ZSkuZmlsbChcImVtcHR5XCIpO1xyXG4gIHJldHVybiBzY3JlZW47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3KHNjcmVlbjogR2FtZVNjcmVlbik6IHZvaWQge1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgc2NyZWVuLmxlbmd0aDsgeSsrKSB7XHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNjcmVlbi5sZW5ndGg7IHgrKykge1xyXG4gICAgICBzd2l0Y2ggKHNjcmVlblt5XVt4XSkge1xyXG4gICAgICAgIGNhc2UgXCJlbXB0eVwiOlxyXG4gICAgICAgICAgZmlsbENlbGwoXCJ3aGl0ZVwiLCB4LCB5KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlIFwiYXBwbGVcIjpcclxuICAgICAgICAgIGZpbGxDZWxsKFwicmVkXCIsIHgsIHkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgXCJBXCI6XHJcbiAgICAgICAgICBmaWxsQ2VsbChcImdyZWVuXCIsIHgsIHkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgXCJCXCI6XHJcbiAgICAgICAgICBmaWxsQ2VsbChcImJsdWVcIiwgeCwgeSk7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSBcIkNcIjpcclxuICAgICAgICAgIGZpbGxDZWxsKFwib3JhbmdlXCIsIHgsIHkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgXCJEXCI6XHJcbiAgICAgICAgICBmaWxsQ2VsbChcInB1cnBsZVwiLCB4LCB5KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVzZXRDYW52YXMsIHVwZGF0ZUFwcGxlcywgdXBkYXRlTG9zdCB9IGZyb20gXCIuL0RyYXdpbmdMaWJyYXJ5XCI7XHJcbmltcG9ydCB7IHJ1biB9IGZyb20gXCIuL0dhbWVSdW5uZXJcIjtcclxuaW1wb3J0IHsgaW5pdGlhbGl6ZSB9IGZyb20gXCIuL0dhbWVTY3JlZW5cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwbGF5KCk6IHZvaWQge1xyXG4gIHJlc2V0Q2FudmFzKCk7XHJcbiAgdXBkYXRlTG9zdChcIkFcIiwgZmFsc2UpOyB1cGRhdGVBcHBsZXMoXCJBXCIsIDApO1xyXG4gIHVwZGF0ZUxvc3QoXCJCXCIsIGZhbHNlKTsgdXBkYXRlQXBwbGVzKFwiQlwiLCAwKTtcclxuICB1cGRhdGVMb3N0KFwiQ1wiLCBmYWxzZSk7IHVwZGF0ZUFwcGxlcyhcIkNcIiwgMCk7XHJcbiAgdXBkYXRlTG9zdChcIkRcIiwgZmFsc2UpOyB1cGRhdGVBcHBsZXMoXCJEXCIsIDApO1xyXG4gIGNvbnN0IHNjcmVlbiA9IGluaXRpYWxpemUoNTApO1xyXG4gIHJ1bigxMDAwLCAxMCwgc2NyZWVuKTtcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==