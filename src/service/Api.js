/* eslint-disable no-unused-vars */
import axios from 'axios';

export const treding = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const trailer = (id) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}` });
export const detail = (id) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}` });
export const find = (query, page) => axios.create({ baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${encodeURIComponent(query)}&page=${page}` });
export const playing = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const popular = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const topRated = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const upcoming = (page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });


