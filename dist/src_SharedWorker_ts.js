/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FlexLayout"] = factory();
	else
		root["FlexLayout"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SharedWorker.ts":
/*!*****************************!*\
  !*** ./src/SharedWorker.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DragMessage\": () => (/* binding */ DragMessage),\n/* harmony export */   \"DragMessageUpdate\": () => (/* binding */ DragMessageUpdate),\n/* harmony export */   \"PingMessage\": () => (/* binding */ PingMessage),\n/* harmony export */   \"WorkerMessageType\": () => (/* binding */ WorkerMessageType)\n/* harmony export */ });\nconst _self = globalThis;\nconst _instances = [];\n_self.onconnect = function (e) {\n    const port = e.ports[0];\n    _instances.push(port);\n    port.addEventListener(\"message\", function (e) {\n        _instances.forEach((i) => i.postMessage(e.data));\n    });\n    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.\n};\nvar WorkerMessageType;\n(function (WorkerMessageType) {\n    WorkerMessageType[WorkerMessageType[\"Ping\"] = 0] = \"Ping\";\n    WorkerMessageType[WorkerMessageType[\"PositivePingResponse\"] = 1] = \"PositivePingResponse\";\n    WorkerMessageType[WorkerMessageType[\"NegativePingResponse\"] = 2] = \"NegativePingResponse\";\n    WorkerMessageType[WorkerMessageType[\"InitDrag\"] = 3] = \"InitDrag\";\n    WorkerMessageType[WorkerMessageType[\"CoordinatesUpdate\"] = 4] = \"CoordinatesUpdate\";\n    WorkerMessageType[WorkerMessageType[\"Drop\"] = 5] = \"Drop\";\n})(WorkerMessageType || (WorkerMessageType = {}));\nclass PingMessage {\n}\nclass DragMessage extends PingMessage {\n    constructor() {\n        super(...arguments);\n        this.messageType = WorkerMessageType.InitDrag;\n    }\n}\nclass DragMessageUpdate extends PingMessage {\n    constructor() {\n        super(...arguments);\n        this.messageType = WorkerMessageType.CoordinatesUpdate;\n    }\n}\n\n\n//# sourceURL=webpack://FlexLayout/./src/SharedWorker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/SharedWorker.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});