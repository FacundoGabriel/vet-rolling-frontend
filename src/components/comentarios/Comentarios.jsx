import "./Comentarios.css";
import { Card, Container } from "react-bootstrap";

const Comentarios = () => {
  const comentarios = [
    {
      nombre: "Julian",
      comentario:
        "Excelente atención, muy profesionales. Siempre atienden con una sonrisa y amor por los animales. 🐕💙",
      fecha: "hace 2 días",
    },
    {
      nombre: "Camila",
      comentario:
        "Mi gato odia a todo el mundo, pero acá se sintió cómodo. Gracias por tanto cariño y paciencia. 🐱✨",
      fecha: "hace 5 días",
    },
    {
      nombre: "Martín",
      comentario:
        "La app para pedir turnos es rápida y clara. Además, el equipo veterinario es de primera. 🐾❤️",
      fecha: "hace 6 días",
    },
    {
      nombre: "Luciana",
      comentario:
        "Llevé a mi perrita de urgencia y la atendieron enseguida. Eternamente agradecida. 🐰💙",
      fecha: "hace 1 semana",
    },
  ];

  return (
    <div className="comentarios-bg py-5">
      <Container>
        <h2 className="comentarios-tittle text-center mb-4">
          Lo que dicen nuestros dueños de mascotas
        </h2>

        <div className="row">
          {comentarios.map((item, index) => (
            <div key={index} className="col-12 col-md-4 mb-3">
              <Card className="comentario-card h-100">
                <Card.Body>
                  <div className="comentario-header d-flex justify-content-between align-items-center flex-wrap">
                    <div className="d-flex align-items-center gap-2">
                      <h5 className="comentario-nombre mb-0">{item.nombre}</h5>
                      <span className="comentario-fecha">– {item.fecha}</span>
                    </div>
                    <div className="comentario-estrellas text-warning">
                      ★★★★★
                    </div>
                  </div>
                  <Card.Text className="comentario-texto mt-2">
                    {item.comentario}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Comentarios;
