/* eslint-disable no-unused-vars */
import axios from 'axios';

 export const api = (page) => axios.create({baseURL:`https://api.themoviedb.org/3/movie/popular?api_key=cfac1c3dad1f4b49ae4a522854b3f27e&page=${page}`});
 export const detail = (id) => axios.create({baseURL:`https://api.themoviedb.org/3/movie/${id}/videos?api_key=cfac1c3dad1f4b49ae4a522854b3f27e`});

