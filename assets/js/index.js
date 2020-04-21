const input = document.querySelector('input');
const search = document.getElementById('search');
const dataContainer = document.getElementById('data-container');
const btnContainer = document.getElementById('btn-container');
const icon = document.getElementById('icon');
const temp = document.getElementById("temp");
const desc = document.getElementById('desc');
const feelsLike = document.getElementById("feelslike");
const humid = document.getElementById('humid');
const wind = document.getElementById('wind');
const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
const c = 'C';
const f = 'F';
let city = '';
let generalData = [];
let celsiusData = [];
let fahrenheitData = [];
let iconData = '';

function obtainForecast() {
  dataContainer.style.display = 'none';
  btnContainer.style.display = 'none';
  search.addEventListener('click', () => {
    city = input.value;
    fetchCelsius();
    fetchFahrenheit();
    input.value = '';
    switchUnit();
    updateData();
  });
}

function fetchCelsius() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f73843a5e932710846616394e675bdd`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    generalData = [response.name, response.weather[0].description, response.main.humidity, response.wind.speed];  
    celsiusData = [response.main.temp, response.main.feels_like];
    iconData = response.weather[0].icon;
    showData();
    showTemp(celsiusData, c);
    dataContainer.style.display = 'flex';
    btnContainer.style.display = 'flex'
  });
}

function fetchFahrenheit(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0f73843a5e932710846616394e675bdd`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {  
    fahrenheitData = [response.main.temp, response.main.feels_like];
  });
}

function showData() {
  document.querySelector('p').innerHTML = `${generalData[0]}`;
  icon.src = `http://openweathermap.org/img/wn/${iconData}@2x.png`;
  desc.innerHTML = `${generalData[1]}`;
  humid.innerHTML = `${generalData[2]}%`;
  wind.innerHTML = `${generalData[3]}`;
}

function showTemp(data, unit) {
  temp.innerHTML = `${data[0]} ${unit}°`;
  feelsLike.innerHTML = `${data[1]} ${unit}°`
}

function switchUnit() {
  celsius.addEventListener('click', () => {
    showTemp(celsiusData, c)
  });
  fahrenheit.addEventListener('click', () => {
    showTemp(fahrenheitData, f)
  })
} 

function updateData() {
  setInterval(fetchCelsius, 6000000);
  setInterval(fetchFahrenheit, 6000000)
}

obtainForecast();