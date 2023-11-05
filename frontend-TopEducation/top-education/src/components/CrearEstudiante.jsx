import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import NavbarComponent from "./NavbarComponent.jsx";

export default function EstudianteForm(props) {
  const initialState = {
    rut_estudiante: "",
    fecha_nacimiento: "",
    nombres: "",
    apellidos: "",
    egreso_colegio: "",
    nombre_colegio: "",
    tipo_colegio: "",
  };

  const [input, setInput] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div>
      <NavbarComponent />
      <FormStyle className="form-style">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-10 col-sm-10 container justify-content-center card">
              <br />
              <h1 className="text-center">Registro de estudiantes</h1>
              <div className="card-body"></div>
              <FormStyle>
                <Form>
                  <div className="form-group texto">
                    <Form.Group controlId="rut_estudiante">
                      <Form.Label>RUT del estudiante:</Form.Label>
                      <Form.Control
                        type="text"
                        name="rut_estudiante"
                        className="input-style"
                        value={input.rut_estudiante}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <br />
                  <div className="form-group texto">
                    <Form.Group controlId="nombres">
                      <Form.Label>Nombres del estudiante</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombres"
                        className="input-style"
                        value={input.nombres}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <br />

                  <div className="form-group texto">
                    <Form.Group controlId="apellidos">
                      <Form.Label>Apellidos del estudiante</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidos"
                        className="input-style"
                        value={input.apellidos}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <br />
                  <div className="form-group texto">
                    <Form.Group controlId="fecha_nacimiento">
                      <Form.Label>Fecha de nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        name="fecha_nacimiento"
                        className="input-style"
                        value={input.fecha_nacimiento}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <br />
                  <div className="form-group texto">
                    <Form.Group controlId="tipo_colegio">
                      <Form.Label>Tipo de colegio de procedencia:</Form.Label>
                      <Form.Control
                        as="select"
                        name="tipo_colegio"
                        className="input-style"
                        value={input.tipo_colegio}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione tipo de colegio</option>
                        <option value="Municipal">Municipal</option>
                        <option value="Subvencionado">Subvencionado</option>
                        <option value="Privado">Privado</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <br />
                  <div className="form-group texto">
                    <Form.Group controlId="nombre_colegio">
                      <Form.Label>Nombre de colegio</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre_colegio"
                        className="input-style"
                        value={input.nombre_colegio}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <br />
                  <div className="form-group texto">
                    <Form.Group controlId="egreso_colegio">
                      <Form.Label>Año de egreso escolar</Form.Label>
                      <Form.Control
                        type="number"
                        name="egreso_colegio"
                        min="1900"
                        max="2023"
                        className="input-style"
                        value={input.egreso_colegio}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <br />
                  <div className="box-footer">
                    <button className="btn btn-success">Guardar estudiante</button>
                  </div>
                </Form>
              </FormStyle>
            </div>
          </div>
        </div>
      </FormStyle>
    </div>
  );
}

const FormStyle = styled.form`
  .container {
    margin-top: 20px;
    max-width: 800px;
  }

  .card {
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .texto {
    color: #300638;
  }
  .text-center {
    color: #88209b;
  }

  .form-group {
    margin-bottom: 8px;
  }

  .btn-success {
    background-color: #88209b;
    color: #ffffff;
    border: none;
  }
  .input-style {
    border: 1px solid #88209b;
    border-radius: 5px;
    width: 100%;
    padding: 1px;
    color: #300638;
  }

  /* Estilo para el formulario */
  .form-style {
    border: 1px solid #88209b;
    border-radius: 5px;
    text-align: right;
  }
`;
