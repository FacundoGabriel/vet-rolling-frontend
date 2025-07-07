import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import clientAxios from "../helpers/axios.helpers";

const HabilitarMiCuenta = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Token inválido",
        text: "No se encontró un token en la URL",
      });
      return;
    }

    const habilitarCuenta = async () => {
      try {
        const res = await clientAxios.put(
          "/usuarios/habilitar-mi-cuenta",
          {},
          {
            headers: {
              "content-type": "application/json",
              authHabilitar: `${token}`,
            },
          }
        );
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Cuenta habilitada 🎉",
            text: res.data.msg,
            timer: 3000,
            showConfirmButton: false,
          });
        }
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error al habilitar la cuenta",
          text:
            error.response?.data?.msg ||
            "Ocurrió un error inesperado. Intentá nuevamente.",
        });
      }
    };

    habilitarCuenta();
  }, [location, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Habilitando cuenta...</h2>
    </div>
  );
};

export default HabilitarMiCuenta;
