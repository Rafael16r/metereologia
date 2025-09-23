import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Digite o nome da cidade..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Pesquisar</button>
    </form>
  );
}

export default SearchBar;
