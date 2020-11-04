/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Styles.css'
import {detail, trailer} from '../../../service/Api'


export default class Details extends Component { 

    state ={
        movie:{},
        trailer:'',
    };

async componentDidMount(){

    const {id} = this.props.match.params;
 
        const response1 = await detail(id).get();
        const response2 = await trailer(id).get();
        this.setState({movie:response1.data, trailer: response2.data.results[0].key})
}

    render() {

        const {movie, trailer} = this.state;
       
    return <section>
         <header id='main-header'>
            <button type="button">
                <Link to="/" className="enter-app">
               <h1> MovieMaker </h1>
                </Link>
            </button>
        </header>
            <section id='main-detail'>

        <div className='detail'>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='img' ></img>
        <div id = 'about'>
        <p><strong>Title: </strong> {movie.title}<br/><br/>
        <strong>Overview: </strong> {movie.overview}<br/><br/>
        <strong> Release Date: </strong> {movie.release_date}<br/><br/>
        <strong> Classification: </strong> {movie.vote_average}</p>
        </div>
        <aside>
        <iframe id="ytplayer" type="text/html" width="640" height="360" src={`https://www.youtube.com/embed/${trailer}`}/>
        </aside>
        </div>
    </section>
    </section>
    }
}

