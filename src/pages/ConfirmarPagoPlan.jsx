import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clientAxios, { configHeaders } from "../helpers/axios.helpers";
import Swal from "sweetalert2";

const ConfirmarPagoPlan = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const idPlan = JSON.parse(sessionStorage.getItem("idPlan")) || null;
  const idMascota = JSON.parse(sessionStorage.getItem("idMascota")) || null;

  const ejecutado = useRef(false); 

  useEffect(() => {
    if (ejecutado.current) return; 

    const query = new URLSearchParams(search);
    const status = query.get("status");

    if (status === "success") {
      ejecutado.current = true;
      const confirmarPago = async () => {
        try {
          const res = await clientAxios.put(
            `/planes/confirmacionPagoPlan/${idPlan}/${idMascota}`,
            {},
            configHeaders
          );
          Swal.fire({
            icon: "success",
            title: "¡Pago confirmado!",
            text: res.data.msg,
          });
          sessionStorage.removeItem("idPlan");
          sessionStorage.removeItem("idMascota");
          navigate("/user/mis-mascotas");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al confirmar pago",
            text:
              error.response?.data?.msg ||
              error.response?.data?.error ||
              "Error inesperado",
          });
          navigate("/");
        }
      };
      confirmarPago();
    } else if (status === "failure") {
      ejecutado.current = true;
      const cancelacionPago = async () => {
        try {
          await clientAxios.delete(
            `/planes/eliminarPlanMP/${idPlan}`,
            configHeaders
          );
          sessionStorage.removeItem("idPlan");
          sessionStorage.removeItem("idMascota");
          Swal.fire({
            icon: "error",
            title: "Pago cancelado",
            text: "No se pudo completar la operación.",
          });
          navigate("/user/mis-mascotas");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error al cancelar pago",
            text:
              error.response?.data?.msg ||
              error.response?.data?.error ||
              "Error inesperado",
          });
          navigate("/");
        }
      };
      cancelacionPago();
    } else if (status === "pending") {
      ejecutado.current = true;
      Swal.fire({
        icon: "info",
        title: "Pago pendiente",
        text: "Tu pago está siendo procesado. Intentá nuevamente más tarde.",
      });
      navigate("/");
    } else {
      ejecutado.current = true;
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

export default ConfirmarPagoPlan;
