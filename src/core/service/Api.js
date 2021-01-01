/* eslint-disable no-unused-vars */
import axios from 'axios';
require('dotenv').config();

const date = new Date();
const dateGTE = `${date.getFullYear()-6}-01-01`;
const dateLTE = `${date.getFullYear()-1}-12-28`;

export const youTube = (title) => axios.create({ baseURL: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(title)}&key=${process.env.REACT_APP__API__KEY_YOUTUBE}` });
export const detail = (id) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,images,credits` });
export const find = (query) => axios.create({ baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${encodeURIComponent(query)}` });
export const categories = (category, page) => axios.create({ baseURL: `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}` });
export const discovery = () => axios.create({baseURL: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&release_date.gte=${dateGTE}&release_date.lte=${dateLTE}`})