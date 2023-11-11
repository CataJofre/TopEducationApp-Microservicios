import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

export const NavbarComponent = () => {
  return (
    <NavStyle>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to="/" className="navbar-brand">
            TopEducation Finanzas
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Link to="/" className="nav-item nav-link active ml-auto">
              Home
            </Link>
            <Link to="/guardar" className="nav-item nav-link ml-auto">
              Guardar estudiante
            </Link>
            <Link to="/mostrar" className="nav-item nav-link ml-auto">
              Mostrar cuotas
            </Link>
            <Link to="/estudiante" className="nav-item nav-link ml-auto">
              Estudiantes
            </Link>
            <Link to="/examenes" className="nav-item nav-link ml-auto">
              Examenes
            </Link>
            <Link to="/generar" className="nav-item nav-link ml-auto">
              Generar Cuotas
            </Link>
            <Link to="/pagar" className="nav-item nav-link ml-auto">
              Pagar aquí
            </Link>
          </div>
        </nav>
      </header>
    </NavStyle>
  );
};

export default NavbarComponent;
const NavStyle = styled.nav`
    /* Estilos personalizados */
  .navbar {
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .navbar-brand {
    font-size: 2em;
    font-weight: bold;
    color: #88209B;
    margin-left: 10px;
  }

  .navbar-toggler {
   
  }

  .nav-item {
    color: #88209B;
    font-size: 1.12em;
    padding: 0 10px;
    margin-left: 20px;
  }
  .
`;
