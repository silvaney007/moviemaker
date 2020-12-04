/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './Detail.css';
import { trailer, detail } from '../../core/service/Api';
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


            console.log(response1)
            console.log(response2)

            setMovie({ details: response1.data, trailer: response2.data.results[0].key })
        }
        details();
    }, [])



    return (
        <div className="detail">
            <div className="navbar">
                <GoBack />
            </div>
            <div className='detail-container'>
                <div className='detail-img'>
                    <span className='rate'>{movie.details.vote_average}</span>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.details.poster_path}`} alt='img'></img>
                </div>
                <div className='detail-info'>
                    <div className="detail-video" >
                        <ReactPlayer
                            url={`https://www.youtube.com/embed/${movie.trailer}`}
                            config={{
                                youtube: {
                                    controls:true,
                                },
                            }}
                        />
                    </div>
                    <div className='detail-about'>
                        <h1><strong>{movie.details.title}</strong></h1><br />
                        <p><strong> Overview: </strong>{movie.details.overview}<br /><br />
                            <span className='date'><strong> Release Date: </strong> {movie.details.release_date}
                            </span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}