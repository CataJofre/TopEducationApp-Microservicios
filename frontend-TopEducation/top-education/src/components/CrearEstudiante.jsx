import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import NavbarComponent from './NavbarComponent.jsx';
const EstudianteForm = ({ onSubmit }) => {
  return ( <div>
    <NavbarComponent />
    <Formik
      initialValues={{
        rut_estudiante: "",
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        egreso_colegio: "",
        nombre_colegio: "",
        tipo_colegio: "",
      }}
      validationSchema={Yup.object({
        // Define las validaciones aquí
        rut_estudiante: Yup.number().required(
          "El RUT del estudiante es obligatorio"
        ),
        // Agrega más validaciones para otros campos
      })}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
    <FormStyle className="form-style">
      <div class="container">
        <div class="row">
        
          <div class="col-lg-10 col-md-10 col-sm-10 container justify-content-center card">
            <br />
            <h1 class="text-center">Registro de estudiantes</h1>
            <div class="card-body"></div>
            <FormStyle>
            <Form>
              <div class="form-group, texto">
                <label htmlFor="rut_estudiante" >RUT del estudiante:</label>
                <Field type="text" name="rut_estudiante" className="input-style"/>
                <ErrorMessage
                  name="rut_estudiante"
                  component="div"
                  className="error"
                />
              </div>
              <br />
              <div class="form-group, texto">
                <label htmlFor="nombres">Nombres del estudiante</label>
                <Field type="text" name="nombres"  className="input-style" />
                <ErrorMessage
                  name="nombres"
                  component="div"
                  className="error"
                />
              </div>
              <br />

              <div class="form-group, texto">
                <label htmlFor="apellidos">Apellidos del estudiante</label>
                <Field type="text" name="apellidos" className="input-style"/>
                <ErrorMessage
                  name="apellidos"
                  component="div"
                  className="error"
                />
              </div>
              <br />
              <div class="form-group, texto">
                <label htmlFor="fecha_nacimiento">
                  Fecha de nacimiento
                </label>
                <Field type="date" name="fecha_nacimiento"  className="input-style"/>
                <ErrorMessage
                  name="fecha_nacimiento"
                  component="div"
                  className="error"
                />
              </div>
              <br />
              <div class="form-group, texto">
                <label htmlFor="tipo_colegio">
                  Tipo de colegio de procedencia:
                </label>
                <select name="tipo_colegio" id="tipo_colegio" className="input-style">
                  <option value="" disabled selected>
                    Seleccione tipo de colegio
                  </option>
                  <option value="Municipal">Municipal</option>
                  <option value="Subvencionado">Subvencionado</option>
                  <option value="Privado">Privado</option>
                </select>
              </div>
              <br />
              <div class="form-group, texto">
                <label htmlFor="nombre_colegio">Nombre de colegio</label>
                <Field type="text" name="nombre_colegio" className="input-style"/>
                <ErrorMessage
                  name="nombre_colegios"
                  component="div"
                  className="error"
                />
              </div>
              <br />
              <div class="form-group, texto">
                <label htmlFor="egreso_colegio">Año de egreso escolar</label>
                <Field
                  type="number"
                  name="egreso_colegio"
                  min="1900"
                  max="2023" className="input-style"
                />
                <ErrorMessage
                  name="egreso_colegio"
                  component="div"
                  className="error"
                />
              </div>
              <br />
              <div class="box-footer">
                <button class="btn btn-success" onClick={handleSubmit}>Guardar estudiante</button>
              </div>
            </Form>
            </FormStyle>
          </div>
        </div>
      </div>
      </FormStyle>
       )}
    </Formik>
    </div>
  );
};

export default EstudianteForm;


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
.texto{
  color: #300638;
}
.text-center {
    color: #88209B;
}

.form-group {
    margin-bottom: 8px;
}

.btn-success {
    background-color: #88209B;
    color: #ffffff;
    border: none;
}
.input-style {
  border: 1px solid #88209B;
  border-radius: 5px;
  width: 100%;
  padding: 1px; 
  color: #300638;
}

/* Estilo para el formulario */
.form-style {
  border: 1px solid #88209B;
  border-radius: 5px;
  text-align: right;

}
`