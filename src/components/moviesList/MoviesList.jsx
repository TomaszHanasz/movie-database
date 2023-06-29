import React, { useEffect, useState } from "react";
import na from "./happybday.jpg";
import "./moviesList.style.css";

const MoviesList = () => {
  const [movieName, setMovieName] = useState("");
  const [searchListMenu, setSearchList] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  const onChangeHandler = (e) => {
    setMovieName(e.target.value);
  };

  const onClickHandler = (el) => {
    setMovieName("");
    setSearchList([]);
    const getMovie = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${el.imdbID}&apikey=e105f1d1`
        );
        const data = await response.json();
        if (data) {
          const movieDetails = {
            title: data.Title,
            actors: data.Actors,
            country: data.Country,
            director: data.Director,
            genre: data.Genre,
            plot: data.Plot,
            poster: data.Poster,
            runtime: data.Runtime,
            year: data.Year,
            rating: data.imdbRating,
          };
          setMovieDetails(movieDetails);
          console.log(movieDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  };

  useEffect(() => {
    const searchList = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=${movieName}&apikey=e105f1d1`
        );
        const data = await response.json();
        if (data.Search) {
          const searchedMovies = data.Search.map((el) => ({
            title: el.Title,
            poster: el.Poster,
            year: el.Year,
            imdbID: el.imdbID,
          }));
          setSearchList(searchedMovies);
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchList();
  }, [movieName]);

  const movieDescription = () => {
    const {
      title,
      poster,
      year,
      country,
      runtime,
      director,
      actors,
      genre,
      plot,
      rating,
    } = movieDetails;

    return (
      <div className="movie-container">
        <img
          src={poster === "N/A" ? na : poster}
          alt="movie poster big"
          className="movie__poster-big"
        />
        <div className="movie__description">
          <h1 className="movie__title">{title}</h1>
          <p>⭐{rating}</p>
          <div>
            <p>
              {year}, {country}
            </p>
          </div>
          <div className="movie__details">
            <p>
              <span>Time:</span> {runtime}
            </p>
            <p>
              <span>Genre:</span> {genre}
            </p>
          </div>
          <div>
            <p>
              <span>Director:</span> {director}
            </p>
            <p>
              <span>Cast:</span> {actors}
            </p>
          </div>
          <div className="movie__plot">{plot}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="movies__home">
      <div className="home__top">
        <h1>Very Nice Movies</h1>
        <div className="search__input">
          <label>Search movie:</label>
          <input
            placeholder="search movie"
            value={movieName}
            onChange={onChangeHandler}
          />
          <div className="search__list-container">
            {searchListMenu.map((el, index) => {
              return (
                <div
                  key={index}
                  className="search__list"
                  onClick={() => onClickHandler(el)}
                >
                  <img
                    src={el.poster === "N/A" ? na : el.poster}
                    alt="movie poster"
                  />
                  <div>
                    <p>{el.title}</p>
                    <p>{el.year}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {movieDetails !== null && movieDescription()}
    </div>
  );
};

export default MoviesList;
