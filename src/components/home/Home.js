/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  find,
  trending,
  playing,
  popular,
  topRated,
  upcoming,
} from "../../core/service/Api";
import "./Home.css";
import ExpandLessIcon from '@material-ui/icons/ExpandLessRounded';
import auxImg from "../../img/no-preview.png";



export default function Home() {

  const [countPage, setCountPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState({
    text: "",
    timer: 0,
  });
  const [category, setCategory] = useState({
    fetch: popular,
  });


  useEffect(() => {
    async function fetchData(page = 1) {
      const response =
        search.text === ""
          ? await category.fetch(page).get()
          : await find(search.text).get();
      const data = response.data.results;

      setMovieList(data);
      setCountPage(page);
    }

    fetchData();

  }, [category, search]);


  useEffect(() => {

    if (countPage > 1) {
      async function loadMovie() {
        const response = await category.fetch(countPage).get();
        const newData = response.data.results;
        setMovieList(oldData => [...oldData, ...newData]);
      }
      loadMovie();
    }

  }, [countPage]);


  function handleSearch(event) {

    let newText = event.target.value;
    clearTimeout(search.timer);

    search.timer = setTimeout(() => {
      setSearch({
        text: newText,
      })
    }, 500);
  }


  return (
    <div className="home">

      <div className="search">
        <button onClick={() => setCategory({ fetch: topRated })}> Top Rated </button>
        <button onClick={() => setCategory({ fetch: trending })}> Trending </button>
        <button onClick={() => setCategory({ fetch: popular })}> Popular </button>
        <button onClick={() => setCategory({ fetch: upcoming })}> Upcoming </button>
        <button onClick={() => setCategory({ fetch: playing })}> Now Playing </button>
        <form>
          <input type="text" placeholder="Search a movie..." onChange={handleSearch} />
        </form>
      </div>

      <div className="movie-container">
        <div className='movie-list'>
          <ul>
            {movieList.map(movie => (
              <li key={movie.id}>
                <Link to={`/${movie.id}`}>
                  {movie.backdrop_path ?
                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt='img'></img> :
                    <img src={auxImg} alt='img' width="101px" height="155px" overflow="hidden" background="none"></img>}
                  <span className="title"><p>{movie.title}</p></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pages">
          <button onClick={() => setCountPage(prevPage => prevPage + 1)}> Load... </button>
        </div>
      </div>

      <div className="top">
        <a onClick={() => window.scrollTo(0, 0)}>
          <ExpandLessIcon id="up" />
        </a>
      </div>
    </div>
  )
}