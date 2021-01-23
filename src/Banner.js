import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import YouTube from "react-youtube";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState();
  const [featuredTrailer, setFeaturedTrailer] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const opts = {
    height: "448",
    width: "100%",
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      controls: 0,
    },
  };

  function handleClick(movie) {
    if (featuredTrailer) {
      setFeaturedTrailer("");
    } else {
      const urlParams = new URLSearchParams(
        new URL("https://www.youtube.com/watch?v=lqRQ5Y6OYi4").search
      );
      setFeaturedTrailer(urlParams.get("v"));
    }
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      {featuredTrailer ? (
        <YouTube videoId={featuredTrailer} opts={opts} />
      ) : (
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner__butons">
            <button
              onClick={() => handleClick(movie)}
              className="banner__button"
            >
              Play
            </button>
            <button className="banner__button">My List</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
      )}
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
