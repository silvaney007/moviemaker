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
import Classification from '@material-ui/icons/Stars';
import Country from '@material-ui/icons/PublicRounded';
import auxImg from "../../img/height.png";




export default function Details(props) {


    const [movie, setMovie] = useState({
        details: {},
        trailer: "",
        genres: [],
        idiom: [],
        countries: [],
    });

    const movieProps = {
        id: props.id.id,
        title: props.id.title
    };


    useEffect(() => {
        async function details() {

            let data = [];
            let err = false;

            await detail(movieProps.id).get().then(result => {
                data = result.data;
            }).catch(log => {
                data = props.id;
                err = true;
            })

            const trailer = await getTrailer();

            if (err) {
                setMovie({ details: data, trailer, genres: data.genre_ids, idiom: [{ iso_639_1: "en" }], countries: [{ iso_3166_1: "us" }] });
            } else {
                setMovie({ details: data, trailer, genres: data.genres, idiom: data.spoken_languages, countries: data.production_countries });
            }
        }
        details();
    }, [])


    async function getTrailer() {

        let err = false;
        let trailer = "";

        await trailers(movieProps.id).get().then(async result => {
            trailer = result.data.results[0].key;
        }).catch(log => {
            err = true;
        })

    if (err) {
        await youTube(movieProps.title).get().then(result => {
            if(result.data.items[0].id.videoId){
            trailer = result.data.items[0].id.videoId;
            }else{
                trailer = "Zw_FKq10S8M";
            }

        }).catch(log => {
            trailer = "Zw_FKq10S8M";
        })
    }

    return trailer;
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
                            <p className="classification"> <Classification className="icon1" /> <span> {movie.details.vote_average} </span></p>
                            <p className="genre"><Genre className="icon2" />  <span> {movie.genres.map(genre => `${genre.name} `)} </span></p>
                            <p className="release"> <Release className="icon2" /> <span> {movie.details.release_date} </span></p>
                            <p className="country"> <Country className="icon2" /> <span> {movie.countries.map(cod =>
                                <img src={`https://www.countryflags.io/${cod.iso_3166_1}/shiny/24.png`} alt={cod.iso_3166_1} ></img>)}</span> </p>
                            <p className="idiom"> <Idiom className="icon2" /> <span> {movie.idiom.map(cod =>
                                <img src={`https://unpkg.com/language-icons/icons/${cod.iso_639_1}.svg`} alt={cod.iso_639_1} width="19px" height="19px"></img>)}</span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}