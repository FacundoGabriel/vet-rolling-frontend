import "./pagina404.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { GiSittingDog } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Pagina404 = () => {
  const navigate = useNavigate();
  const [isJumping, setIsJumping] = useState(false);

  const handleDogClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center p-4"
      style={{ minHeight: "100vh", backgroundColor: "#F1F4F8" }}
    >
      <GiSittingDog
        size={120}
        color="#F16716"
        className={`dog-icon mb-3 ${isJumping ? "jump" : ""}`}
        onClick={handleDogClick}
        title="Hazme click!"
      />
      <h1 className="fw-bold" style={{ color: "#00466E" }}>
        Oops, tu mascota se escapó... y la página también 🐾
      </h1>
      <p style={{ color: "#000000", maxWidth: "500px" }}>
        No encontramos esta página, parece que se escapó a dar un paseo. Pero no
        te preocupes, aquí siempre te esperamos con las patitas abiertas. ¡Volvé
        al inicio y seguí cuidando a tu mejor amigo!
      </p>

      <div className="d-flex gap-3 mt-4 flex-wrap justify-content-center">
        <Button
          onClick={() => navigate("/")}
          style={{ backgroundColor: "#F16716", border: "none" }}
        >
          Volver al inicio
        </Button>

        <Button variant="outline-warning" onClick={() => navigate("/contacto")}>
          Contactanos
        </Button>
      </div>
    </div>
  );
};

export default Pagina404;
