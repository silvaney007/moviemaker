/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Details from "../details/Details";
import { find, trending, playing, popular, topRated, upcoming, trailers, detail } from "../../core/service/Api";
import "./Home.css";
import "./DetailPopUp.css";
import ExpandLessIcon from '@material-ui/icons/ExpandLessRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import auxImg from "../../img/no-preview.png";



export default function Home() {

  const categories = {
    trending,
    playing,
    popular,
    topRated,
    upcoming,
  }

  const [movieId, setMovieID] = useState("");
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState({
    text: "",
    timer: 0,
  });
  const [category, setCategory] = useState({
    name: "upcoming",
    fetch: upcoming,
  });


  useEffect(() => {

    if (document.querySelector(".pages").style.display === "none" && search.text === "")
      document.querySelector(".pages").style.display = "flex";

    async function fetchData(page = 1) {

      const response =
        search.text === ""
          ? await category.fetch(page).get()
          : await find(search.text).get();

      const data = response.data.results;

      setMovieList(data);
      loadMovies(data);
      setPage(page);
    }

    fetchData();

  }, [category.fetch, search.text]);



  useEffect(() => {

    if (page > 1) {
      async function loadMovie() {
        const response = await category.fetch(page).get();
        const newData = response.data.results;
        setMovieList(oldData => [...oldData, ...newData]);
        loadMovies(newData);
      }
      loadMovie();
    }

  }, [page]);


  function loadMovies(data) {

    data.map(movie => {
      document.getElementById(`${movie.id}`).style.animation = "fadeOut 1s";
      document.getElementById(`${movie.id}`).addEventListener("animationstart", (event) => {
        event.target.style.animation = "fadeIn 2s ease-in";
      })

      return "";
    })
  }


  function handleCategory(event) {

    const id = event.target.id;

    document.getElementById(category.name).style.backgroundColor = "#2e3131";
    document.getElementById(category.name).style.color = "white";
    document.getElementById(id).style.backgroundColor = "white";
    document.getElementById(id).style.color = "#2e3131";
    document.querySelector(".search form input").value = "";


    setSearch({ text: "" })
    setCategory({ name: id, fetch: categories[id] })
  }


  function handleSearch(event) {

    document.querySelector(".pages").style.display = "none";
    const newText = event.target.value;

    clearTimeout(search.timer);

    search.timer = setTimeout(() => {
      setSearch({
        text: newText,
      })
    }, 500);

  }

  function details(props) {
    setMovieID(() => props)
    document.querySelector(".details").style.display = "flex";
  }

  function closeDetail() {
    setMovieID(() => "");
    document.querySelector(".details").style.display = "none";
  }


  return (
    <div className="app">
      <div className="home">
        <div className="nav-bar">
          <div className="button-container">
            <button id="upcoming" onClick={handleCategory}> Upcoming </button>
            <button id="playing" onClick={handleCategory}> Now Playing </button>
            <button id="trending" onClick={handleCategory}> Trending </button>
            <button id="topRated" onClick={handleCategory}> Top Rated </button>
            <button id="popular" onClick={handleCategory}> Popular </button>
          </div>
        </div>


        <div className="movie-container">
          <div className="search">
            <form>
              <input type="text" placeholder="Search a movie..." onChange={handleSearch} />
            </form>
          </div>
          <div className='movie-list'>
            <ul>
              {movieList.map(movie => (
                <li key={movie.id} id={movie.id}>
                  <a onClick={() => details(movie)}>
                    {movie.backdrop_path ?
                      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt='img'></img> :
                      <img src={auxImg} alt='img' width="101px" height="155px" overflow="hidden" background="none"></img>}
                    <span className="title"><p>{movie.title}</p></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pages">
            <button onClick={() => setPage(prevPage => prevPage + 1)}> Load... </button>
          </div>
        </div>

        <div className="top">
          <a onClick={() => window.scrollTo(0, 0)}>
            <ExpandLessIcon id="up" />
          </a>
        </div>
      </div>

      <section className="details">
        <div className="close">
          <CloseIcon id="close" onClick={closeDetail}></CloseIcon>
        </div>
        {movieId !== "" &&
          <Details id={movieId} />}
      </section>
    </div>
  )
}