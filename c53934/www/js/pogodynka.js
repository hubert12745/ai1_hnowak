document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getWeather").addEventListener("click", function () {
        let city_name = document.getElementById("address").value;
        if (!city_name) {
            alert("Please enter an address.");
            return;
        }

        const API_key = "eefff80c518f3cb24b32f25c3f498ff0";
        const spinner = document.getElementById("spinner");

        spinner.style.display = "block";

        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let currentWeather = JSON.parse(xhr.responseText);
                console.log("Current Weather Data:", JSON.stringify(currentWeather, null, 2));
                let iconCode = currentWeather.weather[0].icon;
                let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                document.getElementById("currentWeather").innerHTML = `
                    <h2>Current Weather</h2>
                    <p>Temperature: ${currentWeather.main.temp.toFixed(1)}°C</p>
                    <p>Feels like: ${currentWeather.main.feels_like.toFixed(1)}°C</p>
                    <p>Humidity: ${currentWeather.main.humidity}%</p>
                    <p>Pressure: ${currentWeather.main.pressure} hPa</p>
                    <p>Wind speed: ${currentWeather.wind.speed} m/s</p>
                    <img src="${iconUrl}" alt="Weather icon">
                `;
                document.getElementById("currentWeather").style.display = "block";
            } else {
                alert("Error fetching current weather data.");
            }
            spinner.style.display = "none";
        };
        xhr.send();

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}&units=metric`)
            .then(response => response.json())
            .then(forecast => {
                console.log("Forecast Data:", JSON.stringify(forecast, null, 2));
                let forecastHTML = "<h2>5 Day Forecast</h2>";
                forecast.list.forEach(item => {
                    let iconCode = item.weather[0].icon;
                    let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                    forecastHTML += `
                        <p>${item.dt_txt}: ${item.main.temp.toFixed(1)}°C</p>
                        <p>Feels like: ${item.main.feels_like.toFixed(1)}°C</p>
                        <img src="${iconUrl}" alt="Weather icon">
                    `;
                });
                document.getElementById("forecast").innerHTML = forecastHTML;
                document.getElementById("forecast").style.display = "block";
                spinner.style.display = "none";
            })
            .catch(error => {
                alert("Error fetching forecast data.");
                spinner.style.display = "none";
            });
    });

    document.getElementById("address").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("getWeather").click();
        }
    });
});