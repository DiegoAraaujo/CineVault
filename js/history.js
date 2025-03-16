let watchedMoviesContainer = document.getElementById("watched-movies-list");

let watchedMovies = JSON.parse(localStorage.getItem("moviesWatched")) ?? [];

function addToWatchlist(movieId) {
  console.log(isMovieInWatchedList(movieId));
  try {
    if (isMovieInWatchedList(movieId)) {
      throw new Error("You have already marked this movie as previously watched!");
    }

    notie.confirm({
      text: "The movie will be moved to your watched list, okay?",
      submitText: "Sim",
      cancelText: "Não",
      position: "top",
      submitCallback: function () {
        const movieToAdd = findMovieById(movieId);
        watchedMovies.push(movieToAdd);
        saveWatchedMoviesToLocalStorage();
        removeMovieFromList(movieId, false);
      },
    });
  } catch (error) {
    notie.alert({
      type: "error",
      text: error.message,
    });
  }
}

function findMovieById(movieId) {
  const movie = userMovieList.find((movie) => movie.imdbID === movieId);
  return movie;
}

function saveWatchedMoviesToLocalStorage() {
  localStorage.setItem("moviesWatched", JSON.stringify(watchedMovies));
}

for (let movie of watchedMovies) {
  watchedMoviesContainer.innerHTML += `
    <div class="item-watched">
      <img src=${movie.Poster} alt="" class="movie-poster" />
      <div>watched</div>
    </div>
  `;
}

function isMovieInWatchedList(movieId) {
  return watchedMovies.some((movie) => movie.imdbID === movieId);
}