"use strict";

const filmsNowShowingUrl =
  "https://api-gate2.movieglu.com/filmsNowShowing/?n=5";
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

const fetchData = function (url) {
  fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

fetchData(filmsNowShowingUrl);
// fetchData(filmsDetailsUrl);
// fetchData(filmsComingSoonUrl);
// fetchData(filmsLiveSearchUrl);
// fetchData(cinemaDetailUrl);
// fetchData(cinemaLiveSarchUrl);
// fetchData(cinemaShowtimeUrl);
