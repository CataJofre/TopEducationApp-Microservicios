import axios from 'axios'; 

const CUOTAS_API_URL = "http://localhost:8080/cuotas";

const cuotasService = {
    generarCuotas: async (rut_estudiante) => {
      try {
        const response = await axios.post(`${CUOTAS_API_URL}?rut_estudiante=${rut_estudiante}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Error en la solicitud');
      }
    },

    buscarCuotas: async (rut_estudiante) => {
      try {
        const response = await axios.get(`${CUOTAS_API_URL}/${rut_estudiante}`);
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Error en la solicitud');
      }
    },
    registrarPago: async (cuotasPagadasIds) => {
      try {
        const response = await axios.post(`${CUOTAS_API_URL}/pagar`, cuotasPagadasIds, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || 'Error en la solicitud');
      }
    },
    
    
    
    actualizarCuotas: async ( cuota) => {
      try {
        const response = await fetch(`${CUOTAS_API_URL}/procesar`, {
          method: 'POST',
        });
  
        if (!response.ok) {
          throw new Error('Error al procesar cuotas vencidas');
        }
  
        // Puedes manejar la respuesta según tus necesidades
        console.log('Cuotas vencidas procesadas correctamente');
      } catch (error) {
        console.error('Error:', error.message);
        // Puedes manejar el error según tus necesidades
      }
    
    },


  };
  
  export default cuotasService;
