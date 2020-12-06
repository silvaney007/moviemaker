/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './Detail.css';
import { trailers, detail } from '../../core/service/Api';
import GoBack from './GoBack'
import animation from "./Animation.js"



export default function Details(props) {

    const [movie, setMovie] = useState({
        details: {},
        trailer: [],
        genres: [],
        languages: [],
    });

    useEffect(() => {
        async function details() {
            const { id } = props.match.params;
            const response1 = await detail(id).get();
            const data = response1.data;

            const response2 = await trailers(data.title).get();
            const trailer = response2.data.items[0].id.videoId;

            setMovie({ details: data, trailer, genres: data.genres, languages: data.spoken_languages });
        }
        details();
    }, [])



    return (
        <div className="detail">
            <div className="navbar">
                <GoBack />
            </div>
            <div className='detail-container'>
                <div className='detail-img' onMouseMove={animation}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.details.poster_path}`} alt='img'></img>
                </div>
                <div className='detail-info'>
                    <div className="detail-video" >
                        <iframe src={`https://www.youtube.com/embed/${movie.trailer}`}
                            frameBorder="0"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='detail-about'>
                        <div className="about-1">
                            <h1 className="title"><strong>{movie.details.title}</strong></h1><br />
                            <p className="overview">{movie.details.overview}</p>
                        </div>
                        <div className="about-2">

                            <p className='genre'><strong> Genre: </strong> {movie.genres.map(genre => `${genre.name} `)}</p>
                            {movie.languages.map((language, index) => (
                                <p key={index} className='idiom'><strong> Idiom: </strong> {language.english_name}</p>))}
                            <p className='release'><strong> Release Date: </strong> {movie.details.release_date}</p>
                            <p className="average"><strong> Classification: </strong>{movie.details.vote_average}</p>
                            <p className='homepage'><strong> Homepage: </strong>
                                <a href={movie.details.homepage}>{movie.details.title}</a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}