import React, { useState } from "react";
import informacionService from "../services/InformacionService";
import NavbarComponent from "./NavbarComponent";

const AgregarPruebas = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Por favor, seleccione un archivo CSV.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      await informacionService.procesarArchivoCSV(formData);

      alert("Archivo CSV procesado exitosamente.");
    } catch (error) {
      console.error("Error al procesar el archivo CSV:", error);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <br />
      <div className="container">
        <div className="row">
          <h1 style={{ color: "#88209B" }}>
            Ingrese el archivo Excel con notas
          </h1>
          <br />
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="info-box">
            <p>Seleccione el archivo que contiene las notas</p>
            <input
              type="file"
              name="file"
              accept=".csv"
              className="form-control"
              style={{ backgroundColor: "#ffffff", color: "#88209B" }}
              onChange={handleFileChange}
            />
            <br />
            <button
              type="submit"
              className="btn btn-success"
              style={{ backgroundColor: "#88209B", color: "#ffffff" }}
            >
              Cargar Archivo
            </button>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
};

export default AgregarPruebas;
