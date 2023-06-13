var apiKey = "e78cb0f997715cc68da1c911e91d886f";
const forecastDays = 5;
var city = "";

// dom elements
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const forecastContainer = document.getElementById("forecastContainer");

// listens for search button to be clicked and city name to be entered
searchButton.addEventListener("submit", (event) => {
    event.preventDefault()
  const city = cityInput.value;
  console.log(city)
  if (city) {
    getWeatherForecast(city);giveFiveDay(city);
  }
});

// function fetches forecast data
function getWeatherForecast(cityName) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
      if (data.cod === 200) {
        const city = data.name;
        displayForecast(city,data);
      } else {
        forecastContainer.innerHTML = "Forecast not found.";
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      forecastContainer.innerHTML =
        "An error occurred while fetching the forecast.";
    });
}
// function displays forecast data within dynamically created div element
function displayForecast(city, data) {
  forecastContainer.innerHTML = `<p>City: ${city}</p>`;
    const date = new Date(data.dt * 1000);
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind;
    const description = data.weather[0].description;

    const forecastItem = document.createElement("div");
    forecastItem.setAttribute("class","currentWeather")
    forecastItem.innerHTML = `<br>
    <p>Date: ${date.toDateString()}<p>
                                    <p>Temperature: ${temperature} F</p>
                                    <p>Description: ${description}</p>`;
    forecastContainer.appendChild(forecastItem);

}

// function giveFiveDay(cityName, data) {
//     const query5URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

//     fetch(query5URL)
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data)
//         if (data.cod===200){
//             const city = data.city.name
//         }
//     forecastContainer.innerHTML = `<p>City: ${city}</p>`;
//     const forecastDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

// })}
function giveFiveDay(cityName) {
    const query5URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  
    fetch(query5URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.cod === "200") {
          const city = data.city.name;
          fiveDayforecastContainer.innerHTML += `<p>City: ${city}</p>`;
          const forecastDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  
          const forecastList = data.list
          for (let i = 0; i < forecastList.length && i < 5; i++) {
            const forecastItem = forecastList[i];
            const date = new Date(forecastItem.dt * 1000);
            const temperature = forecastItem.main.temp;
            const humidity = forecastItem.main.humidity;
            const wind = forecastItem.wind;
            const description = forecastItem.weather[0].description;
  
            const dayIndex = (date.getDay() + i) % 7;
            const forecastDay = forecastDays[dayIndex];
            const forecastItemElement = document.createElement("div");
            forecastItemElement.setAttribute("class", "forecastItem");
            forecastItemElement.innerHTML = `<br>
              <p>Date: ${forecastDay}</p>
              <p>Temperature: ${temperature} F</p>
              <p>Description: ${description}</p>`;
            fiveDayforecastContainer.appendChild(forecastItemElement);
          }
        } else {
          fiveDayforecastContainer.innerHTML = "Forecast not found.";
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        fiveDayforecastContainer.innerHTML =
          "An error occurred while fetching the forecast.";
      });
  }
  

