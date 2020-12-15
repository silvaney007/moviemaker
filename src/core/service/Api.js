/* eslint-disable no-unused-vars */
import axios from 'axios';
require('dotenv').config();

/* export const trailers = (title) => axios.create({ baseURL: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${encodeURIComponent(title)}&key=${process.env.REACT_APP__API__KEY_YOUTUBE}` }); */
export const trending = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const detail = (id) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}` });
export const find = (query) => axios.create({ baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${encodeURIComponent(query)}` });
export const playing = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const popular = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const topRated = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const upcoming = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const trailers = (id) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}` });
