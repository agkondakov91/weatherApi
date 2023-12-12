// ***************************************** //
//@to-do: найти элементы
const buttonLondon = document.querySelector(".London");
const buttonMoscow = document.querySelector(".Moscow");
const buttonIstanbul = document.querySelector(".Istanbul");
const buttons = document.querySelectorAll(".header__item");
const pageColor = document.querySelector(".page");

//@to-do: найти темплейт
const main = document.querySelector(".main");
const template = document.querySelector("#template").content;

//@to-do: подключить апи по документации https://openweathermap.org/current
const apiWeather = {
  url: "http://api.openweathermap.org/data/2.5/weather?",
  key: "df63a1c95610dafbdefed187acab2173",
  townL: "q=London",
  townM: "q=Moscow",
  townI: "q=Istanbul",
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getWeatherLondon = () => {
  fetch(
    `${apiWeather.url}${apiWeather.townL}&appid=${apiWeather.key}&units=metric`,
    {
      method: "GET",
    }
  )
    .then((res) => checkResponse(res))
    .then((data) => {
      const card = createCard(data);
      main.prepend(card);
    });
};

const getWeatherMoscow = () => {
  fetch(
    `${apiWeather.url}${apiWeather.townM}&appid=${apiWeather.key}&units=metric`,
    {
      method: "GET",
    }
  )
    .then((res) => checkResponse(res))
    .then((data) => {
      const card = createCard(data);
      main.prepend(card);
    });
};

const getWeatherIstanbul = () => {
  fetch(
    `${apiWeather.url}${apiWeather.townI}&appid=${apiWeather.key}&units=metric`,
    {
      method: "GET",
    }
  )
    .then((res) => checkResponse(res))
    .then((data) => {
      const card = createCard(data);
      main.prepend(card);
    });
};

//@to-do: клонировать темплейт
const cloneCardTemplate = () => {
  return template.querySelector(".card").cloneNode(true);
};

//@to-do: написать функцию создания карточки погоды
const createCard = (data) => {
  const cardTemplate = cloneCardTemplate();
  const mainCity = cardTemplate.querySelector(".main__city");
  const mainDate = cardTemplate.querySelector(".main__date");
  const temperature = cardTemplate.querySelector(".places__temperature");
  const placesTitle = Array.from(
    cardTemplate.querySelectorAll(".places__title")
  );
  const placesAccent = Array.from(
    cardTemplate.querySelectorAll(".places__accent")
  );

  mainCity.textContent = data.name;
  mainDate.textContent = getDateNow();
  temperature.textContent = `${Math.round(data.main.temp)} °`;

  placesTitle.forEach((item, index) => {
    switch (index) {
      case 0:
        item.textContent = data.wind.speed;
        break;
      case 1:
        item.textContent = data.main.humidity;
        break;
      case 2:
        item.textContent = data.visibility / 1000;
        break;
      default:
        break;
    }
  });

  placesAccent.forEach((item, index) => {
    switch (index) {
      case 0:
        item.textContent = `${data.main.feels_like}°`;
        break;
      case 1:
        item.textContent = `${data.main.temp}°`;
        break;
      case 2:
        item.textContent = `${data.main.pressure} hPA`;
        break;
      case 3:
        item.textContent = `${data.clouds.all}%`;
        break;
      case 4:
        item.textContent = `${data.main.temp_min}°`;
        break;
      case 5:
        item.textContent = `${data.main.temp_max}°`;
        break;
      default:
        break;
    }
  });

  return cardTemplate;
};

//@to-do: получить дату и время запроса https://learn.javascript.ru/datetime
const getDateNow = () => {
  let date = new Date();
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  let formatDate = date.toLocaleString("en-US", option);
  return formatDate;
};

//@to-do: написать функции рендера для кнопок
const handleRenderCardLondon = () => {
  deleteCard();
  resetButtonStyle();
  buttonLondon.classList.add("is-active");
  getWeatherLondon();
};

const handleRenderCardMoscow = () => {
  deleteCard();
  resetButtonStyle();
  buttonMoscow.classList.add("is-active");
  getWeatherMoscow();
};

const handleRenderCardIstanbul = () => {
  deleteCard();
  resetButtonStyle();
  buttonIstanbul.classList.add("is-active");
  getWeatherIstanbul();
};

//@to-do: написать функцию сброса стилей для кнопок
const resetButtonStyle = () => {
  buttons.forEach((button) => {
    button.classList.remove("is-active");
  });
};

//@to-do: написать функцию удаления карточки
const deleteCard = () => {
  const cardElement = main.querySelector(".card");
  if (cardElement) {
    cardElement.remove();
  }
};

//@to-do: навесить слушатели на кнопки
buttonLondon.addEventListener("click", handleRenderCardLondon);
buttonMoscow.addEventListener("click", handleRenderCardMoscow);
buttonIstanbul.addEventListener("click", handleRenderCardIstanbul);

// ***************************************** //
