import { lazy, Suspense, useEffect, useState, useRef } from "react";
import {
  NavLink,
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getMovieDetailsById } from "../../api";
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReview = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

import css from "./MovieDetailPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams(); // Extract movieId from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const btnRef = useRef();

  const previousLocation = location.state || "/movies";
  let vote, imgPath;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetailsById(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (movieDetails) {
    imgPath = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
    vote = Math.round(movieDetails.vote_average * 10);
  } else {
    return <p>Loading movie details...</p>;
  }

  return (
    <Suspense>
      <button ref={btnRef} onClick={() => navigate(previousLocation)} className={css.back} >
        Go Back
      </button>
      <div className={css.info}>
        <img src={imgPath} className={css.image}></img>
        <div className={css.desc}>
          <h1>{movieDetails.title}</h1>
          <p>User rate: {vote}%</p>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          <h2>Genres</h2>
          {movieDetails.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
      </div>
      <div className={css.extra}>
        <p>Additional information:</p>
        <nav className={css.subNav}>
          <NavLink
            to={`/movies/${movieId}/cast`}
            className={css.subLink}
            state={location}>
            Cast
          </NavLink>
          <NavLink
            to={`/movies/${movieId}/review`}
            className={css.subLink}
            state={location}>
            Reviews
          </NavLink>
        </nav>
      </div>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="review" element={<MovieReview />} />
      </Routes>
    </Suspense>
  );
};

export default MovieDetailsPage;