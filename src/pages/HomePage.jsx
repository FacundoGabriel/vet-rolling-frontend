import CarouselC from "../components/carousel/CarouselC";
import AdsCarousel from "../components/adscarousel/AdsCarousel";
import CardPlanes from "../components/cardplanes/CardPlanes";
import CardVeterinarios from "../components/cardveterinarios/CardVeterinarios";
import Comentarios from "../components/comentarios/Comentarios";
import Infovet from "../components/infovet/Infovet";
import Mapa from "../components/mapa/Mapa";

import CardServicios from "../components/cardServicios/CardServicios";
import CardProductos from "../components/CardProductos/CardProductos";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/user", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <CarouselC />
      <Infovet />
      <AdsCarousel />
      <CardPlanes />
      <CardServicios />
      <CardProductos />
      <CardVeterinarios />
      <Comentarios />
      <Mapa />
    </>
  );
};

export default HomePage;
