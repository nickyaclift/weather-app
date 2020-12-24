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
  axios.get(apiUrl).then(showLocation);
  axios.get(apiUrl).then(showIcon);
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
  axios.get(apiUrl).then(showLocation);
  axios.get(apiUrl).then(showIcon);
}

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", handleSearchButton);

/// Fetch data from API
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperaturePlaceholder = document.querySelector(".temperature");
  temperaturePlaceholder.innerHTML = `${temperature}°C`;
  let description = response.data.weather[0].main;
  let descriptionPlaceholder = document.querySelector(".weatherDescription");
  descriptionPlaceholder.innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  let humuidityPlaceholder = document.querySelector(".humidityValue");
  humuidityPlaceholder.innerHTML = `Humidity: ${humidity}%`;
  let windSpeed = response.data.wind.speed;
  let windPlaceholder = document.querySelector(".windSpeed");
  windPlaceholder.innerHTML = `Wind Speed: ${windSpeed}m/s`;
}

/// Use My Location button
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a05f0202382b8935188265308a3e5140";
  let apiUnits = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${apiUnits}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showLocation);
  axios.get(apiUrl).then(showIcon);
}
function userLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let locationButton = document.querySelector(".marker-location");
locationButton.addEventListener("click", userLocation);

function showLocation(response) {
  let apiLocation = response.data.name;
  let cityPlaceholder = document.querySelector(".location");
  cityPlaceholder.innerHTML = `${apiLocation}`;
}
// Default Location of London
function search(city) {
  let apiKey = "a05f0202382b8935188265308a3e5140";
  let apiUnits = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=${apiUnits}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showLocation);
  axios.get(apiUrl).then(showIcon);
}

search("London");

// Show weather icons

function showIcon(response) {
  let iconToday = document.querySelector(".weather-icon");
  let iconValue = response.data.weather[0].icon;

  if (iconValue === "01d" || iconValue === "01n") {
    iconToday.setAttribute("class", "fas fa-sun weather-icon weather-today");
  }
  if (iconValue === "02d" || iconValue === "02n") {
    iconToday.setAttribute(
      "class",
      "fas fa-cloud-sun weather-icon weather-today"
    );
  }
  if (iconValue === "03d" || iconValue === "03n") {
    iconToday.setAttribute("class", "fas fa-cloud weather-icon weather-today");
  }
  if (iconValue === "04d" || iconValue === "04n") {
    iconToday.setAttribute("class", "fas fa-cloud weather-icon weather-today");
  }
  if (iconValue === "09d" || iconValue === "09n") {
    iconToday.setAttribute(
      "class",
      "fas fa-cloud-rain weather-icon weather-today"
    );
  }
  if (iconValue === "10d" || iconValue === "10n") {
    iconToday.setAttribute(
      "class",
      "fas fa-cloud-showers weather-icon weather-today"
    );
  }
  if (iconValue === "11d" || iconValue === "11n") {
    iconToday.setAttribute(
      "class",
      "fas fa-poo-storm weather-icon weather-today"
    );
  }
  if (iconValue === "13d" || iconValue === "13n") {
    iconToday.setAttribute(
      "class",
      "fas fa-snowflake weather-icon weather-today"
    );
  }
  if (iconValue === "50d" || iconValue === "50n") {
    iconToday.setAttribute("class", "fas fa-stream weather-icon weather-today");
  }
}
