import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [localTime, setLocalTime] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const apiKey = "73f099dc85c1bec48f0cb652b09c91da";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError("Cidade não encontrada 😔");
      }
    } catch (err) {
      setError("Erro ao obter os dados.");
    } finally {
      setLoading(false);
    }
  };

  // Atualiza a hora local com base no timezone da cidade
  useEffect(() => {
    if (weather) {
      const updateLocalTime = () => {
        const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const localDate = new Date(utc + weather.timezone * 1000);
        setLocalTime(
          localDate.toLocaleTimeString("pt-PT", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
      };

      updateLocalTime();
      const interval = setInterval(updateLocalTime, 1000);
      return () => clearInterval(interval);
    }
  }, [weather]);

  return (
    <div className="App">
      {/* Vídeo de fundo */}
      <video autoPlay loop muted className="background">
        <source src="/metereologia/outono.mp4" type="video/mp4" />
      </video>

      <h1>Metereologia</h1>

      {/* Barra de pesquisa */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Digite o nome da cidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather}>Pesquisar</button>
      </div>

      {/* Estado de carregamento / erro */}
      {loading && <p>A carregar...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Cartão do tempo */}
      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>
            <strong>Hora local:</strong> {localTime}
          </p>
          <p>🌡️ {weather.main.temp}°C</p>
          <p>☁️ {weather.weather[0].description}</p>
          <p>💨 Vento: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;

