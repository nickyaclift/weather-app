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
function handleSearch(event) {
  event.preventDefault();
  let input = document.querySelector(".form-control");
  console.log(input.value);
  let search = document.querySelector(".location");
  search.innerHTML = `${input.value}`;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

/// Using search button spyglass
function handleSearchButton(event) {
  event.preventDefault();
  let input = document.querySelector(".form-control");
  console.log(input.value);
  let search = document.querySelector(".location");
  search.innerHTML = `${input.value}`;
}

let searchButton = document.querySelector(".search-button");
form.addEventListener("click", handleSearchButton);

// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
function celsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = "11";
}
function fahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = "52";
}

let celsiusButton = document.querySelector(".degrees");
celsiusButton.addEventListener("click", celsius);
let fahrenheitButton = document.querySelector(".fahrenheit");
fahrenheitButton.addEventListener("click", fahrenheit);
