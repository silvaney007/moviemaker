/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Details from "../details/Details";
import { find, categories } from "../../core/service/Api";
import "./Home.css";
import "./DetailPopUp.css";
import ExpandLessIcon from '@material-ui/icons/ExpandLessRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import auxImg from "../../img/width.png";



export default function Home() {

  const [movie, setMovie] = useState("");
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState({
    text: "",
    timer: 0,
  });
  const [category, setCategory] = useState("popular");


  useEffect(() => {

    if (document.querySelector(".pages").style.display === "none" && search.text === "") {
      document.querySelector(".pages").style.display = "flex";
    }

    async function fetchData(page = 1) {

      let data = "";

      search.text === ""
        ? await categories(category, page).get()
          .then(response => data = response.data.results)
          .catch(err => console.log(err))
        : await find(search.text).get()
          .then(response => data = response.data.results)
          .catch(err => console.log(err));

      setMovieList(data);
      loadMovies(data);
      setPage(page);
    }

    fetchData();

  }, [category, search.text]);


  useEffect(() => {

    if (page > 1) {
      async function loadMovie() {

        let newData = "";

        await categories(category, page).get()
          .then(response => newData = response.data.results)
          .catch(err => console.log(err));

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

    const newCategory = event.target.id;

    document.getElementById(category).style.backgroundColor = "#2e3131";
    document.getElementById(category).style.color = "white";
    document.getElementById(newCategory).style.backgroundColor = "white";
    document.getElementById(newCategory).style.color = "#2e3131";
    document.querySelector(".search form input").value = "";

    setSearch({ text: "" })
    setCategory(newCategory)
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
    setMovie(() => props)
    document.querySelector(".details").style.display = "flex";
  }

  function closeDetail() {
    setMovie(() => "");
    document.querySelector(".details").style.display = "none";
  }


  return (
    <div className="app">
      <div className="home">

        <div className="nav-bar">
          <div className="button-container">
            <button id="popular" onClick={handleCategory}> Popular </button>
            <button id="top_rated" onClick={handleCategory}> Top Rated </button>
            <button id="now_playing" onClick={handleCategory}> Now Playing </button>
            <button id="upcoming" onClick={handleCategory}> Upcoming </button>
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
                    <div className="title">
                      <p >{movie.title}</p>
                    </div>
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
        {movie !== "" &&
          <Details movie={movie} />}
      </section>
    </div>
  )
}