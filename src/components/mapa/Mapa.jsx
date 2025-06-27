import "./Mapa.css";

const Mapa = () => {
  return (
    <>
      <div className="mapa">
        <h2 className="text-center py-4">¿Donde estamos?</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4167.527684388675!2d-65.210112286661!3d-26.836669623499407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1751062987088!5m2!1ses-419!2sar"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Mapa;
