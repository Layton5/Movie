const img_url = "https://image.tmdb.org/t/p/w500";
const getMovieDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieIdQuery = urlParams.get("movieId");
  // get all genre from api
  const url = `https://api.themoviedb.org/3/movie/${movieIdQuery}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmMyZTBhZDczYWYzZTliMTgxNTU0Y2MxMWNlODI5MiIsInN1YiI6IjY1MDk3ZDU1Mzk0YTg3MDBhZGE4ZTg2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.te-DX3pegO3--0NXSLJe8GwqqaeHE_iyYWmSfuPhqoY",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      //   const details = json.genres;
      console.log(json);

      const { title, poster_path, release_date, revenue, runtime } = json;
      const movieImg = document.querySelector("#detail");
      const img = document.createElement("img");
      img.src = img_url + poster_path;
      img.classList.add("details");
      movieImg.appendChild(img);

      const movieDetails = document.createElement("div");
      movieDetails.classList.add("movieDetail");
      const movieDate = document.createElement("h2");
      const movieTitle = document.createElement("h2");
      const movieRuntime = document.createElement("h2");
      const movieRevenue = document.createElement("span");

      movieRevenue.innerText = `Evaluation:$${revenue.toLocaleString()}`;
      movieDate.innerText = `Release date: ${release_date}`;
      movieTitle.innerText = `Title:${title}`;
      movieRuntime.innerText = `Runtime: ${runtime} minutes`;
      movieDetails.appendChild(movieTitle);
      movieDetails.appendChild(movieRuntime);
      movieDetails.appendChild(movieDate);
      movieDetails.appendChild(movieRevenue);

      movieImg.appendChild(movieDetails);
    })
    .catch((err) => console.error("error:" + err));
};

getMovieDetails();
