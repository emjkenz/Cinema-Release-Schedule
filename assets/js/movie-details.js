document.addEventListener("DOMContentLoaded", () => {
  const film = JSON.parse(localStorage.getItem("selectedFilm"));

  if (film) {
    document.getElementById("movie-name").textContent = film.film_name;
    document.getElementById("movie-poster").src =
      film.images.poster["1"].medium.film_image;
    document.getElementById("age-rating").textContent =
      film.age_rating[0].rating + " - " + film.age_rating[0].age_advisory;
    document.getElementById("synopsis").textContent = film.synopsis_long;
    document.getElementById("movie-trailer").querySelector("source").src =
      film.film_trailer;
  } else {
    // Redirect back to the main page if no film data is found in localStorage
    window.location.href = "../index.html";
  }
});
