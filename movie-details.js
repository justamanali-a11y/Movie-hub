const movieDetail = document.querySelector("#movie-detail");

const params = new URLSearchParams(location.search);
const imdbID = params.get("id");

if (imdbID) {
  searchMovie(imdbID.trim());
}

async function searchMovie(imdbID) {

  movieDetail.innerHTML = `
    <div class="flex justify-center py-20">
      <div class="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  `;

  let response = await fetch(
    `https://www.omdbapi.com/?apikey=3eed3bad&i=${imdbID}&plot=full`
  );

  let data = await response.json();

  if (data.Response === "True") {
    displayMovie(data);
  } else {
    movieDetail.innerHTML = `<p class="text-center text-red-500 text-xl">${data.Error}</p>`;
  }
}

function displayMovie(data) {

  movieDetail.innerHTML = `
    <div class="grid md:grid-cols-2 gap-10 bg-slate-900 p-8 rounded-3xl shadow-2xl">

      <!-- Poster -->
      <img src="${data.Poster}" alt="${data.Title}"
        class="w-full rounded-2xl shadow-lg object-cover">

      <!-- Details -->
      <div>

        <h1 class="text-4xl font-bold mb-2">${data.Title}</h1>

        <p class="text-yellow-400 text-xl mb-5">
          ⭐ IMDb ${data.imdbRating}/10
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-3 mb-6">
          <span class="bg-red-600 px-3 py-1 rounded-full text-sm">${data.Released}</span>
          <span class="bg-slate-800 px-3 py-1 rounded-full text-sm">${data.Rated}</span>
          <span class="bg-slate-800 px-3 py-1 rounded-full text-sm">${data.Runtime}</span>
          <span class="bg-slate-800 px-3 py-1 rounded-full text-sm">${data.Genre}</span>
        </div>

        <!-- Plot -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2 text-red-400">📖 Plot Overview</h2>
          <p class="text-slate-300 leading-7">${data.Plot}</p>
        </div>

        <!-- Info -->
        <div class="space-y-3 text-slate-300">
          <p><span class="font-semibold text-white">🎬 Director:</span> ${data.Director}</p>
          <p><span class="font-semibold text-white">✍ Writer:</span> ${data.Writer}</p>
          <p><span class="font-semibold text-white">🎭 Actors:</span> ${data.Actors}</p>
          <p><span class="font-semibold text-white">🌍 Language:</span> ${data.Language}</p>
          <p><span class="font-semibold text-white">📍 Country:</span> ${data.Country}</p>
        </div>

        <!-- IMDb Button -->
        <a href="https://www.imdb.com/title/${data.imdbID}"
          target="_blank"
          class="inline-block mt-8 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition">
          View on IMDb →
        </a>

      </div>
    </div>
  `;
}