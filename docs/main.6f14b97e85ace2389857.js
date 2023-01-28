/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./projects/async/index.js":
/*!*********************************!*\
  !*** ./projects/async/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isMatching\": () => (/* binding */ isMatching),\n/* harmony export */   \"loadTowns\": () => (/* binding */ loadTowns)\n/* harmony export */ });\n/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ \"./projects/async/styles/main.css\");\n/*\n Страница должна предварительно загрузить список городов из\n https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json\n и отсортировать в алфавитном порядке.\n\n При вводе в текстовое поле, под ним должен появляться список тех городов,\n в названии которых, хотя бы частично, есть введенное значение.\n Регистр символов учитываться не должен, то есть \"Moscow\" и \"moscow\" - одинаковые названия.\n\n Во время загрузки городов, на странице должна быть надпись \"Загрузка...\"\n После окончания загрузки городов, надпись исчезает и появляется текстовое поле.\n\n Разметку смотрите в файле towns.html\n\n Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер\n\n *** Часть со звездочкой ***\n Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),\n то необходимо показать надпись \"Не удалось загрузить города\" и кнопку \"Повторить\".\n При клике на кнопку, процесс загрузки повторяется заново\n */\n\n/*\n homeworkContainer - это контейнер для всех ваших домашних заданий\n Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер\n\n Пример:\n   const newDiv = document.createElement('div');\n   homeworkContainer.appendChild(newDiv);\n */\n\nconst homeworkContainer = document.querySelector('#app');\n\n/*\n Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения\n\n Массив городов пожно получить отправив асинхронный запрос по адресу\n https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json\n */\n/*\n Функция должна проверять встречается ли подстрока chunk в строке full\n Проверка должна происходить без учета регистра символов\n\n Пример:\n   isMatching('Moscow', 'moscow') // true\n   isMatching('Moscow', 'mosc') // true\n   isMatching('Moscow', 'cow') // true\n   isMatching('Moscow', 'SCO') // true\n   isMatching('Moscow', 'Moscov') // false\n */\nfunction isMatching(full, chunk) {}\n\n/* Блок с надписью \"Загрузка\" */\nconst loadingBlock = homeworkContainer.querySelector('#loading-block');\n/* Блок с надписью \"Не удалось загрузить города\" и кнопкой \"Повторить\" */\nconst loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');\n/* Кнопка \"Повторить\" */\nconst retryButton = homeworkContainer.querySelector('#retry-button');\n/* Блок с текстовым полем и результатом поиска */\nconst filterBlock = homeworkContainer.querySelector('#filter-block');\n/* Текстовое поле для поиска по городам */\nconst filterInput = homeworkContainer.querySelector('#filter-input');\n/* Блок с результатами поиска */\nconst filterResult = homeworkContainer.querySelector('#filter-result');\n\n/*--------------------------------------------------------*/\n\nretryButton.addEventListener('click', () => {\n  requestTownsAPI();\n});\nfilterInput.addEventListener('focus', e => {\n  e.preventDefault();\n});\nfilterInput.addEventListener('input', function (e) {\n  filterResult.textContent = '';\n  const value = e.target.value;\n  if (value !== '') {\n    const result = TOWNS_RESULT.filter(itm => {\n      return itm.includes(e.target.value.toLowerCase());\n    });\n    let template = ``;\n    result.forEach(itm => {\n      // const el = document.createElement('span');\n      // el.classList.add('list-item');\n      // el.textContent = itm;\n      //filterResult.appendChild(el);\n\n      const arr = itm.split(value);\n      const out_arr = [];\n      for (let i = 0; i < arr.length; i++) {\n        out_arr.push(arr[i]);\n        if (i < arr.length - 1) out_arr.push(`<span class='mark'>${value}</span>`);\n      }\n      template += `<span class='list-item'>${out_arr.join('')}</span>`;\n    });\n    filterResult.innerHTML = template;\n  }\n});\n\n/* ------------------------------------------ */\nconst TOWNS_API_PATH = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';\nlet TOWNS_RESULT = [];\nasync function loadTowns() {\n  let resp = await fetch(TOWNS_API_PATH);\n  resp = await resp.json();\n  return resp.map(item => item.name).sort();\n}\nconst app_states = {\n  loading: () => {\n    console.log('Loading...');\n    loadingBlock.classList.remove('hidden');\n    loadingFailedBlock.classList.add('hidden');\n    filterBlock.classList.add('hidden');\n  },\n  fail: () => {\n    console.log('Fail !');\n    loadingBlock.classList.add('hidden');\n    loadingFailedBlock.classList.remove('hidden');\n    filterBlock.classList.add('hidden');\n  },\n  full: () => {\n    console.log('Loading Full !');\n    loadingBlock.classList.add('hidden');\n    loadingFailedBlock.classList.add('hidden');\n    filterBlock.classList.remove('hidden');\n  }\n};\nfunction requestTownsAPI() {\n  app_states.loading();\n  loadTowns().then(t => {\n    app_states.full();\n    TOWNS_RESULT = Array.from(t).map(itm => itm.toLowerCase());\n  }).catch(() => {\n    app_states.fail();\n  });\n}\nrequestTownsAPI();\n\n\n//# sourceURL=webpack://loftschool-example/./projects/async/index.js?");

/***/ }),

/***/ "./projects/async/styles/main.css":
/*!****************************************!*\
  !*** ./projects/async/styles/main.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://loftschool-example/./projects/async/styles/main.css?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./projects/async/index.js");
/******/ 	
/******/ })()
;