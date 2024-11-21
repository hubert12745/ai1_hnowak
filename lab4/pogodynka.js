document.addEventListener("DOMContentLoaded",function () {
    document.getElementById("getWeather").addEventListener("click", function () {
        let city_name = document.getElementById("address").value;
        if (!city_name) {
            alert("Please enter an address.");
            return;
        }

        const API_key = "b8fb7aa89d63de955475996105efc417";

        // Current Weather API request
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let currentWeather = JSON.parse(xhr.responseText);
                document.getElementById("currentWeather").innerHTML = `
                <h2>Current Weather</h2>
                <p>Temperature: ${currentWeather.main.temp}°C</p>
                <p>Feels like: ${currentWeather.main.feels_like}°C</p>
                <p>Humidity: ${currentWeather.main.humidity}%</p>
                <p>Pressure: ${currentWeather.main.pressure} hPa</p>
                <p>Weather: ${currentWeather.weather[0].description}</p>
                <p>Wind speed: ${currentWeather.wind.speed} </p>
                <p>${currentWeather.weather.icon}</p>
            `;
            } else {
                alert("Error fetching current weather data.");
            }
        };
        xhr.send();

        // 5 Day Forecast API request
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}&units=metric`)
            .then(response => response.json())
            .then(forecast => {
                let forecastHTML = "<h2>5 Day Forecast</h2>";
                forecast.list.forEach(item => {
                    forecastHTML += `
                    <p>${item.dt_txt}: ${item.main.temp}°C</p>
                    <p>Feels like: ${item.main.feels_like}°C </p>
                    <p>${item.weather[0].description}</p>
                `;
                });
                document.getElementById("forecast").innerHTML = forecastHTML;
            })
            .catch(error => {
                alert("Error fetching forecast data.");
            });
    });
    document.getElementById("address").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("getWeather").click();
        }
    });
});