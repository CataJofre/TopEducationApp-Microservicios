import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarComponent from "./NavbarComponent.jsx"; // Asegúrate de importar la barra de navegación
import styled from "styled-components";
import React , { useState } from "react";
import swal from 'sweetalert';
import EstudianteService from "../services/EstudianteService.js";

export default function CrearEstudiante(props){
  const initialState={
      rut_estudiante: "",
      fecha_nacimiento: "",
      nombres: "",
      apellidos: "",
      egreso_colegio: "",
      nombre_colegio: "",
      tipo_colegio: "",
    };
    const [input, setInput] = useState(initialState);
    const changeNombresHandler = event => {
      setInput({ ...input, nombres: event.target.value });
  };
  const changeApellidoseHandler = event => {
    setInput({ ...input, apellidos: event.target.value });
};
const changeRutHandler = event => {
  setInput({ ...input, rut_estudiante: event.target.value });
};
const changeFechaHandler = event => {
  setInput({ ...input, fecha_nacimiento: event.target.value });
};
const changeTipoHandler = event => {
  setInput({ ...input, tipo_colegio: event.target.value });
};
const changeNombreColHandler = event => {
  setInput({ ...input, nombre_colegio: event.target.value });
};
const changeEgresoHandler = event => {
  setInput({ ...input, egreso_colegio: event.target.value });
};
const guardarEstudiante = e => {
  e.preventDefault();
  swal({
      title: "¿Está seguro de guardar este estudiante?",
      text: "Una vez enviado, no podrá ser modificado.",
      icon: "warning",
      buttons: ["Cancelar", "Enviar"],
      dangerMode: true
  }).then(respuesta=>{
      if(respuesta){
          swal("Estudiante registrado correctamente!", {icon: "success", timer: "3000"});
          let estudiante = { 
            rut_estudiante: input.rut_estudiante, 
              nombres: input.nombres,
              apellidos: input.apellidos,
              fecha_nacimiento: input.fecha_nacimiento,
              tipo_colegio: input.tipo_colegio,
              egreso_colegio: input.egreso_colegio,
              nombre_colegio: input.nombre_colegio
            };
          console.log(input.estudiante_id)
          console.log(input.nombres)
          console.log(input.apellidos)
          console.log(input.fecha_nacimiento)
          console.log(input.tipo_colegio)
          console.log(input.egreso_colegio)
          console.log(input.nombre_colegio)
          console.log("estudiante => " + JSON.stringify(estudiante));
          EstudianteService.guardarEstudiante(estudiante).then(
              (res) => {
              }
            );
          }
      else{
          swal({text: "estudiante no registrado.", icon: "error"});
      }
  });
};
  return (
    <div>
      <NavbarComponent/>
      <FormularioStyle className="form-style">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-10 col-sm-10 container justify-content-center card">
              <h1 className="text-center">Registro de estudiantes</h1>
              <br />
              <Form>
                <Form.Group className="texto" controlId="nombres" value = {input.nombres} onChange={changeNombresHandler}>
                  <Form.Label for="nombres">Nombres:</Form.Label>
                  <Form.Control required
                    className="input-style"
                    type="text"              
                    name="nombres"
                    placeholder=" Ingrese nombres"
                  />
                </Form.Group>
                <br />
                <Form.Group className="texto" controlId="apellidos" value = {input.apellidos}onChange={changeApellidoseHandler}>
                  <Form.Label for="apellidos">Apellidos:</Form.Label>
                  <Form.Control required
                    className="input-style"
                    type="text"               
                     placeholder=" Ingrese apellidos"
                     name="apellidos"
                  />
                </Form.Group>
                <br />
                <Form.Group className="texto" controlId="rut_estudiante" value = {input.rut_estudiante}onChange={changeRutHandler}>
                  <Form.Label for="rut_estudiante">Rut:</Form.Label>
                  <Form.Control required
                    className="input-style"
                    typet="text"         
                     placeholder="Rut del estudiante, sin guion"
                   name="rut_estudiante"
                    pattern="\d{9}"
                    title="Ingresa 9 dígitos"
                    maxLength="9"
                  />
                </Form.Group>
                <br />
                <Form.Group className="date" controlId="fecha_nacimiento" value = {input.fecha_nacimiento}onChange={changeFechaHandler}>
                  <Form.Label for="fecha_nacimiento">Fecha de nacimiento:</Form.Label>
                  <Form.Control required
                    className="input-style"
                    type="date" 
                    name="fecha_nacimiento"          
                  />
                </Form.Group>
                <br />
                <Form.Group className="texto" controlId="tipo_colegio" value = {input.tipo_colegio}onChange={changeTipoHandler}>
                  <Form.Label for="tipo_colegio">Tipo de colegio de procedencia:</Form.Label>

                  <Form.Select className="input-style form-select  " name= "tipo_colegio" for="tipo_colegio">
                    <option defaultValue>
                      Seleccione el tipo de colegio
                    </option>
                    <option>Municipal</option>
                    <option>Subvencionado</option>
                    <option>Privado</option>
                  </Form.Select>
                </Form.Group>
                <br />
                <Form.Group className="texto" controlId="nombre_colegio" value = {input.nombre_colegio} onChange={changeNombreColHandler}>
                  <Form.Label for="nombre_colegio">Nombre del colegio de procedencia:</Form.Label>
                  <Form.Control required
                    className="input-style"
                    type="text"
                    placeholder=" Nombre colegio"
                    name="nombre_colegio"
                  />
                </Form.Group>
                <br />
                <Form.Group className="texto" controlId="egreso_colegio" value = {input.egreso_colegio} onChange={changeEgresoHandler}>
                  <Form.Label for="egreso_colegio">Nombre del colegio de procedencia:</Form.Label>
                  <Form.Control 
                    className="input-style"
                    type="text"
                    placeholder=" Año de egreso"
                    required
                    pattern="\d{4}"
                    title="Ingresa 4 dígitos numéricos"
                    maxLength="4"
                    name="egreso_colegio"
                  />
                </Form.Group>
                <br />
                <Button
                  variant="primary"
                  type="text"           className="btn btn-success"  onClick={guardarEstudiante}
                >
                  ¿Guardar estudiante?
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </FormularioStyle>
      </div>
    
  );
}




const FormularioStyle = styled.div`
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

  .form-select{
    
    padding: 5px;
  }

  .btn-success {
    background-color: #88209b;
    color: #ffffff;
    border: none;
    margin-top: 20px;
  }
  .input-style {
    border: 1px solid #88209b;
    border-radius: 5px;
    width: 100%;
    padding: 1px;
    color: #300638;
  }

  .form-style {
    border: 1px solid #88209b;
    border-radius: 5px;
    text-align: right;
  }
`;
