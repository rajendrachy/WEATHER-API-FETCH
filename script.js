const apiKey = "265894777c7cef2467c8a451a95ec0f3";
const searchButton = document.querySelector(".search button");
const searchBar = document.querySelector(".search-bar");

const fetchWeather = (city) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        // Explicitly throw an error if the city is invalid
        throw new Error("City not found. Please enter a valid city name.");
      }

      const { name, weather, main, wind } = data;
      document.querySelector(".city").innerText = `${name}`;
      document.querySelector(".description").innerText = `Weather: ${weather[0].description}`;
      document.querySelector(".temp").innerText = `Temp: ${main.temp}°C`;
      document.querySelector(".humidity").innerText = `Humidity: ${main.humidity}%`;
      document.querySelector(".wind").innerText = `Wind speed: ${wind.speed} km/h`;
      document.querySelector(".weather").classList.remove("loading");

      // Clear any previous error messages
      document.querySelector(".error").innerText = "";

      // Save the city to local storage
      localStorage.setItem("lastCity", name);
    })
    .catch(error => {
      // Handle all errors here
      console.error("Error fetching data:", error.message);
      document.querySelector(".error").innerText = error.message;
      document.querySelector(".weather").classList.add("loading"); // Hide weather details
    });
};

// Fetch weather on button click
searchButton.addEventListener("click", () => {
  fetchWeather(searchBar.value);
});

// Initial weather fetch for a default city
fetchWeather("Nepal");






// // Fetch weather on Enter key press
// // searchBar.addEventListener("keyup", (event) => {
// //   if (event.key === "Enter") {
// //     fetchWeather(searchBar.value);
// //   }
// // });






