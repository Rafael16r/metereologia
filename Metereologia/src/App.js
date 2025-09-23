import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const apiKey = "73f099dc85c1bec48f0cb652b09c91da";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("Cidade não encontrada!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      {/* Vídeo de fundo */}
      <video autoPlay loop muted className="background">
        <source src="/outono.mp4" type="video/mp4" />
      </video>

      <h1>Metereologia </h1>
      <SearchBar onSearch={fetchWeather} />
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
