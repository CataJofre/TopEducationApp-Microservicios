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
  };
  
  export default cuotasService;
