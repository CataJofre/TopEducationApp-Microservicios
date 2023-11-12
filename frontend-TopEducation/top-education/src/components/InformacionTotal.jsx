import React, { useState } from 'react';
import informacionService from '../services/InformacionService.js';   
import NavbarComponent from './NavbarComponent.jsx';

const InfoEstudiante = () => {
  const [rutEstudiante, setRutEstudiante] = useState('');
  const [estudianteInfo, setEstudianteInfo] = useState({});


  const handleSearch = async () => {
    try {
      const response = await informacionService.infoEstudiante(rutEstudiante);
  setEstudianteInfo(response); // Esto debería ser setEstudianteInfo(estudianteInfo) si infoEstudiante devuelve un objeto y no un array
     
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
            <p>RUT del Estudiante: {estudianteInfo.rutEstudiante}</p>
            <p>Nombre del Estudiante: {estudianteInfo.nombreEstudiante}</p>
            <p>N° Examenes rendidos: {estudianteInfo.numeroExamenesRendidos}</p>
            <p>Promedio: {estudianteInfo.promedioPuntajeExamenes}</p>
            <p>Monto Arancel: {estudianteInfo.montoTotalArancel}</p>
            <p>Tipo de Pago: {estudianteInfo.tipoPago}</p>
            <p>Cantidad de cuotas: {estudianteInfo.numeroTotalCuotasPactadas}</p>
            <p>Cuotas pagadas: {estudianteInfo.numeroCuotasPagadas}</p>
            <p>Total pagado: {estudianteInfo.montoTotalPagado}</p>
            <p>Fecha ultimo Pago: {estudianteInfo.fechaUltimoPago}</p>
            <p>Saldo por pagar: {estudianteInfo.saldoPorPagar}</p>
            <p>Cuotas con retraso: {estudianteInfo.numeroCuotasConRetraso}</p>
          </div>
        )}
      </section>
    </div>
  );
}


export default InfoEstudiante;
