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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _math = __webpack_require__(1);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log((0, _math.add)(1, 2));
	console.log((0, _math.subtract)(2, 1));
	(0, _math2.default)();

	var app = document.querySelector('#app');

	var state = {
	  source: 'mashable',
	  articles: [{
	    image: '',
	    title: '',
	    theme: '',
	    impressions: '',
	    summary: '',
	    link: ''
	  }]
	};

	function fetchUrl(url) {
	  return fetch('https://accesscontrolalloworiginall.herokuapp.com/' + url);
	}

	function fetchMashableArticles() {
	  return fetchUrl('http://migbylab.com/feed.json').then(function (res) {
	    return res.json();
	  }).then(function (data) {
	    return data.new.map(function (article) {
	      return {
	        image: article.feature_image,
	        title: article.display_title,
	        theme: article.channel,
	        impressions: article.formatted_shares,
	        summary: article.excerpt,
	        link: article.short_url
	      };
	    });
	  });
	}

	function fetchArticles(source) {
	  if (source === 'mashable') {
	    return fetchMashableArticles();
	  }
	}

	fetchArticles(state.source).then(function (articles) {
	  return state.articles = articles;
	}).then(function () {
	  return render(app, state);
	});

	function renderArticles(articles) {
	  return articles.map(function (article) {
	    return '\n    <article class="article">\n      <section class="featuredImage">\n        <img src="' + article.image + '" alt="" />\n      </section>\n      <section class="articleContent">\n          <a href="' + article.link + '"><h3>' + article.title + '</h3></a>\n          <h6>' + article.theme + '</h6>\n      </section>\n      <section class="impressions">\n        ' + article.impressions + '\n      </section>\n      <div class="clearfix"></div>\n    </article>\n  ';
	  });
	}

	function render(container, data) {
	  container.innerHTML = '\n  <header>\n    <section class="container">\n      <a href="#"><h1>Feedr</h1></a>\n      <nav>\n        <ul>\n          <li><a href="#">News Source: <span>Source Name</span></a>\n            <ul>\n                <li><a href="#">Source 1</a></li>\n                <li><a href="#">Source 2</a></li>\n                <li><a href="#">Source 3</a></li>\n            </ul>\n          </li>\n        </ul>\n        <section id="search">\n          <input type="text" name="name" value="">\n          <a href="#"><img src="images/search.png" alt="" /></a>\n        </section>\n      </nav>\n      <div class="clearfix"></div>\n    </section>\n  </header>\n  <div id="popUp" class="loader hidden">\n    <a href="#" class="closePopUp">X</a>\n    <div class="container">\n      <h1>Article title here</h1>\n      <p>\n        Article description/content here.\n      </p>\n      <a href="#" class="popUpAction" target="_blank">Read more from source</a>\n    </div>\n  </div>\n  <section id="main" class="container">\n    ' + renderArticles(data.articles) + '\n  </section>\n  ';
	}

	render(app, state);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.add = add;
	exports.subtract = subtract;
	exports.default = math;
	function add(x, y) {
	  return x + y;
	}

	function subtract(x, y) {
	  return x - y;
	}

	function math() {
	  console.log('math is fun');
	}

/***/ })
/******/ ]);