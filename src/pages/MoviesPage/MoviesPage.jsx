import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieByName } from "../../api";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      alert("Please enter a search term");
      return;
    }

    try {
      const moviesData = await fetchMovieByName(query);
      setMovies(moviesData.results);
    } catch (err) {
      setError("Something went wrong while fetching movies", err);
    }
    setQuery("");
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={query}
          onChange={handleInputChange}
          className={css.searhString}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
