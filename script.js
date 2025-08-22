const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const locationEl = document.getElementById("location");
const iconEl = document.getElementById("weatherIcon");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const weatherInfo = document.getElementById("weatherInfo");
const errorEl = document.getElementById("error");
const suggestions = document.getElementById("suggestions");

const API_KEY = "bd1ae77cf12d2fed29572199430fbd38"; // Replace with your OpenWeatherMap key

// Predefined city list (example)
const cityList = ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat"];

cityInput.addEventListener("input", () => {
  const input = cityInput.value.toLowerCase();
  suggestions.innerHTML = "";
  if (input.length === 0) return;

  const filtered = cityList.filter(city => city.toLowerCase().startsWith(input));
  filtered.forEach(city => {
    const option = document.createElement("div");
    option.classList.add("suggestion");
    option.textContent = city;
    option.addEventListener("click", () => {
      cityInput.value = city;
      suggestions.innerHTML = "";
    });
    suggestions.appendChild(option);
  });
});

document.addEventListener("click", (e) => {
  if (!suggestions.contains(e.target) && e.target !== cityInput) {
    suggestions.innerHTML = "";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  errorEl.textContent = "";
  weatherInfo.classList.add("hidden");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;

    locationEl.textContent = name;
    iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    tempEl.textContent = `🌡 Temperature: ${temp.toFixed(1)}°C`;
    descEl.textContent = `📖 Description: ${description}`;
    weatherInfo.classList.remove("hidden");
  } catch (err) {
    errorEl.textContent = "❌ " + err.message;
  }

  cityInput.value = "";
  suggestions.innerHTML = "";
});
