/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './Styles.css';
import { trailer, detail } from '../../../service/Api';
import ReactPlayer from 'react-player/youtube'
import GoBack from './GoBack'



export default function Details(props) {

    const [movie, setMovie] = useState({
        details: {},
        trailer: '',
    });

    useEffect(() => {
        async function details() {

            const { id } = props.match.params;
            const response1 = await detail(id).get();
            const response2 = await trailer(id).get();

            setMovie({ details: response1.data, trailer: response2.data.results[0].key })
        }
        details();
    }, [])



    return (
        <section>
            <GoBack />
            <div className='container'>
                <aside>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.details.poster_path}`} alt='img' ></img>
                </aside>
                <div className='container-info'>
                    <div className="video" >
                        <ReactPlayer url={`https://www.youtube.com/embed/${movie.trailer}`} />
                    </div>
                    <div className='container-about'>
                        <h1><strong>{movie.details.title}</strong></h1><br />
                        <p><strong> Overview: </strong>{movie.details.overview}<br /><br />
                            <span className='date'><strong> Release Date: </strong> {movie.details.release_date}
                                <span className='rate'><strong> Classification: </strong> {movie.details.vote_average}</span></span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}