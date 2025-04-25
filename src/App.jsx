import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [description, setDescripton] = useState(null);
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const baseUrl = import.meta.env.VITE_WEATHER_API_BASE;
  const apiUrl = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;

  async function getWeather() {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
      setDescripton(response.data.weather[0].description);
      setTemp(response.data.main.temp);
      setError(null);
      setIcon(response.data.weather[0].icon);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setData(null);
    }
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-6 md:px-0">
      <div className="bg-white p-10 text-center shadow rounded-lg">
        <h1 className="text-2xl mb-4 font-bold">Weather App</h1>
        <input
          type="text"
          className="py-2 px-3 mr-2 border border-gray-200 rounded-lg mb-5"
          placeholder="City name.."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setDescripton(null);
            setData(null);
            setError(null);
            setTemp(null);
          }}
        />
        <button
          className="bg-blue-500 text-white font-bold py-2 px-3 rounded-xl mb-5 cursor-pointer"
          onClick={getWeather}
        >
          Get weather
        </button>
        {data && (
          <div className="flex flex-col justify-center items-center">
            <p className="mb-2">City: {city}</p>
            <p className="mb-2">Temp: {temp}C</p>
            <p>Description: {description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather-icon"
            />
          </div>
        )}
        {error && <p className="text-red-400 text-lg">Error: {error}</p>}
      </div>
    </div>
  );
};

export default App;
