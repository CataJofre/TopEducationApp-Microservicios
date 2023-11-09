import React, { useState } from 'react';
import estudianteService from '../services/EstudianteService.js';   
import NavbarComponent from './NavbarComponent.jsx';

const InfoEstudiante = () => {
  const [rutEstudiante, setRutEstudiante] = useState('');
  const [estudianteInfo, setEstudianteInfo] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await estudianteService.infoEstudiante(rutEstudiante);

      if (response.data) {
        setEstudianteInfo(response.data);
      } else {
        setEstudianteInfo(null);
      }
    } catch (error) {
      console.error('Error al buscar información del estudiante', error);
      setEstudianteInfo(null);
    }
  };

  return (
    <div >
        <NavbarComponent />
        
        <br />
      <form className="text-center">
        <div className="input-group mb-3" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input
            type="text"
            className="form-control"
            placeholder="¿Desea buscar información de un estudiante?"
            required
            pattern="\d{9}"
            title="Ingresa 9 dígitos"
            maxLength="9"
            style={{ color: '#88209B', border: 'none', backgroundColor: 'transparent' }}
            value={rutEstudiante}
            onChange={(e) => setRutEstudiante(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              style={{ backgroundColor: '#88209B', color: '#ffffff', border: 'none' }}
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>
      </form>

      <section style={{
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '40px 0'
}}>
        {estudianteInfo && (
          <div style={{
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            width: '45%',
            marginBottom: '20px',
            color: '#300638'
          }}>
            <h2>Información del Estudiante</h2>
            <p>RUT del Estudiante: {estudianteInfo.rut_estudiante}</p>
            <p>Nombre del Estudiante: {estudianteInfo.nombres+' ' +estudianteInfo.apellidos}</p>
            <p>Fecha de nacimiento: {estudianteInfo.fecha_nacimiento}</p>
            <p>Nombre de colegio de procedencia: {estudianteInfo.nombre_colegio}</p>
            <p>Año de egreso: {estudianteInfo.egreso_colegio}</p>
            <p>Tipo de colegio: {estudianteInfo.tipo_colegio}</p>
            <p>Tipo de Pago: {estudianteInfo.tipo_pago}</p>
          </div>
        )}
      </section>
    </div>
  );
}


export default InfoEstudiante;
