 

 // 🌍 OpenWeatherMap API Key
const apiKey = "5d7ecd2dab50e3451fb5eef048ab3fe2"; // ✅ Replace with your real API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// 🌤️ Elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector("#weather i");

// 🌦️ Main function to fetch and display weather
const getWeather = async (city) => {
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);

    if (!response.ok) throw new Error("City not found 😢");

    const data = await response.json();
    console.log(data); // 🔍 View raw data in browser console

    // 🌡️ Update weather details
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)} °C`;
    // document.querySelector(".temp").textContent = `${Math.round(data.main.temp + 273.15)} K`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} Km/h`;
    document.querySelector("#discription").textContent = data.weather[0].description;
    

    // ☁️ If cloud element exists
    const cloudElement = document.querySelector(".colud");
    if (cloudElement) cloudElement.textContent = `${data.clouds.all}%`;

    // 🌥️ Update weather icon dynamically
    const iconCode = data.weather[0].icon;
    weatherIcon.className = ""; // clear old classes

    if (iconCode.includes("01")) {
      weatherIcon.classList.add("fas", "fa-sun");
      weatherIcon.style.color = "#FFD700";
    } else if (iconCode.includes("02")) {
      weatherIcon.classList.add("fas", "fa-cloud-sun");
      weatherIcon.style.color = "#FDB813";
    } else if (iconCode.includes("03") || iconCode.includes("04")) {
      weatherIcon.classList.add("fas", "fa-cloud");
      weatherIcon.style.color = "#A9A9A9";
    } else if (iconCode.includes("09") || iconCode.includes("10")) {
      weatherIcon.classList.add("fas", "fa-cloud-showers-heavy");
      weatherIcon.style.color = "#4A90E2";
    } else if (iconCode.includes("11")) {
      weatherIcon.classList.add("fas", "fa-bolt");
      weatherIcon.style.color = "#FFA500";
    } else if (iconCode.includes("13")) {
      weatherIcon.classList.add("fas", "fa-snowflake");
      weatherIcon.style.color = "#A0E7FF";
    } else {
      weatherIcon.classList.add("fas", "fa-smog");
      weatherIcon.style.color = "#C0C0C0";
    }

  } catch (error) {
    alert(error.message);
    console.error("Error fetching weather:", error);
  }
};

// 🔘 Search button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  getWeather(city);
});

// ⌨️ Pressing Enter also triggers search
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    getWeather(city);
  }
});

// 🏙️ Default city on page load
window.addEventListener("load", () => {
  getWeather(""); // Default city (change if you want)
});

const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

 


// // Check saved theme in localStorage
// if (localStorage.getItem("theme") === "dark") {
//   body.classList.add("dark");
// }

// // Toggle between light and dark
// toggleButton.addEventListener("click", () => {
//   body.classList.toggle("dark");

//   // Save theme preference
//   if (body.classList.contains("dark")) {
//     localStorage.setItem("theme", "dark");
//   } else {
//     localStorage.setItem("theme", "light");
//   }
// });

