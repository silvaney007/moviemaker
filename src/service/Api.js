/* eslint-disable no-unused-vars */
import axios from 'axios';

 export const api = (page) => axios.create({baseURL:`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`});
 export const trailer = (id) => axios.create({baseURL:`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`});
 export const detail = (id) => axios.create({baseURL:`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`});
 export const find = (query) => axios.create({baseURL:`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&include_adult=false`});

