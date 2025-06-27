import CarouselC from "../components/carousel/CarouselC";
import AdsCarousel from "../components/adscarousel/AdsCarousel";
import CardPlanes from "../components/cardplanes/CardPlanes";
import CardVeterinarios from "../components/cardveterinarios/CardVeterinarios";
import Comentarios from "../components/comentarios/Comentarios";

const HomePage = () => {
  return (
    <>
      <CarouselC />
      <AdsCarousel />
      <CardPlanes />
      <CardVeterinarios />
      <Comentarios/>
    </>
  );
};

export default HomePage;
