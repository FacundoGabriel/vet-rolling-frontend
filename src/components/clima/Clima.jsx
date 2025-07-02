import { useEffect, useState } from "react";
import axios from "axios";
import './Clima.css'

export const Clima = () => {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const API_KEY = "c0590472033e164b7752f5226e7d08d0";
        const url =`https://api.openweathermap.org/data/2.5/weather?lat=-26.8083&lon=-65.2176&units=metric&lang=es&appid=${API_KEY}`
        const { data } = await axios.get(url);
        setClima(data);
      } catch (err) {
        console.error("Error al obtener el clima:", err.response?.data || err.message);
      }
    };

    fetchClima();
  }, []);

  if (!clima) return <div>Cargando clima...</div>;

return (
  <div className="clima-bar">
    <p className="clima-temp">🌤 {Math.round(clima.main.temp)}°C</p>
    <small className="clima-desc">{clima.weather[0].description}</small>
  </div>
);

};

export default Clima;
