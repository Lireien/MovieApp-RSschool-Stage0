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

console.log('1. Вёрстка +10\n -на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма. Также на карточке может быть другая информация, которую предоставляет API, например, описание фильма, его рейтинг на IMDb и т.д. +5\n -в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n 2.При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10\n 3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10\n 4. Поиск +30\n -при открытии приложения курсор находится в поле ввода +5\n -есть placeholder +5\n -автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n -поисковый запрос можно отправить нажатием клавиши Enter +5\n -после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n -в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\n Total: 60 points');