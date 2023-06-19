import React, { useEffect, useState } from "react";
import na from "./happybday.jpg";
import "./moviesList.style.css";

const MoviesList = () => {
  const [movieName, setMovieName] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchListMenu, setSearchList] = useState([]);

  const onChangeHandler = (e) => {
    setMovieName(e.target.value);
  };

  const onClickHandler = (el) => {
    setMovieName("");
    setSelectedMovie(el);
    setSearchList([]);
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

  return (
    <div>
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
      {selectedMovie && (
        <div className="movie-container">
          <img src={selectedMovie.poster} alt="movie-poster" />
          <div>
            <h1>{selectedMovie.title}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
