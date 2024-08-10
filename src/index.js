import './style.css';

//@to-do 1: найти элементы
const buttonLondon = document.querySelector('.London');
const buttonMoscow = document.querySelector('.Moscow');
const buttonIstanbul = document.querySelector('.Istanbul');
const card = document.querySelector('.card');
const mainCity = card.querySelector('.main__city');
const mainDate = card.querySelector('.main__date');
const placesTemperature = card.querySelector('.places__temperature');
const buttons = Array.from(document.querySelectorAll('.header__item'));
const placesTitle = Array.from(card.querySelectorAll('.places__title'));
const placesAccent = Array.from(card.querySelectorAll('.places__accent'));

//@to-do 2: подключить апи по документации https://openweathermap.org/current
const wetherConfig = {
  url: 'https://api.openweathermap.org/data/2.5/weather?',
  key: process.env.KEY,
  city: {
    London: 'q=London',
    Moscow: 'q=Moscow',
    Istanbul: 'q=Istanbul',
  },
};

const resolve = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка запроса: ${res.status}`);
};

//@to-do 3: написать функции получения погоды по разным городам
const getLondonWether = () => {
  return fetch(
    `${wetherConfig.url}${wetherConfig.city.London}&appid=${wetherConfig.key}&units=metric`
  )
    .then((res) => resolve(res))
    .then((data) => {
      return data;
    });
};

const getMoscowWether = () => {
  return fetch(
    `${wetherConfig.url}${wetherConfig.city.Moscow}&appid=${wetherConfig.key}&units=metric`
  )
    .then((res) => resolve(res))
    .then((data) => {
      return data;
    });
};
const getIstanbulWether = () => {
  return fetch(
    `${wetherConfig.url}${wetherConfig.city.Istanbul}&appid=${wetherConfig.key}&units=metric`
  )
    .then((res) => resolve(res))
    .then((data) => {
      return data;
    });
};

//@to-do 4: получить дату и время запроса https://learn.javascript.ru/datetime
const localDate = () => {
  let currentDate = new Date();
  const option = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  let formatDate = currentDate.toLocaleString('en-US', option);
  return formatDate;
};

//@to-do 5: написать функцию изменения информации в карточке
const addCardInfo = (data) => {
  const placesTitleInfo = [
    `${data.wind.speed}`,
    `${data.main.humidity}`,
    `${data.visibility / 1000}`,
  ];
  const placesAccentInfo = [
    `${data.main.feels_like}°`,
    `${data.main.temp}°`,
    `${data.main.pressure} hPA`,
    `${data.clouds.all}%`,
    `${data.main.temp_min}°`,
    `${data.main.temp_max}°`,
  ];
  mainCity.textContent = data.name;
  mainDate.textContent = localDate();
  placesTemperature.textContent = `${Math.round(data.main.temp)}°`;
  placesTitle.forEach((item, index) => {
    item.textContent = placesTitleInfo[index];
  });
  placesAccent.forEach((item, index) => {
    item.textContent = placesAccentInfo[index];
  });
};

//@to-do 6: написать функцию появления карточки в разметке
const showCardInfo = () => {
  if (card.classList.contains('main__card_visible')) {
    card.classList.remove('main__card_visible');
  }
  card.classList.add('main__card_visible');
};

//@to-do 7: написать функции отображения карточки при нажатии на кнопки
const handleRenderCardLondon = () => {
  showCardInfo();
  resetButtonStyle();
  buttonLondon.classList.add('is-active');
  getLondonWether().then((data) => addCardInfo(data));
};

const handleRenderCardMoscow = () => {
  showCardInfo();
  resetButtonStyle();
  buttonMoscow.classList.add('is-active');
  getMoscowWether().then((data) => addCardInfo(data));
};

const handleRenderCardIstanbul = () => {
  showCardInfo();
  resetButtonStyle();
  buttonIstanbul.classList.add('is-active');
  getIstanbulWether().then((data) => addCardInfo(data));
};

//@to-do 8: написать функцию сброса стилей для кнопок
const resetButtonStyle = () => {
  buttons.forEach((button) => {
    button.classList.remove('is-active');
  });
};

//@to-do 9: навесить слушатели на кнопки
buttons.forEach((item, index) => {
  switch (index) {
    case 0:
      item.addEventListener('click', handleRenderCardLondon);
      break;
    case 1:
      item.addEventListener('click', handleRenderCardMoscow);
      break;
    case 2:
      item.addEventListener('click', handleRenderCardIstanbul);
      break;
    default:
      break;
  }
});
