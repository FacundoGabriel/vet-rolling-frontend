import CarouselC from "../components/carousel/CarouselC";
import AdsCarousel from "../components/adscarousel/AdsCarousel";
import CardPlanes from "../components/cardplanes/CardPlanes";
import CardVeterinarios from "../components/cardveterinarios/CardVeterinarios";
import Comentarios from "../components/comentarios/Comentarios";
import Infovet from "../components/infovet/Infovet";
import Mapa from "../components/mapa/Mapa";
import Clima from "../components/clima/Clima";

const HomePage = () => {
  return (
    <>
      <CarouselC />
      <Infovet />
      <AdsCarousel />
      <CardPlanes />
      <CardVeterinarios />
      <Comentarios />
      <Mapa />
    </>
  );
};

export default HomePage;
