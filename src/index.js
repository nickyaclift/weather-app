/// Date formatting
let date = new Date();
// console.log(date);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
// console.log(hours);
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
// console.log(minutes);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// console.log(days[date.getDay()]);
let monthDate = date.getDate();
// console.log(monthDate);
let monthDates = [
  "0",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
  "31st",
];
// console.log(monthDates[date.getDate()]);
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
// console.log(months[date.getMonth()]);
let dayPlaceholder = document.querySelector(".day");
dayPlaceholder.innerHTML = `${days[date.getDay()]}`;
let datePlaceholder = document.querySelector(".date");
datePlaceholder.innerHTML = `${monthDates[date.getDate()]}`;
let monthPlaceholder = document.querySelector(".month");
monthPlaceholder.innerHTML = `${months[date.getMonth()]}`;
let timePlaceholder = document.querySelector(".time");
timePlaceholder.innerHTML = `${hours}:${minutes}`;
/// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
// Open Weather API - scrape temp, precip, humidity data
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  let apiKey = "a05f0202382b8935188265308a3e5140";
  let apiUnits = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=${apiKey}&units=${apiUnits}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showIcon);
  let forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&APPID=${apiKey}&units=${apiUnits}`;
  axios.get(forecastApiURL).then(displayForecast);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);
/// Using search button spyglass
function handleSearchButton(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  let apiKey = "a05f0202382b8935188265308a3e5140";
  let apiUnits = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=${apiKey}&units=${apiUnits}`;
  axios.get(apiUrl).then(showTemperature);
  let forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&APPID=${apiKey}&units=${apiUnits}`;
  axios.get(forecastApiURL).then(displayForecast);
}
let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", handleSearchButton);
/// Fetch data from API
function showTemperature(response) {
  celsuisTemp = Math.round(response.data.main.temp);
  let apiLocation = response.data.name;
  let cityPlaceholder = document.querySelector(".location");
  cityPlaceholder.innerHTML = `${apiLocation}`;
  let temperaturePlaceholder = document.querySelector(".temperature");
  temperaturePlaceholder.innerHTML = `${celsuisTemp}°C`;
  let description = response.data.weather[0].main;
  let descriptionPlaceholder = document.querySelector(".weatherDescription");
  descriptionPlaceholder.innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  let humuidityPlaceholder = document.querySelector(".humidityValue");
  humuidityPlaceholder.innerHTML = `Humidity: ${humidity}%`;
  let windSpeed = response.data.wind.speed;
  let windPlaceholder = document.querySelector(".windSpeed");
  windPlaceholder.innerHTML = `Wind Speed: ${windSpeed}m/s`;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let iconToday = document.querySelector(".weather-icon");
  iconToday.setAttribute("class", showIcon(response.data.weather[0].icon));
}
/// Use My Location button
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a05f0202382b8935188265308a3e5140";
  let apiUnits = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${apiUnits}`;
  axios.get(apiUrl).then(showTemperature);
  let forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=${apiUnits}`;
  axios.get(forecastApiURL).then(displayForecast);
}
function userLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector(".marker-location");
locationButton.addEventListener("click", userLocation);
// Display Forecast (5 day / 3 hour forecast)
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-sm-2">
  <div class="card border-info mb-3">
  <div class="card-header">${formatHours(forecast.dt * 1000)}</div>
  <div class="card-body">
  <h5 class="card-title weather-icon">
  <i class="${showIcon(forecast.weather[0].icon)} forecast-icon"></i>
  </h5>
  <p class="card-text"><strong>${Math.round(forecast.main.temp)}°C</strong></p>
  </div>
  </div>
  </div>`;
  }
}
// Default Location of London
function search(city) {
  let apiKey = "a05f0202382b8935188265308a3e5140";
  let apiUnits = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${apiUnits}`;
  axios.get(apiUrl).then(showTemperature);
  let forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=${apiUnits}`;
  axios.get(forecastApiURL).then(displayForecast);
}
// Show weather icons
function showIcon(iconValue) {
  if (iconValue === "01d" || iconValue === "01n") {
    return "fas fa-sun weather-icon weather-today";
  }
  if (iconValue === "02d" || iconValue === "02n") {
    return "fas fa-cloud-sun weather-icon weather-today";
  }
  if (iconValue === "03d" || iconValue === "03n") {
    return "fas fa-cloud weather-icon weather-today";
  }
  if (iconValue === "04d" || iconValue === "04n") {
    return "fas fa-cloud weather-icon weather-today";
  }
  if (iconValue === "09d" || iconValue === "09n") {
    return "fas fa-cloud-rain weather-icon weather-today";
  }
  if (iconValue === "10d" || iconValue === "10n") {
    return "fas fa-cloud-showers weather-icon weather-today";
  }
  if (iconValue === "11d" || iconValue === "11n") {
    return "fas fa-poo-storm weather-icon weather-today";
  }
  if (iconValue === "13d" || iconValue === "13n") {
    return "fas fa-snowflake weather-icon weather-today";
  }
  if (iconValue === "50d" || iconValue === "50n") {
    return "fas fa-stream weather-icon weather-today";
  }
}
// Change weather to Fahrenheit
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let fahrenheitTemperature = Math.round((celsuisTemp * 9) / 5 + 32);
  temperatureElement.innerHTML = `${fahrenheitTemperature}°F`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${celsuisTemp}°C`;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);
let celsuisTemp = null;
search("London");
