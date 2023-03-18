import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      city: response.data.city,
      temperature: response.data.temperature.current,
      feelsLike: response.data.temperature.feels_like,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      description: response.data.condition.description,
      iconUrl: response.data.condition.icon_url,
      date: new Date(response.data.time * 1000),
    });
  }

  function search() {
    let apiKey = "1c0f6e49a911db65307b85186bd4t6oe";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function searchPosition(coordinates) {
    console.log({ coordinates });
    let apiKey = "1c0f6e49a911db65307b85186bd4t6oe";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }
  function handleCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-8">
              <input
                type="search"
                placeholder="Enter a city"
                className="form-control"
                autoFocus="on"
                id="search-bar"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-2">
              <button
                type="submit"
                value="Search"
                id="search-button"
                className="mt-1 w-100"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="col-2">
              <button
                onClick={handleCurrentLocation}
                value="Location"
                className="mt-1 w-100"
                id="location-button"
              >
                <i className="fa-solid fa-location-dot" />
              </button>
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    search();
    return "Fetching data...";
  }
}
