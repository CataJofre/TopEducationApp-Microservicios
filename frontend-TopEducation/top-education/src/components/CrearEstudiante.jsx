import React, { useState } from "react";
import EstudianteService from "../services/EstudianteService.js";
import { useNavigate } from "react-router-dom";

const CrearEstudiante = () => {
  const [estudiante, setEstudiante] = useState({
    rut_estudiante: '',
    fecha_nacimiento: '',
    nombres: '',
    apellidos: '',
    egreso_colegio: '',
    nombre_colegio: '',
    tipo_colegio: '',
    tipo_pago: '',
    arancel: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEstudiante({
      ...estudiante,
      [e.target.name]: e.target.value,
    });
  };

  const saveEstudiante = (e) => {
    e.preventDefault();
    EstudianteService.createEstudiante(estudiante).then(() => {
      navigate("/");
    });
  };
  return (
    <div>
     

      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-md-10 col-sm-10 container justify-content-center card">
            <br />
            <h1 className="text-center">Registro de estudiantes</h1>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Nombres:</label>
                  <input
                    type="text"
                    name="nombres"
                    className="form-control"
                    placeholder="Nombres del estudiante"
                    required
                    value={estudiante.nombres}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Apellidos:</label>
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    placeholder="Apellidos del estudiante"
                    required
                    value={estudiante.apellidos}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Rut: Si el RUT termina en k, reemplazar con 0.</label>
                  <input
                    type="text"
                    name="rut_estudiante"
                    className="form-control"
                    placeholder="Rut del estudiante, sin guion"
                    required
                    pattern="\d{9}"
                    title="Ingresa 9 dígitos"
                    maxLength="9"
                    value={estudiante.rut_estudiante}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Fecha de nacimiento:</label>
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    className="form-control"
                    placeholder="Fecha de nacimiento del estudiante"
                    required
                    value={estudiante.fecha_nacimiento}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Tipo de colegio de procedencia:</label>
                  <select
                    name="tipo_colegio"
                    id="tipo_colegio"
                    className="form-select"
                    value={estudiante.tipo_colegio}
                    onChange={handleChange}
                  >
                    <option value='' defaultValue disabled>
                      Seleccione tipo de colegio
                    </option>
                    <option value="Municipal">Municipal</option>
                    <option value="Subvencionado">Subvencionado</option>
                    <option value="Privado">Privado</option>
                  </select>
                </div>

                <br />
                <div className="form-group">
                  <label>Nombre del colegio de procedencia:</label>
                  <input
                    type="text"
                    name="nombre_colegio"
                    className="form-control"
                    placeholder="Nombre de colegio"
                    required
                    value={estudiante.nombre_colegio}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Año de egreso escolar:</label>
                  <input
                    type="text"
                    name="egreso_colegio"
                    className="form-control"
                    placeholder="Año de egreso"
                    required
                    pattern="\d{4}"
                    title="Ingresa 4 dígitos numéricos"
                    maxLength="4"
                    value={estudiante.egreso_colegio}
                    onChange={handleChange}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label>Medio de pago:</label>
                  <select
                    name="tipo_pago"
                    id="tipo_pago"
                    className="form-select"
                    value={estudiante.tipo_pago}
                    onChange={handleChange}
                  >
                    <option value='' defaultValue disabled>
                      Seleccione tipo de colegio
                    </option>
                    <option value="Cuotas">Cuotas</option>
                    <option value="Contado">Contado</option>
                  </select>
                </div>
                <br />
                <div className="box-footer">
                  <button className="btn btn-success" onClick={saveEstudiante}>
                    Seleccionar Medio de pago
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEstudiante;
