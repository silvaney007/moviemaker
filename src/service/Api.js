import axios from 'axios';


const api = axios.create({baseURL: 'https://api.themoviedb.org/3/trending/movie/day?api_key=cfac1c3dad1f4b49ae4a522854b3f27e
'})

export default api;