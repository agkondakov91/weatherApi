// const apiWeather = {
//     url: 'http://api.openweathermap.org/data/2.5/weather?',
//     key: 'df63a1c95610dafbdefed187acab2173',
//     town: 'q=London'
// }

// const checkResponse = (res) => {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
// }

// const getWeather = () => {
//     fetch(`${apiWeather.url}${apiWeather.town}&appid=${apiWeather.key}&units=metric`, {
//         method: 'GET'
//     })
//     .then(res => checkResponse(res))
//     .then((data) => {
//         console.log(data);
//     })
// }

// getWeather();