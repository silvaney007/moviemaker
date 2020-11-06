
import React, { Component } from 'react';
import './Styles.css';
import {detail, trailer} from '../../../service/Api';
import ReactPlayer from 'react-player/youtube'
import Home from './GoBack'



export default class Details extends Component { 


    state ={
        movie:{},
        trailer:'',
    };


async componentDidMount(){
this.details();
}

 details = async() => {
    const {id} = this.props.match.params;
    const response1 = await detail(id).get();
    const response2 = await trailer(id).get();
    this.setState({movie:response1.data, trailer: response2.data.results[0].key})

 }



    render() {

        const {movie, trailer} = this.state;

    return (

        <section>
            <Home/>
        <div className='container'>
        <aside>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='img' ></img>
        </aside>
        <div className='container-info'>
        <div className="video" >
        <ReactPlayer url={`https://www.youtube.com/embed/${trailer}`}        />
        </div>
        <div className ='container-about'>
        <h1><strong>{movie.title}</strong></h1><br/>
        <p><strong> Overview: </strong> {movie.overview}<br/><br/>
        <span className='date'><strong> Release Date: </strong> {movie.release_date}
        <span className='rate'><strong> Classification: </strong> {movie.vote_average}</span></span></p>
        </div>
        </div>
        </div>
    </section>
    )}
}

