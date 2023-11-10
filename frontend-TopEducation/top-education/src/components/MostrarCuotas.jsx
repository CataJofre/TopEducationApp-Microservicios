import React, { useState, useEffect } from "react";
import cuotasService from "../services/CuotasService"; // Ajusta la ruta según la estructura de tu proyecto
import NavbarComponent from "./NavbarComponent";

const MostrarCuotas = () => {
  const [rutEstudiante, setRutEstudiante] = useState("");
  const [cuotas, setCuotas] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Llamar al servicio de cuotasService para buscar cuotas según el rutEstudiante
      const response = await cuotasService.buscarCuotas(rutEstudiante);
      setCuotas(response); // Ajusta según la estructura de datos que obtienes
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // Aquí podrías cargar las cuotas al renderizar el componente si es necesario
  }, []);

  return (
    <div>
      <NavbarComponent />
      <br />
      <h1 style={{ color: "#88209B", textAlign: "center" }}>
        Búsqueda por rut
      </h1>
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#88209B",
          padding: "20px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{ backgroundColor: "#ffffff", border: "1px solid #88209B" }}
          >
            <input
              type="text"
              className="form-control"
              name="rut_estudiante"
              placeholder="¿Desea buscar cuotas de un estudiante?"
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
              value={rutEstudiante}
              onChange={(e) => setRutEstudiante(e.target.value)}
            />
          </div>
          <br />
          <div className="input-group-append">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#88209B",
                color: "#ffffff",
                border: "none",
              }}
            >
              Buscar
            </button>
          </div>
        </form>
        <br />
        <div className="container">
          <div className="row">
            <h3 style={{ color: "#88209B", textAlign: "center" }}>
              Lista de cuotas
            </h3>
            <br />
          </div>
          <div className="table-container">
            <table
              className="table table-striped table-bordered"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #88209B",
              }}
            >
              <thead style={{ backgroundColor: "#88209B", color: "#ffffff" }}>
                <tr>
                  <th scope="col">N°Cuota</th>
                  <th scope="col">Valor de la cuota</th>
                  <th scope="col">Estado de cuota</th>
                  <th scope="col">Fecha de pago</th>
                  <th scope="col">Cuotas totales</th>
                  <th scope="col">Interés aplicado por retraso</th>
                  <th scope="col">Cuotas pagadas</th>
                  <th scope="col">Descuento por promedio de exámenes</th>
                </tr>
              </thead>
              <tbody>
                {cuotas.map((cuota) => (
                  <tr key={cuota.id_cuotas}>
                    <td>{cuota.id_cuotas}</td>
                    <td>{cuota.valor_de_cuota}</td>
                    <td>{cuota.estadoCuota}</td>
                    <td>{cuota.fechaPago}</td>
                    <td>{cuota.cuotas_totales}</td>
                    <td>{cuota.interes_aplicado}</td>
                    <td>{cuota.cuotas_pagadas}</td>
                    <td>{cuota.dcto_media_examenes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostrarCuotas;
