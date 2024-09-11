import { useState, useEffect } from "react";

export function useFetchWeather(location) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [displayLocation, setDisplayLocation] = useState({});

  useEffect(
    function () {
      const controller = new AbortController();

      async function getLocation() {
        if (location.length < 2) return setData({});
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
            { signal: controller.signal }
          );

          const data = await res.json();
          if (!data.results) throw new Error("Location not found");

          const { timezone, country_code, latitude, longitude, name } =
            data.results.at(0);
          setDisplayLocation({ country_code, name });

          const res2 = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const data2 = await res2.json();

          setIsLoading(false);
          setData(data2.daily);
        } catch (err) {}
      }

      getLocation();
      return function () {
        controller.abort();
        setIsLoading(false);
      };
    },

    [location]
  );
  return { isLoading, data, displayLocation };
}
