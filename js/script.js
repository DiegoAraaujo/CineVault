// Elementos do DOM
const searchButton = document.getElementById("search-movie-button");
const addToListButton = document.getElementById("add-to-list-button");
const movieNameInput = document.getElementById("movie-name");
const movieYearInput = document.getElementById("release-year");
const movieDetailsContainer = document.getElementById("movie-details");
const movieListContainer = document.getElementById("movie-list-container");

// Constantes e variáveis globais
const apiKey = "c6928bb0";
let currentMovieData = {};
let userMovieList = JSON.parse(localStorage.getItem("userMovieList")) ?? [];

// Funções de busca e manipulação de dados
async function fetchMovieData() {
  try {
    const url = generateSearchUrl();
    const response = await fetch(url);
    const data = await response.json();

    if (data.Error) {
      throw new Error("Movie not found");
    }
    updateMovieDetailsPanel(data);
    currentMovieData = data;
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}

function generateSearchUrl() {
  const movieName = formatMovieNameForUrl();
  const movieYear = formatMovieYearForUrl();
  return `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}&y=${movieYear}`;
}

function formatMovieNameForUrl() {
  if (movieNameInput.value === "") {
    throw new Error("The name of the film must be informed");
  }
  return movieNameInput.value.split(" ").join("+").toLowerCase();
}

function formatMovieYearForUrl() {
  if (movieYearInput.value === "") {
    return "";
  }

  if (
    Number.isNaN(Number(movieYearInput.value)) ||
    movieYearInput.value.length !== 4
  ) {
    throw new Error("Invalid film year");
  }
  return movieYearInput.value;
}

// Funções de atualização da interface
function updateMovieDetailsPanel(movieData) {
  movieDetailsContainer.innerHTML = `
    <img src=${movieData.Poster} alt="" class="movie-poster" />
    <div>
      <h2>${movieData.Title}</h2>
      <p>${movieData.Plot}</p>
      <div>${movieData.Actors}</div>
    </div>
  `;
}

function resetMovieDetailsPanel() {
  movieDetailsContainer.innerHTML = `
    <img src="assets/images/poster-tema.png" alt="" class="movie-poster" />
    <div>
      <h2>Search for your favorite film</h2>
      <p>
        Hi, my name is José Diego. I'm studying Computer Science and I
        love world cinema. With CineVault, you can explore a vast playlist
        of movies, series, and everything related to the world of screens
        and audiovisual entertainment.
      </p>
      <div>
        <a href="https://github.com/DiegoAraaujo" target="_blank">
          <ion-icon name="logo-github"></ion-icon>
        </a>
        <a href="https://www.linkedin.com/in/diego-ara%C3%BAjo-81733a319/" target="_blank">
          <ion-icon name="logo-linkedin"></ion-icon>
        </a>
      </div>
    </div>
  `;
}

function renderMovieItem(movieObject) {
  movieListContainer.innerHTML += `
    <div class="item-film" id="item-film-${movieObject.imdbID}">
      <img src=${movieObject.Poster} alt="" class="movie-poster" />
      <div class="buttons-controller-list">
        <button onclick="addToWatchlist('${movieObject.imdbID}')">watched <ion-icon name="checkmark-sharp"></ion-icon></button>
        <button onclick="removeMovieFromList('${movieObject.imdbID}')">remove <ion-icon name="trash-sharp"></ion-icon></button>
      </div>
    </div>
  `;
}

// Funções de manipulação da lista de filmes
function addMovieToList() {
  try {
    if (Object.keys(currentMovieData).length === 0) {
      throw new Error("Search for a movie to add to your list!");
    }

    if (isMovieInList(currentMovieData.imdbID)) {
      resetMovieDetailsPanel();
      clearSearchInputs();
      throw new Error("Cannot add a repeated movie!");
    }
    renderMovieItem(currentMovieData);
    userMovieList.push(currentMovieData);
    notie.alert({ type: "success", text: "Movie added successfully" });
    clearSearchInputs();
    resetMovieDetailsPanel();
    saveMovieListToLocalStorage();
  } catch (error) {
    notie.alert({
      type: "error",
      text: error.message,
    });
  }
}

function removeMovieFromList(id, showConfirmation = true) {
  if (showConfirmation) {
    notie.confirm({
      text: "Do you want to remove the movie from your list?",
      submitText: "Yes",
      cancelText: "No",
      position: "top",
      submitCallback: function () {
        userMovieList = userMovieList.filter((movie) => movie.imdbID !== id);
        document.getElementById(`item-film-${id}`).remove();
        saveMovieListToLocalStorage();
      },
    });
  } else {
    // Remove diretamente sem exibir o alerta
    userMovieList = userMovieList.filter((movie) => movie.imdbID !== id);
    document.getElementById(`item-film-${id}`).remove();
    saveMovieListToLocalStorage();
  }
}

function isMovieInList(id) {
  return userMovieList.some((movie) => movie.imdbID === id);
}

// Funções de reset e persistência de dados
function clearSearchInputs() {
  movieNameInput.value = "";
  movieYearInput.value = "";
  currentMovieData = {};
}

function saveMovieListToLocalStorage() {
  localStorage.setItem("userMovieList", JSON.stringify(userMovieList));
}

// Inicialização
for (const movie of userMovieList) {
  renderMovieItem(movie);
}

// Event listeners
searchButton.addEventListener("click", fetchMovieData);
addToListButton.addEventListener("click", addMovieToList);