"use strict";

const filmsDetailsUrl =
  "https://api-gate2.movieglu.com/filmDetails/?film_id=7772"; //change the film id
const filmsComingSoonUrl =
  "https://api-gate2.movieglu.com/filmsComingSoon/?n=5";
const filmsLiveSearchUrl =
  "https://api-gate2.movieglu.com/filmLiveSearch/?n=2&query=Raiders+of+the+Lost+Ark"; //change the movie name
const cinemaLiveSarchUrl =
  "https://api-gate2.movieglu.com/cinemaLiveSearch/?n=2&query=Cinema+4"; //change the cinema name
const cinemaDetailUrl =
  "https://api-gate2.movieglu.com/cinemaDetails/?cinema_id=8930"; //change the cinema id
const cinemaShowtimeUrl =
  "https://api-gate2.movieglu.com/cinemaShowTimes/?film_id=7772&cinema_id=8930&date=2023-03-30"; //with or without film id
const cinemaNearbyUrl = "https://api-gate2.movieglu.com/cinemasNearby/?n=2"; //change the n if want to show more
const filmsNowShowingUrl =
  "https://api-gate2.movieglu.com/filmsNowShowing/?n=5";

function getCurrentDatetime() {
  return new Date().toISOString();
}

const headers = new Headers({
  "api-version": "v200",
  Authorization: "Basic TU9OQV85X1hYOk03d1ZOb3JEOHI4Qg==",
  client: "ABCD",
  "x-api-key": "XvpopD5Dr86Lb8BsH22xY1t0q4FNE33c9O64HfMN",
  "device-datetime": getCurrentDatetime(),
  territory: "XX",
});

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function createCarouselItem(film) {
  const carouselItem = document.createElement("a");
  carouselItem.classList.add("carousel-item");
  carouselItem.href = `#${film.film_id}`;

  const img = document.createElement("img");
  img.src = film.images.poster["1"].medium.film_image;
  img.alt = film.film_name;

  carouselItem.appendChild(img);
  return carouselItem;
}

async function loadCarousel() {
  const apiResponse = await fetchData(filmsNowShowingUrl);

  if (apiResponse) {
    // Add carousel items to the carousel
    const carouselElement = document.getElementById("movie-carousel");
    apiResponse.films.forEach((film) => {
      const carouselItem = createCarouselItem(film);
      carouselElement.appendChild(carouselItem);

      carouselItem.addEventListener("click", () => {
        localStorage.setItem("selectedFilm", JSON.stringify(film));
        window.location.href = "/detailpage";
      });
    });

    // Initialize the MaterializeCSS carousel
    const carouselOptions = {
      fullWidth: false,
      indicators: true,
    };
    const carousel = document.querySelectorAll(".carousel");
    const instances = M.Carousel.init(carousel, carouselOptions);

    // Add event listeners for the carousel control buttons
    document
      .querySelector(".carousel-prev")
      .addEventListener("click", carouselPrev);
    document
      .querySelector(".carousel-next")
      .addEventListener("click", carouselNext);
  }
}

// Function for moving the carousel to the previous item
function carouselPrev() {
  const carouselInstance = M.Carousel.getInstance(
    document.querySelector(".carousel")
  );
  carouselInstance.prev();
}

// Function for moving the carousel to the next item
function carouselNext() {
  const carouselInstance = M.Carousel.getInstance(
    document.querySelector(".carousel")
  );
  carouselInstance.next();
}

document.addEventListener("DOMContentLoaded", loadCarousel);
$(document).ready(function(){
  var d = new Date();
  $('#copywrite-date').text(d.getFullYear())
})
