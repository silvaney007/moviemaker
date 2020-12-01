"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upcoming = exports.topRated = exports.popular = exports.playing = exports.find = exports.detail = exports.trailer = exports.treding = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */
var treding = function treding(page) {
  return _axios["default"].create({
    baseURL: "https://api.themoviedb.org/3/trending/movie/day?api_key=".concat(process.env.REACT_APP_API_KEY, "&page=").concat(page)
  });
};

exports.treding = treding;

var trailer = function trailer(id) {
  return _axios["default"].create({
    baseURL: "https://api.themoviedb.org/3/movie/".concat(id, "/videos?api_key=").concat(process.env.REACT_APP_API_KEY)
  });
};

exports.trailer = trailer;

var detail = function detail(id) {
  return _axios["default"].create({
    baseURL: "https://api.themoviedb.org/3/movie/".concat(id, "?api_key=").concat(process.env.REACT_APP_API_KEY)
  });
};

exports.detail = detail;

var find = function find(query, page) {
  return _axios["default"].create({
    baseURL: "https://api.themoviedb.org/3/search/movie?api_key=".concat(process.env.REACT_APP_API_KEY, "&query=").concat(encodeURIComponent(query), "&page=").concat(page)
  });
};

exports.find = find;

var playing = function playing(page) {
  return _axios["default"].create({
    baseURL: "https://api.themoviedb.org/3/movie/now_playing?api_key=".concat(process.env.REACT_APP_API_KEY, "&page=").concat(page)
  });
};

exports.playing = playing;

var popular = function popular(page) {
  return _axios["default"].create({
    baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=".concat(process.env.REACT_APP_API_KEY, "&page=").concat(page)
  });
};

exports.popular = popular;

var topRated = function topRated(page) {
  return _axios["default"].create({
    baseURL: "https://api.themoviedb.org/3/movie/top_rated?api_key=".concat(process.env.REACT_APP_API_KEY, "&page=").concat(page)
  });
};

exports.topRated = topRated;

var upcoming = function upcoming(page) {
  return _axios["default"].create({
    baseURL: "https://api.themoviedb.org/3/movie/upcoming?api_key=".concat(process.env.REACT_APP_API_KEY, "&page=").concat(page)
  });
};

exports.upcoming = upcoming;