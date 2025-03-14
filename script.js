const buttonSearchElement = document.getElementById("searchButton");
const buttonAddToListFilms = document.getElementById("addToList");
const movieNameElement = document.getElementById("film-name");
const movieYearElement = document.getElementById("year");
const movieInfoContainer = document.getElementById("movie-info");
const ListOfFilmsContainer = document.getElementById(
  "section-list-movies-container"
);
const key = "c6928bb0";
let currentMovie = {};
let filmList = JSON.parse(localStorage.getItem("filmList")) ?? [];

async function searchForMovie() {
  try {
    const url = buildSearchUrl();
    const response = await fetch(url);
    const data = await response.json();

    if (data.Error) {
      throw new Error("Filme não encontrado");
    }
    updatetheSearchedMoviePanel(data);
    currentMovie = data;
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

function buildSearchUrl() {
  const movieName = movieNameParameterGenerator();
  const movieYear = movieYearParameterGenerator();
  return `http://www.omdbapi.com/?apikey=${key}&t=${movieName}&y=${movieYear}`;
}

function movieNameParameterGenerator() {
  if (movieNameElement.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieNameElement.value.split(" ").join("+").toLowerCase();
}

function movieYearParameterGenerator() {
  if (movieYearElement.value === "") {
    return "";
  }

  if (
    Number.isNaN(Number(movieYearElement.value)) ||
    movieYearElement.value.length !== 4
  ) {
    throw new Error("Ano do filme invalido");
  }
  return movieYearElement.value;
}

function updatetheSearchedMoviePanel(FilmDates) {
  movieInfoContainer.innerHTML = `
  <img src=${FilmDates.Poster} alt="" class="poster-image" />
  <div>
    <h2>${FilmDates.Title}</h2>
    <p>
      ${FilmDates.Plot}
    </p>
    <div>
      ${FilmDates.Actors}
    </div>
  </div>
  `;
}

function addMovieToUserList() {
  try {
    if (Object.keys(currentMovie).length === 0) {
      throw new Error("Pesquise por um filme para adicionar a sua lista!");
    }

    if (checkIfMovieIsOnTheList(currentMovie.imdbID)) {
      resetSearchDisplayPanel();
      resetLastSearchData();
      throw new Error("Não é possivel adicionar um filme repetido!");
    }
    renderMoviesFromFist(currentMovie);
    filmList.push(currentMovie);
    notie.alert({ type: "success", text: "filme adicionado com sucesso" });
    resetLastSearchData();
    resetSearchDisplayPanel();
    SaveInfosOfLOcalStorage();
  } catch (error) {
    notie.alert({
      type: "error",
      text: error.message,
    });
  }
}

function removeMovieToUserList(id) {
  notie.confirm({
    text: "Deseja remover o filme de sua lista?",
    submitText: "Sim",
    cancelText: "não",
    position: "top",
    submitCallback: function removeMovie() {
      filmList = filmList.filter((movie) => movie.imdbID !== id);
      document.getElementById(`item-film-${id}`).remove();
      SaveInfosOfLOcalStorage();
    },
  });
}

function resetLastSearchData() {
  movieNameElement.value = "";
  movieYearElement.value = "";
  currentMovie = {};
}

function resetSearchDisplayPanel() {
  movieInfoContainer.innerHTML = `
  <img src="./assets/poster-tema.png" alt="" class="poster-image" />
  <div>
    <h2>Search for your preference film</h2>
    <p>
    Hi, my name is José Diego. I'm studying Computer Science and I
    love world cinema. With CineVUlt, you can explore a vast playlist
    of movies, series, and everything related to the world of screens
    and audiovisual entertainment.
    </p>
  <div>
    <a href="https://github.com/DiegoAraaujo" target="_blank">
    <ion-icon name="logo-github"></ion-icon>
    </a>
    <a
    href="https://www.linkedin.com/in/diego-ara%C3%BAjo-81733a319/"
    target="_blank"
    ><ion-icon name="logo-linkedin"></ion-icon
    ></a>
  </div>
  `;
}

function renderMoviesFromFist(filmObject) {
  ListOfFilmsContainer.innerHTML += `
  <div class="item-film" id="item-film-${filmObject.imdbID}">
    <img src=${filmObject.Poster} alt="" class="poster-image" />
    <div class="buttons-controller-list">
      <button>watched <ion-icon name="checkmark-sharp"></ion-icon></button>
      <button onclick="removeMovieToUserList('${filmObject.imdbID}')">remove <ion-icon name="trash-sharp"></ion-icon></button>
    </div>
  </div>
`;
}

function checkIfMovieIsOnTheList(id) {
  function doesThisIdBelongThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(filmList.find(doesThisIdBelongThisMovie));
}

function SaveInfosOfLOcalStorage() {
  localStorage.setItem("filmList", JSON.stringify(filmList));
}

for (const film of filmList) {
  renderMoviesFromFist(film);
}

buttonSearchElement.addEventListener("click", searchForMovie);
buttonAddToListFilms.addEventListener("click", addMovieToUserList);
