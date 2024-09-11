import { useEffect, useState } from "react";
import "./App.css";
import { useFetchWeather } from "./useFetchWeather";
import { useLocalStorage } from "./useLocalStorage";
// `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
function getDayOfWeek(dateString) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Verilen tarihi Date nesnesine dönüştür
  const date = new Date(dateString);

  // Günün index'ini al (0: Pazar, 6: Cumartesi)
  const dayIndex = date.getDay();

  const dayName = daysOfWeek[dayIndex];
  // İlgili günü döndür
  return dayName.slice(0, 3);
}
function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}
function App() {
  const { location, setLocation } = useLocalStorage("location");
  const { isLoading, data, displayLocation } = useFetchWeather(location);

  return (
    <div className="container">
      <div className="weather-container">
        <h2 className="heading">classy weather</h2>
        <Search location={location} setLocation={setLocation} />
        {isLoading && <Loader />}
        {data.weathercode && (
          <Weather displayLocation={displayLocation} data={data} />
        )}
      </div>
    </div>
  );
}

function Search({ location, setLocation }) {
  return (
    <input
      type="text"
      placeholder="Search from location..."
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
function Weather({ displayLocation, data }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time,
    weathercode,
  } = data;

  return (
    <div>
      <h2 className="weather">
        {" "}
        weather {displayLocation.name} {displayLocation.country_code}{" "}
      </h2>
      <ul>
        {time.map((time, i) => (
          <Day
            max={max.at(i)}
            min={min.at(i)}
            time={time}
            weathercode={weathercode.at(i)}
            key={time}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}
function Day({ max, min, time, weathercode, isToday }) {
  return (
    <li>
      <span>{getWeatherIcon(weathercode)}</span>
      <p>{isToday ? "Today" : getDayOfWeek(time)}</p>
      <p>
        {Math.floor(min)}&deg; &ndash; &deg; <strong> {Math.ceil(max)}</strong>{" "}
      </p>
    </li>
  );
}
export default App;
