/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './Detail.css';
import { trailers, detail } from '../../core/service/Api';
import animation from "./Animation.js"
import Genre from '@material-ui/icons/MovieFilterRounded';
import Idiom from '@material-ui/icons/LanguageRounded';
import Release from '@material-ui/icons/EventAvailableRounded';
import Classification from '@material-ui/icons/StarsRounded';
import Link from '@material-ui/icons/LinkRounded';



export default function Details(props) {

    const [movie, setMovie] = useState({
        details: {},
        trailer: "",
        genres: [],
        idiom: [],
    });

    useEffect(() => {
        async function details() {
            const id = props.id;
            const response1 = await detail(id).get();
            const response2 = await trailers(id).get();

            const data = response1.data;
            const trailer = response2.data.results[0].key;


            setMovie({ details: data, trailer, genres: data.genres, idiom: data.spoken_languages });
        }
        details();
    }, [])



    return (
        <>
            <div className="detail">
                <div className='detail-container'>
                    <div className='detail-img' onMouseMove={animation}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.details.poster_path}`} alt='img'></img>
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
                                <p className="classification"> <Classification className="icon2" /> {movie.details.vote_average} </p>
                                <p className="genre"><Genre className="icon" /> <span>  {movie.genres.map(genre => `${genre.name} `)} </span></p>
                                <p className="idiom"> <Idiom className="icon" /> <span>{movie.idiom.map(idiom => (idiom.english_name))} </span> </p>
                                <p className="release"> <Release className="icon" /> <span>{movie.details.release_date} </span></p>
                                <p className="link-a"> <Link className="icon" />
                                    <a href={movie.details.homepage}>{movie.details.title}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}