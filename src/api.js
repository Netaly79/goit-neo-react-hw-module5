import axios from "axios";

const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTM2ZWY2MTVhYTMxZTdjZWFmMWQxMmUwMDRlMTNmYSIsIm5iZiI6MTcyMzM4MjU4My4wMzUyODksInN1YiI6IjY2Yjc4OGIwYmFkNDk0NmUyYTU5NjY2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tv_Fz27NlZaemDUmcXTEs6N3Ga5kpDFqL3fihFlBgmc";

export const getToday = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day",
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
        params: {
          language: "en-US",
          page: 1,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieDetailsById = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization: token,
        },
        params: {
          language: "en-US",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    {
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const fetchMovieByName = async (searchStr) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${searchStr}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};
