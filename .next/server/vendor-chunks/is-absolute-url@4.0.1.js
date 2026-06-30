"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-absolute-url@4.0.1";
exports.ids = ["vendor-chunks/is-absolute-url@4.0.1"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/is-absolute-url@4.0.1/node_modules/is-absolute-url/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/is-absolute-url@4.0.1/node_modules/is-absolute-url/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isAbsoluteUrl)\n/* harmony export */ });\n// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1\n// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3\nconst ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\\d+\\-.]*?:/;\n\n// Windows paths like `c:\\`\nconst WINDOWS_PATH_REGEX = /^[a-zA-Z]:\\\\/;\n\nfunction isAbsoluteUrl(url) {\n\tif (typeof url !== 'string') {\n\t\tthrow new TypeError(`Expected a \\`string\\`, got \\`${typeof url}\\``);\n\t}\n\n\tif (WINDOWS_PATH_REGEX.test(url)) {\n\t\treturn false;\n\t}\n\n\treturn ABSOLUTE_URL_REGEX.test(url);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vaXMtYWJzb2x1dGUtdXJsQDQuMC4xL25vZGVfbW9kdWxlcy9pcy1hYnNvbHV0ZS11cmwvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQSxzREFBc0QsV0FBVztBQUNqRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhZG1pblxcRGVza3RvcFxcTmlja0xpbnVzIEJsb2dcXG5vZGVfbW9kdWxlc1xcLnBucG1cXGlzLWFic29sdXRlLXVybEA0LjAuMVxcbm9kZV9tb2R1bGVzXFxpcy1hYnNvbHV0ZS11cmxcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNjaGVtZTogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi0zLjFcbi8vIEFic29sdXRlIFVSTDogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYjc2VjdGlvbi00LjNcbmNvbnN0IEFCU09MVVRFX1VSTF9SRUdFWCA9IC9eW2EtekEtWl1bYS16QS1aXFxkK1xcLS5dKj86LztcblxuLy8gV2luZG93cyBwYXRocyBsaWtlIGBjOlxcYFxuY29uc3QgV0lORE9XU19QQVRIX1JFR0VYID0gL15bYS16QS1aXTpcXFxcLztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVybCh1cmwpIHtcblx0aWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgYSBcXGBzdHJpbmdcXGAsIGdvdCBcXGAke3R5cGVvZiB1cmx9XFxgYCk7XG5cdH1cblxuXHRpZiAoV0lORE9XU19QQVRIX1JFR0VYLnRlc3QodXJsKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBBQlNPTFVURV9VUkxfUkVHRVgudGVzdCh1cmwpO1xufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/is-absolute-url@4.0.1/node_modules/is-absolute-url/index.js\n");

/***/ })

};
;