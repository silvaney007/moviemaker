/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import api from '../../service/Api';
import './Styles.css'


export default class Page extends Component {


    state = {
        movies:[],
        infos:{},
        page:1
    }

    componentDidMount(){
    this.loadMovies();
}

    loadMovies = async (page = 1) => {
    const response = await api(page).get();
    const {results, ...infos} = response.data;
    this.setState({movies:results, infos, page})
    console.log(results);
}

    prevPage = () => {
        const {page , infos} = this.state;

        if(page === 1) return;

        const pageNumber = page-1;

        this.loadMovies(pageNumber)
    };

    nextPage = () => {

        const {page , infos} = this.state;

        if(page === infos.total_pages) return;

        const pageNumber = page+1;

        console.log(pageNumber);

        this.loadMovies(pageNumber)
    };



    render(){

        const {movies, page, infos} = this.state;

    return <div className='movie-list'>
        {movies.map(movie => (
            <article key={movie.id}>
            <h3><strong>Title:</strong> {movie.original_title}</h3>
            <p><strong>Description:</strong> {movie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt='img'></img>
            </article>
        ))}

        <div className='pages'>
            <button disabled={page === 1} onClick={this.prevPage}>Prev</button>
            <button disabled={page === infos.total_pages} onClick={this.nextPage}>Next</button>
        </div>
    </div>
    }
}