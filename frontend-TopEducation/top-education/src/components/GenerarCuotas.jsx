import React, { useState } from "react";
import cuotasService from "../services/CuotasService";
import NavbarComponent from "./NavbarComponent.jsx";

const GenerarCuotasForm = () => {
  const [rut_estudiante, setRutEstudiante] = useState("");

  const handleInputChange = (event) => {
    setRutEstudiante(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await cuotasService.generarCuotas(rut_estudiante);
      alert("Cuotas generadas exitosamente");
    } catch (error) {
      alert("Error al generar cuotas: " + error.message);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <div>
            <br />
            <h1 style={{ color: "#88209B", textAlign: "center" }}>
              Generar Cuotas de Pago
              <br />
            </h1>
          </div>
          <div className="row">
          <br />
          <div>
            <h5 style={{ color: "#88209B" }}>
              Ingrese el Rut del estudiante para generar sus cuotas de pago
            </h5>
          </div>
          <br />
        </div>
        <br />
        <form onSubmit={handleFormSubmit}>
          <div
            className="input-group mb-3"
            style={{ backgroundColor: "#ffffff", border: "1px solid #88209B" }}
          >
            <input
              type="text"
              className="form-control"
              name="rut_estudiante"
              placeholder="Buscar cuotas de un estudiante"
              aria-label="Búsqueda"
              aria-describedby="basic-addon2"
              required
              pattern="\d{9}"
              title="Ingresa 9 dígitos"
              maxLength="9"
              style={{
                color: "#88209B",
                border: "none",
                backgroundColor: "transparent",
              }}
              value={rut_estudiante}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="submit"
                style={{
                  backgroundColor: "#88209B",
                  color: "#ffffff",
                  border: "none",
                }}
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerarCuotasForm;
