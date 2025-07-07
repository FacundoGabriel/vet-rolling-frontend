import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import Swal from "sweetalert2";

const ConfirmarTurno = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const idTurno = JSON.parse(sessionStorage.getItem("idTurno")) || null;
  useEffect(() => {
    const query = new URLSearchParams(search);
    const status = query.get("status");

    if (status === "success") {
      const confirmarTurno = async () => {
        try {
          const res = await clientAxios.put(
            `/turnos/confirmar-turno/${idTurno}`,
            {},
            configHeaders
          );
          Swal.fire({
            icon: "success",
            title: "¡Turno confirmado!",
            text: res.data.msg,
          });
          sessionStorage.removeItem("idTurno");
          navigate("/user/mis-turnos");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al confirmar turno",
            text: error.response?.data?.msg || "Error inesperado",
          });
          navigate("/");
        }
      };

      confirmarTurno();
    } else if (status === "pending") {
      Swal.fire({
        icon: "info",
        title: "Pago pendiente",
        text: "Tu pago está siendo procesado. Intentá nuevamente más tarde.",
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Pago rechazado o cancelado",
        text: "No se pudo completar la operación.",
      });
      navigate("/");
    }
  }, [search, navigate]);

  return null;
};

export default ConfirmarTurno;
