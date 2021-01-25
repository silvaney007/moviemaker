/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './Detail.css';
import { detail, youTube } from '../../core/service/Api';
import Genre from '@material-ui/icons/MovieFilterRounded';
import Idiom from '@material-ui/icons/LanguageRounded';
import Release from '@material-ui/icons/EventAvailableRounded';
import Classification from '@material-ui/icons/Stars';
import Country from '@material-ui/icons/PublicRounded';
import Runtime from '@material-ui/icons/WatchLaterRounded';
import auxImg from "../../img/height.png";




export default function Details(props) {


    const [movie, setMovie] = useState({
        details: {},
        trailer: "",
        genres: [],
        idiom: [],
        countries: [],
        cast: []
    });

    const movieProps = {
        id: props.movie.id,
        title: props.movie.title
    };


    useEffect(() => {
        async function details() {

            let data = [];
            let err = false;

            await detail(movieProps.id).get().then(result => {
                data = result.data;
            }).catch(log => {
                data = props.movie;
                err = true;
            })

            const trailer = await getTrailer(data);

            if (err) {
                setMovie({ details: data, trailer, genres: data.genre_ids, idiom: [{ iso_639_1: "en" }], countries: [{ iso_3166_1: "us" }], cast: data.credits.cast });
            } else {
                setMovie({ details: data, trailer, genres: data.genres, idiom: data.spoken_languages, countries: data.production_countries, cast: data.credits.cast });
            }
        }
        details();
    }, [])


    async function getTrailer(data) {

        let trailer = "Zw_FKq10S8M";

        if (data.videos.results.length) {
            trailer = data.videos.results[0].key;
        } else {
            await youTube(movieProps.title).get().then(result => {
                if (result.data.items[0].id.videoId) {
                    trailer = result.data.items[0].id.videoId;
                }
            }).catch(err => console.log(err));
        }
        return trailer;
    }



    return (
        <>
            <div className="detail">
                <div className='detail-container'>
                    <div className='detail-cast'>
                        <h1>Casting</h1>
                        <div className='cast-list'>
                            <ul>
                                {movie.cast.map(profile => (
                                    <li key={profile.cast_id} id={profile.cast_id}>
                                        {profile.profile_path ?
                                            <img src={`https://image.tmdb.org/t/p/w500${profile.profile_path}`} alt='img'></img> :
                                            <img src={auxImg} alt='img' background="none"></img>}
                                        <div className="cast-name">
                                            <p >{profile.name}<br></br> <span color="red"> as {profile.character} </span></p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='cast-img'>
                            {movie.details.poster_path ?
                                <img src={`https://image.tmdb.org/t/p/w500${movie.details.poster_path}`} alt='img'></img> :
                                <img src={auxImg} alt='img' width="100%" height="100%" overflow="hidden" background="none"></img>}
                        </div>
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
                                <h1 className="title">{movie.details.title}</h1>
                                <p className="overview">{movie.details.overview}</p>
                            </div>
                            <div className="about-2">
                                <p className="classification"> <Classification className="icon1" /> <span> {movie.details.vote_average}/10 </span></p>
                                <p className="runtime"> <Runtime className="icon2" /> <span> {movie.details.runtime} </span></p>
                                <p className="genre"><Genre className="icon2" />  <span> {movie.genres.map(genre => `${genre.name} `)} </span></p>
                                <p className="release"> <Release className="icon2" /> <span> {movie.details.release_date} </span></p>
                                <p className="country"> <Country className="icon2" /> <span> {movie.countries.map((cod, index) =>
                                    <img key={index} src={`https://www.countryflags.io/${cod.iso_3166_1}/shiny/24.png`} alt={cod.iso_3166_1} ></img>)}</span> </p>
                                <p className="idiom"> <Idiom className="icon2" /> <span> {movie.idiom.map((cod, index) =>
                                    <img key={index} src={`https://unpkg.com/language-icons/icons/${cod.iso_639_1}.svg`} alt={cod.iso_639_1} width="23px" height="17px"></img>)}</span> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}