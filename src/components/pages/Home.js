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
    }

    fetchData();

    console.log(movieList)

  }, [category]);

  function prevPage() {
    const { page, search } = this.state;
    if (page === 1) return;

    const pageNumber = page - 1;
  }

  function nextPage() {
    const { page, infos, search } = this.state;

    if (page === infos.total_pages) return;

    const pageNumber = page + 1;
  }

  function handleSearch(event) {
    let data = event.target.value;
    setSearch(data);
  }


  return (
    <div>
      <div className="search">
        <button onClick={() => setCategory({ fetch: popular, })}> Popular </button>
        <button onClick={() => setCategory({ fetch: playing, })}> Now Playing </button>
        <button onClick={() => setCategory({ fetch: treding, })}> Trading </button>
        <form>
          <input type="text" placeholder="search" onChange={handleSearch} /> </form>
        <button onClick={() => setCategory({ fetch: upcoming, })}> Upcoming </button>
        <button onClick={() => setCategory({ fetch: topRated, })}> Top Rated </button>
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
      <div className="pages"> </div>
    </div>
  )
}
