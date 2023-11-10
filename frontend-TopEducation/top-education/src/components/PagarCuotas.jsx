import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap'; 
import NavbarComponent from './NavbarComponent.jsx'; 
import cuotasService from '../services/CuotasService';

const CuotasComponent = () => {
  const [cuotas, setCuotas] = useState([]);
  const [rutEstudiante, setRutEstudiante] = useState('');
  const [cuotasPagadasIds, setCuotasPagadasIds] = useState([]); // Define the state here

  const handleActualizar = async (event) => {
    event.preventDefault();
    try {
      await cuotasService.actualizarCuotas();
      alert('Cuotas actualizadas exitosamente');
    } catch (error) {
      alert('Error al actualizar cuotas: ' + error.message);
    }
  };

  const handleBuscarCuotas = async (event) => {
    event.preventDefault();
    try {
      const response = await cuotasService.buscarCuotas(rutEstudiante);
      setCuotas(response);
    } catch (error) {
      alert('Error al buscar cuotas: ' + error.message);
    }
  };

  const handleToggleCuotaPagada = (cuotaId) => {
    setCuotasPagadasIds((prevIds) =>
      prevIds.includes(cuotaId)
        ? prevIds.filter((id) => id !== cuotaId)
        : [...prevIds, cuotaId]
    );
  };

  const handleRegistroPago = async (event) => {
    event.preventDefault();
    try {
      await cuotasService.registrarPago(cuotasPagadasIds);
      alert('Pagos registrados exitosamente');
    } catch (error) {
      alert('Error al registrar pagos: ' + error.message);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className="container">
        <br />
        <h1 style={{ color: "#88209B", textAlign: 'center' }}>Lista de todas las cuotas</h1>
        <br />
        <h4 style={{ color: "3a0a43" }}>Antes de realizar cualquier operación, primero debe actualizar los datos.</h4>

        <button
          onClick={handleActualizar}
          className="btn btn-primary"
          style={{ backgroundColor: '#88209B', color: '#ffffff', border: 'none' }}
        >
          Actualizar Cuotas Vencidas
        </button>
        <br />
        <br />
        <h6 style={{ color: "3a0a43" }}>Ingrese el rut del estudiante para pagar sus cuotas.</h6>

        <form onSubmit={handleBuscarCuotas}>
          <input
            type="text"
            name="rut_estudiante"
            placeholder="Buscar cuotas de un estudiante"
            pattern="\d{9}"
            title="Ingresa 9 dígitos"
            maxLength="9"
            value={rutEstudiante}
            style={{ backgroundColor: "#ffffff", border: "1px solid #88209B", width: "300px" }}
            onChange={(e) => setRutEstudiante(e.target.value)}
          />
          <br />
          <button className="btn btn-primary" style={{
            backgroundColor: "#88209B",
            color: "#ffffff",
            border: "none",
          }} type="submit">Buscar</button>
        </form>
        <br />
        <Table striped bordered>
          {/* Encabezados de la tabla */}
          <thead>
            <tr>
              <th>N°Cuota</th>
              <th>Valor de la cuota</th>
              <th>Estado de cuota</th>
              <th>Fecha de pago</th>
              <th>Cuotas totales</th>
              <th>Interés aplicado por retraso</th>
              <th>Cuotas pagadas</th>
              <th>Descuento por promedio de exámenes</th>
              <th>Registrar pago</th>
            </tr>
          </thead>
          {/* Cuerpo de la tabla */}
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
                <td>
                  <input
                    type="checkbox"
                    name="cuotas_pagadas"
                    value={cuota.id_cuotas}
                    onChange={() => handleToggleCuotaPagada(cuota.id_cuotas)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <form onSubmit={handleRegistroPago}>
          <Button type="submit" style={{
            backgroundColor: "#88209B",
            color: "#ffffff",
            border: "none",
          }}>Registrar pago</Button>
        </form>
        <br />
        <br />
      </div>
    </div>
  );
};

export default CuotasComponent;
