"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paramsToQueryString = require("./utils/paramsToQueryString");

var _paramsToQueryString2 = _interopRequireDefault(_paramsToQueryString);

var _link = require("./link");

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Component */

// Types


/* Types */
var UrlPrettifier = function () {
  function UrlPrettifier(routes) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, UrlPrettifier);

    this.routes = routes;
    this.paramsToQueryString = options && options.paramsToQueryString ? options.paramsToQueryString : _paramsToQueryString2.default;
  }

  _createClass(UrlPrettifier, [{
    key: "linkPage",
    value: function linkPage(pageName, params) {
      var route = this.routes.filter(function (currentRoute) {
        return currentRoute.pageName === pageName;
      })[0];
      // const componentContainer = route && route.componentContainer ? route.componentContainer : "";
      // console.log(pageName, "---", params);
      params.componentContainer = route && route.componentContainer ? route.componentContainer : "";
      return _extends({
        href: "/" + (route ? route.page : pageName) + this.paramsToQueryString(params)
      }, route && route.prettyUrl ? { as: typeof route.prettyUrl === "string" ? route.prettyUrl : route.prettyUrl(params) } : {});
    }
  }, {
    key: "getPrettyUrlPatterns",
    value: function getPrettyUrlPatterns(route) {
      return typeof route.prettyUrlPatterns === "string" ? [{ pattern: route.prettyUrlPatterns }] : Array.isArray(route.prettyUrlPatterns) ? route.prettyUrlPatterns.map(function (pattern) {
        return typeof pattern === "string" ? { pattern: pattern } : pattern;
      }) : typeof route.prettyUrl === "string" ? [{ pattern: route.prettyUrl }] : [];
    }
  }, {
    key: "forEachPattern",
    value: function forEachPattern(apply) {
      var _this = this;

      this.routes.forEach(function (route) {
        _this.getPrettyUrlPatterns(route).forEach(function (pattern) {
          return apply(route.page, pattern.pattern, Object.assign({}, pattern.defaultParams, { componentContainer: route.componentContainer || "" }));
        });
      });
    }
  }]);

  return UrlPrettifier;
}();

exports.default = UrlPrettifier;
exports.Link = _link2.default;