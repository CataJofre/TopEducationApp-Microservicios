import React, { useState } from 'react';

const Plantilla = () => {
  const [rutEstudiante, setRutEstudiante] = useState('');
  const [aranceles, setAranceles] = useState([]);
  
  const handleRutChange = (event) => {
    setRutEstudiante(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Realizar la llamada a la API para obtener el arancel del estudiante
    try {
      const response = await fetch(`http://localhost:tu_puerto/ver_arancel?rut_estudiante=${rutEstudiante}`);
      const data = await response.json();
      setAranceles(data); // Actualizar el estado con la respuesta del backend
    } catch (error) {
      console.error('Error al obtener el arancel:', error);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#ffffff', color: '#88209B', padding: '20px' }}>
      <div className="row">
        <h1 style={{ color: '#88209B' }}>Ingrese el Rut del estudiante para ver su arancel</h1>
        <br />
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3" style={{ backgroundColor: '#ffffff', border: '1px solid #88209B' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Ver arancel de un estudiante"
            aria-label="Búsqueda"
            aria-describedby="basic-addon2"
            required
            pattern="\d{9}"
            title="Ingresa 9 dígitos"
            maxLength="9"
            style={{ color: '#88209B', border: 'none', backgroundColor: 'transparent' }}
            value={rutEstudiante}
            onChange={handleRutChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="submit"
              style={{ backgroundColor: '#88209B', color: '#ffffff', border: 'none' }}
            >
              Buscar
            </button>
          </div>
        </div>
      </form>

      <div className="container">
        <div className="row">
          <h1 style={{ color: '#88209B' }}>Lista de todos los aranceles</h1>
        </div>
        <table className="table table-striped table-bordered" style={{ backgroundColor: '#ffffff', border: '1px solid #88209B' }}>
          <thead style={{ backgroundColor: '#88209B', color: '#ffffff' }}>
            <tr>
              <th scope="col">Rut</th>
              <th scope="col">Descuento tipo de pago</th>
              <th scope="col">Descuento tiempo de egreso</th>
              <th scope="col">Descuento colegio de procedencia</th>
              <th scope="col">Descuento promedio examenes</th>
              <th scope="col">Tipo de pago</th>
              <th scope="col">Tipo de Colegio</th>
              <th scope="col">Monto a pagar</th>
              <th scope="col">Cantidad de cuotas</th>
            </tr>
          </thead>
          <tbody>
            {aranceles.map((arancel) => (
              <tr key={arancel.rut_estudiante}>
                <td>{arancel.rut_estudiante}</td>
                <td>{arancel.dcto_tipo_pago}</td>
                <td>{arancel.dcto_tiempo_egreso}</td>
                <td>{arancel.dcto_colegio_procedencia}</td>
                <td>{arancel.dcto_media_examenes}</td>
                <td>{arancel.tipo_de_pago}</td>
                <td>{arancel.tipo_colegio}</td>
                <td>{arancel.monto_pagar}</td>
                <td>{arancel.cantidad_cuotas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Plantilla;
