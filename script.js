const API_KEY = 'api_key=583173f8016aa5b13004b7ead38b4011';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const containerElement = document.querySelector('.container');
const formElement = document.querySelector('.search-form');
const searchElement = document.querySelector('.search-input');
const clearBtnElement = document.querySelector('.clear-button');

getData(API_URL);

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  showData(data.results);
}
function showData(data) {
  containerElement.innerHTML = '';
  if (data.length > 0) {
    data.forEach(({ title, poster_path, vote_average, overview }) => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie');
      movieCard.innerHTML = `
    <img
    src="${IMG_PATH + poster_path}"
    alt="${title}"
    class="movie-image"
  />
  <div class="movie-info">
    <h3 class="movie-title">${title}</h3>

    <span class="rating ${getRateColor(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3 class="overview-title">Overview</h3>
    ${overview}
  </div>`;
      containerElement.append(movieCard);
    });
  } else {
    const errorElement = document.createElement('p');
    errorElement.classList.add('error-message');
    errorElement.innerHTML =
      'Sorry, there is nothing that matches your search';
    containerElement.append(errorElement);
  }
}

function getRateColor(rating) {
  if (rating >= 8) {
    return 'green';
  } else if (rating >= 5) {
    return 'yellow';
  } else {
    return 'red';
  }
}

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchElement.value;

  if (searchTerm) {
    getData(SEARCH_URL + '&query=' + searchTerm);
  } else {
    getData(API_URL);
  }
});

clearBtnElement.addEventListener('click', () => {
  getData(API_URL);
});

console.log('1. ?????????????? +10\n -???? ???????????????? ???????? ?????????????????? ???????????????? ?????????????? ?? ???????????? ????????????. ???? ???????????? ???????????????? ???????????? ???????? ???????????? ?? ???????????????? ????????????. ?????????? ???? ???????????????? ?????????? ???????? ???????????? ????????????????????, ?????????????? ?????????????????????????? API, ????????????????, ???????????????? ????????????, ?????? ?????????????? ???? IMDb ?? ??.??. +5\n -?? ???????????? ???????????????????? ???????? ???????????? ???? ???????????? ???????????? ????????????????????, ?????? ???????????????? ????????????????????, ?????????????? ?????????? ???? ?????????????? ???? ???????? +5\n 2.?????? ???????????????? ???????????????????? ???? ???????????????? ???????????????????????? ???????????????? ?????????????? ?? ?????????????????????? ???? API ?????????????? +10\n 3. ???????? ?? ???????? ???????????? ???????????? ?????????? ?? ?????????????????? ?????????????????? ????????????, ???? ???????????????? ?????????????????????? ???????????????? ??????????????, ?? ?????????????????? ?????????????? ???????? ?????? ??????????, ???????? ?????????? ???????????? ?????????????????????????? API +10\n 4. ?????????? +30\n -?????? ???????????????? ???????????????????? ???????????? ?????????????????? ?? ???????? ?????????? +5\n -???????? placeholder +5\n -???????????????????????????? ???????? ?????????? ?????????????????? (?????? ?????????????????????? ???????????? ?? ?????????????????????? ??????????????????) +5\n -?????????????????? ???????????? ?????????? ?????????????????? ???????????????? ?????????????? Enter +5\n -?????????? ???????????????? ???????????????????? ?????????????? ?? ?????????????????????? ?????????????????????? ????????????, ?????????????????? ???????????? ???????????????????? ???????????????????????? ?? ???????? ?????????? +5\n -?? ???????? ?????????? ???????? ?????????????? ?????? ?????????? ???? ???????????????? ?????????????????? ???????????? ???? ???????? ?????????? ?????????????????? ?? ???????????????????????? placeholder +5\n Total: 60 points');