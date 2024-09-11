import { useState, useEffect } from "react";

export function useLocalStorage(key) {
  const [location, setLocation] = useState(function () {
    const storedData = localStorage.getItem(key);
    return storedData ? storedData : "";
  });
  useEffect(
    function () {
      localStorage.setItem("location", location);
    },
    [location, key]
  );

  return { location, setLocation };
}
