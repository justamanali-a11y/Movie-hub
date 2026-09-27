const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");

movieForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let query = movieInput.value.trim();

  if (!query) return;

  searchMovies(query);
});

async function searchMovies(movieName) {

  // Loading UI
  movieHub.innerHTML = `
    <div class="col-span-full flex justify-center py-10">
      <div class="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  `;

  let response = await fetch(
    `https://www.omdbapi.com/?apikey=3eed3bad&s=${encodeURIComponent(movieName)}`
  );

  let data = await response.json();

  if (data.Response === "True") {
    displayMovies(data.Search);
  } else {
    movieHub.innerHTML = `
      <div class="col-span-full text-center py-10">
        <p class="text-red-500 text-xl font-semibold">${data.Error}</p>
      </div>
    `;
  }
}

function displayMovies(movies) {

  movieHub.innerHTML = "";

  movies.forEach((movie) => {

    const div = document.createElement("div");

    div.dataset.imdbID = movie.imdbID;

    div.className =
      "movie-card cursor-pointer bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-red-500/30 transition-all duration-300";

    div.innerHTML = `
      <div class="relative">

        <img
          src="${movie.Poster !== "N/A"
            ? movie.Poster
            : "https://placehold.co/300x450?text=No+Image"}"
          alt="${movie.Title}"
          class="w-full h-80 object-cover"
        >

        <span class="absolute top-3 right-3 bg-red-600 text-xs px-3 py-1 rounded-full">
          ${movie.Year}
        </span>

      </div>

      <div class="p-4">

        <h2 class="font-bold text-lg text-white line-clamp-2">
          ${movie.Title}
        </h2>

        <p class="text-slate-400 text-sm mt-2">
          IMDb ID: ${movie.imdbID}
        </p>

        <button class="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition">
          View Details
        </button>

      </div>
    `;

    movieHub.append(div);
  });
}

// Open Details Page
movieHub.addEventListener("click", (e) => {

  const movieCard = e.target.closest(".movie-card");

  if (!movieCard) return;

  const imdbID = movieCard.dataset.imdbID;

  location.href = `movie-details.html?id=${imdbID}`;
});