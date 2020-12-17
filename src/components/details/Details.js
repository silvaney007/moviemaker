/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './Detail.css';
import { trailers, detail, youTube } from '../../core/service/Api';
import Genre from '@material-ui/icons/MovieFilterRounded';
import Idiom from '@material-ui/icons/LanguageRounded';
import Release from '@material-ui/icons/EventAvailableRounded';
import Classification from '@material-ui/icons/StarsRounded';
import Link from '@material-ui/icons/LinkRounded';
import auxImg from "../../img/no-preview.png";




export default function Details(props) {


    const [movie, setMovie] = useState({
        details: {},
        trailer: "",
        genres: [],
        idiom: [],
    });

    const movieProps = {
        id: props.id.id,
        title: props.id.title
    };


    useEffect(() => {
        async function details() {

            let trailer = "";
            let data = [];

            await detail(movieProps.id).get().then(result => {
                data = result.data;
            }).catch(err => console.log(err));


            const response = await getTrailer();


            if (response.key) {
                trailer = response.trailer.data.results[0].key;
            } else {
                trailer = response.trailer.id.videoId;
            }


            setMovie({ details: data, trailer, genres: data.genres, idiom: data.spoken_languages });
        }
        details();
    }, [])


    async function getTrailer() {

        const response = {
            trailer: "",
            key: true
        }

        await trailers(movieProps.id).get().then(async result => {
            if (result.data.results[0] !== undefined && result.data.results.length > 0) {
                response.trailer = result;
            } else {

                await youTube(movieProps.title).get().then(result => {
                    response.trailer = result.data.items[0];
                    response.key = false;
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));

        return response;

    }



    return (
        <>
            <div className="detail">
                <div className='detail-container'>
                    <div className='detail-img'>
                        {movie.details.poster_path ?
                            <img src={`https://image.tmdb.org/t/p/w500${movie.details.poster_path}`} alt='img'></img> :
                            <img src={auxImg} alt='img' width="100%" height="100%" overflow="hidden" background="none"></img>}
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
                                <p className="classification"> <Classification className="icon2" /> <span> {movie.details.vote_average} </span></p>
                                <p className="genre"><Genre className="icon" />  <span> {movie.genres.map(genre => `${genre.name} `)} </span></p>
                                <p className="idiom"> <Idiom className="icon" /> <span> {movie.idiom.map(idiom => (idiom.english_name))} </span> </p>
                                <p className="release"> <Release className="icon" /> <span> {movie.details.release_date} </span></p>
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