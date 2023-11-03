
import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarComponent from './NavbarComponent.jsx'; // Asegúrate de importar la barra de navegación


export const HomeTopEducation = () => {


    return (
        <div>
       
       <NavbarComponent />
      <HomeStyle>
        <section className="main-content" >
        <Link Link to="/estudiante/guardar" className="info-box" >
            <div>
              <h2>Registrar nuevo estudiante</h2>
              <p>Registro de nuevo estudiante.</p>
            </div>
          </Link>
      
          
          <Link to="/pagar" className="info-box">
            <div>
              <h2>Pagar Cuotas</h2>
              <p>Pago de cuotas.</p>
            </div>
          </Link>
          <Link to="/cuotas" className="info-box">
            <div>
              <h2>Cuotas de Estudiantes</h2>
              <p>Información sobre las cuotas de todos los estudiantes.</p>
            </div>
          </Link>
          <Link to="/arancel" className="info-box">
            <div>
              <h2>Aranceles</h2>
              <p>Aranceles vigentes para nuestros programas educativos.</p>
            </div>
          </Link>
          <Link to="/informacion_estudiante" className="info-box">
            <div>
              <h2>Estudiantes</h2>
              <p>Información sobre los estudiantes y su progreso académico.</p>
            </div>
          </Link>
          <Link to="/examenes" className="info-box">
            <div>
              <h2>Exámenes Rendidos</h2>
              <p>Resultados de los exámenes.</p>
            </div>
          </Link>
        </section>
      </HomeStyle>
      </div>
    );
  }
  
export default HomeTopEducation;

const HomeStyle = styled.section`
body {
    background-color: #f7f7f7;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.main-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
}

.info-box {
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 10px;
    width: 45%;
    margin-bottom: 20px;
}

.info-box h2 {
    font-size: 24px;
    font-weight: bold;
    color: #88209B;
}

.info-box p {
    font-size: 16px;
    color: #555;
}
a {
text-decoration: none;
color: inherit; 
}

`