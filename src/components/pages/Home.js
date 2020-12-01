/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  find,
  treding,
  playing,
  popular,
  topRated,
  upcoming,
} from "../../service/Api";
import "./Styles.css";


export default function Home() {

  const [countPage, setCountPage] = useState(1)
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState({
    fetch: popular,
  });

  useEffect(() => {
    async function fetchData(page = 1) {
      const response =
        search === ""
          ? await category.fetch(page).get()
          : await find(search, page).get();

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

    let text = event.target.value;

    const timer = setTimeout(() => {
      setSearch(text)
    }, 1000);

    return () => clearTimeout(timer);
  }



  return (
    <div>
      <div className="search">
        <button onClick={() => setCategory({ fetch: popular, })}> Popular </button>
        <button onClick={() => setCategory({ fetch: playing, })}> Now Playing </button>
        <button onClick={() => setCategory({ fetch: treding, })}> Trading </button>
        <button onClick={() => setCategory({ fetch: upcoming, })}> Upcoming </button>
        <button onClick={() => setCategory({ fetch: topRated, })}> Top Rated </button>
        <form>
          <input type="text" placeholder="Search a movie..." onChange={handleSearch} />
        </form>
      </div>
      <div className='movie-list'>
        <ul>
          {movieList.map(movie => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt='img' ></img>
                <p>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="pages">
        <button onClick={() => setCountPage(prevPage => prevPage + 1)}> Load Movies </button>
      </div>
    </div>
  )
}