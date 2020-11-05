/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {api, find} from '../../service/Api';
import './Styles.css'


export default class Page extends Component {


    state = {
        movies:[],
        infos:{},
        page:1,
        searchText: '',
        searchTextTimeout: 0,
    }

    componentDidMount(){
    this.loadMovies('');
}

    loadMovies = async (query, page = 1) => { 
    const response = query.length>0? await find(query, page).get() : await api(page).get();
    const {results, ...infos} = response.data;
    this.setState({movies:results, infos, page})
}




    prevPage = () => {
        const {page} = this.state;

        if(page === 1) return;

        const pageNumber = page-1;

        this.loadMovies(pageNumber)
    };

    nextPage = () => {

        const {page , infos} = this.state;

        if(page === infos.total_pages) return;

        const pageNumber = page+1;

        this.loadMovies(pageNumber)
    };

    handleNewText = (event) => {
        const searchText = event.target.value;
        clearTimeout(this.state.searchTextTimeout);
    
        this.setState({
          searchText,
          searchTextTimeout: setTimeout(
            () => this.loadMovies(searchText),
            500
          ),
        });
      };

   
  
    render(){

        const {movies, infos, page} = this.state;

    return (<section>
    <div className ='search'>
        <form>
        <input type='text' placeholder='search' onChange={this.handleNewText}/>
        </form>
    </div>
    
    <div className='movie-list'>
        {movies.map(movie => ( 
            <article key={movie.id}>
            <Link to = {`/movie/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt='img' ></img>
            <p>{movie.title}</p>
            </Link>
            </article>
        ))}
    </div>

    <div className='pages'>
            <button disabled={page === 1} onClick={this.prevPage}>Prev</button>
            <button disabled={page === infos.total_pages} onClick={this.nextPage}>Next</button>
        </div>
        </section>
    )}
}