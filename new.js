const main = document.getElementById("main");
const img_url = "https://image.tmdb.org/t/p/w500";

const handleGenreClick = (genreId) => {
  getMovies(genreId);
};

const setGenres = () => {
  // get all genre from api
  const genreSelector = document.querySelector("#genreSelector");
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjZmYzA2ZmRlYTg0ZjAwN2UyZTc1M2FjNGZhOGI5ZCIsInN1YiI6IjY1MDFmNjdiZTBjYTdmMDBjYmViMWMxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cJKBxFmvEY1mKqmbPh9ykKXgvWgeugb5A0R39WXWuqI",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      const genres = json.genres;
      genres.forEach((genre) => {
        const link = document.createElement("option");
        link.innerText = genre.name;
        link.value = genre.id;
        // link.addEventListener("click", () => handleGenreClick(genre.id));
        genreSelector.appendChild(link);
      });
    })
    .catch((err) => console.error("error:" + err));
};

setGenres();

const genreSelector = document.querySelector("#genreSelector");

genreSelector.addEventListener("change", (e) => {
  const genreSelector = document.querySelector("#genreSelector");
  getMovies(genreSelector.value);
});

function getMovies(genreId) {
  const api = genreId
    ? `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`
    : "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NjZmYzA2ZmRlYTg0ZjAwN2UyZTc1M2FjNGZhOGI5ZCIsInN1YiI6IjY1MDFmNjdiZTBjYTdmMDBjYmViMWMxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cJKBxFmvEY1mKqmbPh9ykKXgvWgeugb5A0R39WXWuqI",
    },
  };
  fetch(api, options)
    .then((res) => res.json())
    .then((data) => showMovies(data.results))
    .catch((err) => console.error("error:" + err));
}

getMovies();

function showMovies(data) {
  main.innerHTML = "";
  console.log(data);

  data.forEach((movie, index) => {
    const { title, poster_path, overview, id, vote_average } = movie;
    const movieEl = document.createElement("div");
    const movieImageEl = document.createElement("img");
    movieImageEl.src = img_url + poster_path;
    movieImageEl.alt = title;
    movieEl.classList.add("movie");
    movieEl.appendChild(movieImageEl);
    movieEl.addEventListener("click", () => {
      window.open(`/movieDetails.html?movieId=${id}`);
    });

    // movie info
    const movieInfo = document.createElement("div");
    const movieTitle = document.createElement("h3");
    const movieRating = document.createElement("span");
    const movie_rating = Math.floor(vote_average);
    movieRating.innerText = movie_rating;
    let color = "green";
    if (movie_rating < 7) color = "red";
    movieRating.classList.add(color);
    movieTitle.innerText = title;
    movieInfo.classList.add("movie-info");
    movieInfo.appendChild(movieRating);
    movieInfo.appendChild(movieTitle);
    movieEl.appendChild(movieInfo);

    //movie Overview
    const movieOverview = document.createElement("div");
    const movieOverviewcard = document.createElement("h3");
    movieOverview.classList.add("overview");
    movieOverview.innerText = overview;
    movieOverviewcard.innerText = "overview";
    movieOverview.appendChild(movieOverviewcard);
    movieEl.appendChild(movieOverview);

    main.appendChild(movieEl);
  });
}

// mobile hamburger menu

const sideNav = document.querySelector(".sideNav");
const overlay = document.querySelector(".overlay");
const ham = document.querySelector(".ham");
const menuX = document.querySelector(".menuX");
const menuItems = document.querySelectorAll(".menuLink");

menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", toggleHamburger);
});

ham.addEventListener("click", toggleHamburger);
menuX.addEventListener("click", toggleHamburger);
overlay.addEventListener("click", toggleHamburger);

function toggleHamburger() {
  overlay.classList.toggle("showOverlay");
  sideNav.classList.toggle("showNav");
}
