/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
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

        console.log(response2)

        this.setState({movie:response1.data, trailer: response2.data.results[0].key})


}

    render() {

        const {movie, trailer} = this.state;
      
    return <section>
        <div className='detail'>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='img' ></img>
        <aside>
        <iframe id="ytplayer" type="text/html" width="640" height="360" src={`https://www.youtube-nocookie.com/embed/${trailer}`}/>
        </aside>
        </div>
    </section>
    }
}